// Thin fetch wrapper for public, unauthenticated blog endpoints.

export interface PublicPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImageUrl: string | null;
  category: string | null;
  authorName: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export class PublicApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function fetchPublicPosts(): Promise<PublicPost[]> {
  const res = await fetch('/api/posts/public');
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new PublicApiError(body.error || 'Could not load posts', res.status);
  return body.posts;
}

export async function fetchPublicPostBySlug(slug: string): Promise<PublicPost> {
  const res = await fetch(`/api/posts/public/${encodeURIComponent(slug)}`);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new PublicApiError(body.error || 'Could not load post', res.status);
  return body.post;
}
