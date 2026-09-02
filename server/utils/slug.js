import { query } from '../db/pool.js';

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 100);
}

// Appends -2, -3, etc. until a unique slug is found. excludePostId lets an
// existing post keep its own slug during an update instead of colliding
// with itself.
export async function generateUniqueSlug(title, excludePostId = null) {
  const base = slugify(title) || 'post';
  let candidate = base;
  let suffix = 2;

  while (true) {
    const result = excludePostId
      ? await query('SELECT id FROM posts WHERE slug = $1 AND id != $2', [candidate, excludePostId])
      : await query('SELECT id FROM posts WHERE slug = $1', [candidate]);

    if (result.rows.length === 0) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}

// A short plain-text excerpt derived from HTML content, used when the
// author doesn't write one by hand.
export function excerptFromContent(html, maxLength = 200) {
  const text = String(html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}
