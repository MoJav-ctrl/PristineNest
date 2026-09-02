import express from 'express';
import { query } from '../db/pool.js';
import { requireAuth, requireAdmin, requirePasswordChanged } from '../middleware/auth.js';
import { generateUniqueSlug, excerptFromContent } from '../utils/slug.js';

const router = express.Router();

function publicPost(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    coverImageUrl: row.cover_image_url,
    category: row.category,
    status: row.status,
    authorId: row.author_id,
    authorName: row.author_name || null,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ── Public: published posts only, no auth required ────────────────────
// Placed before the admin `/:id` route below so "/public" and
// "/public/:slug" are matched first, rather than being swallowed by
// `/:id` (which would otherwise treat "public" as an id and 401 it).
router.get('/public', async (req, res) => {
  try {
    const result = await query(
      `SELECT posts.*, staff_users.name AS author_name
       FROM posts
       LEFT JOIN staff_users ON staff_users.id = posts.author_id
       WHERE posts.status = 'published'
       ORDER BY posts.published_at DESC`
    );
    res.json({ posts: result.rows.map(publicPost) });
  } catch (err) {
    console.error('Listing public posts failed:', err.message);
    res.status(500).json({ error: 'Could not load posts' });
  }
});

router.get('/public/:slug', async (req, res) => {
  try {
    const result = await query(
      `SELECT posts.*, staff_users.name AS author_name
       FROM posts
       LEFT JOIN staff_users ON staff_users.id = posts.author_id
       WHERE posts.slug = $1 AND posts.status = 'published'`,
      [req.params.slug]
    );
    if (result.rows.length === 0) {
      // Deliberately identical whether the post doesn't exist or is just
      // unpublished — a draft's slug shouldn't be discoverable by guessing.
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ post: publicPost(result.rows[0]) });
  } catch (err) {
    console.error('Fetching public post failed:', err.message);
    res.status(500).json({ error: 'Could not load post' });
  }
});

// ── Admin: list all posts regardless of status ────────────────────────
router.get('/', requireAuth, requirePasswordChanged, async (req, res) => {
  try {
    const result = await query(
      `SELECT posts.*, staff_users.name AS author_name
       FROM posts
       LEFT JOIN staff_users ON staff_users.id = posts.author_id
       ORDER BY posts.created_at DESC`
    );
    res.json({ posts: result.rows.map(publicPost) });
  } catch (err) {
    console.error('Listing posts failed:', err.message);
    res.status(500).json({ error: 'Could not load posts' });
  }
});

router.get('/:id', requireAuth, requirePasswordChanged, async (req, res) => {
  try {
    const result = await query(
      `SELECT posts.*, staff_users.name AS author_name
       FROM posts
       LEFT JOIN staff_users ON staff_users.id = posts.author_id
       WHERE posts.id = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ post: publicPost(result.rows[0]) });
  } catch (err) {
    console.error('Fetching post failed:', err.message);
    res.status(500).json({ error: 'Could not load post' });
  }
});

router.delete('/:id', requireAuth, requirePasswordChanged, requireAdmin, async (req, res) => {
  try {
    const result = await query('DELETE FROM posts WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Deleting post failed:', err.message);
    res.status(500).json({ error: 'Could not delete post' });
  }
});

// ── Create a post ──────────────────────────────────────────────────────
// Any authenticated staff member (not just admins) can write posts —
// deletion and staff management are the admin-only actions.
router.post('/', requireAuth, requirePasswordChanged, async (req, res) => {
  try {
    const { title, content, excerpt, coverImageUrl, category, status, slug: requestedSlug } = req.body || {};

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const finalStatus = status === 'published' ? 'published' : 'draft';
    const slug = await generateUniqueSlug(requestedSlug || title);
    const finalExcerpt = excerpt?.trim() || excerptFromContent(content);

    const result = await query(
      `INSERT INTO posts (slug, title, excerpt, content, cover_image_url, category, status, author_id, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        slug,
        title.trim(),
        finalExcerpt,
        content || '',
        coverImageUrl || null,
        category || null,
        finalStatus,
        req.auth.userId,
        finalStatus === 'published' ? new Date() : null,
      ]
    );

    res.status(201).json({ post: publicPost(result.rows[0]) });
  } catch (err) {
    console.error('Creating post failed:', err.message);
    res.status(500).json({ error: 'Could not create post' });
  }
});

// ── Update a post ──────────────────────────────────────────────────────
router.put('/:id', requireAuth, requirePasswordChanged, async (req, res) => {
  try {
    const { title, content, excerpt, coverImageUrl, category, status, slug: requestedSlug } = req.body || {};

    const existing = await query('SELECT * FROM posts WHERE id = $1', [req.params.id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const current = existing.rows[0];

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const finalStatus = status === 'published' ? 'published' : 'draft';
    // Only regenerate the slug if the title or an explicit slug actually changed —
    // otherwise a post's URL would shift every time it's merely re-saved.
    const slugSource = requestedSlug || title;
    const slug =
      slugSource === current.title || requestedSlug === current.slug
        ? current.slug
        : await generateUniqueSlug(slugSource, current.id);
    const finalExcerpt = excerpt?.trim() || excerptFromContent(content);
    // Only stamp published_at the first time a post goes live, not on every edit.
    const publishedAt =
      finalStatus === 'published' ? current.published_at || new Date() : current.published_at;

    const result = await query(
      `UPDATE posts SET
         slug = $1, title = $2, excerpt = $3, content = $4,
         cover_image_url = $5, category = $6, status = $7, published_at = $8
       WHERE id = $9
       RETURNING *`,
      [
        slug,
        title.trim(),
        finalExcerpt,
        content || '',
        coverImageUrl || null,
        category || null,
        finalStatus,
        publishedAt,
        current.id,
      ]
    );

    res.json({ post: publicPost(result.rows[0]) });
  } catch (err) {
    console.error('Updating post failed:', err.message);
    res.status(500).json({ error: 'Could not update post' });
  }
});

export default router;
