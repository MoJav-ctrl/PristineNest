// Thin fetch wrapper for the admin API. Attaches the stored session token
// to every request and centralizes error handling so pages don't repeat it.

const TOKEN_KEY = 'pristinenest_admin_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`/api${path}`, { ...options, headers });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const body = isJson ? await response.json().catch(() => ({})) : {};

  if (!response.ok) {
    throw new ApiError(body.error || 'Something went wrong', response.status, body.code);
  }
  return body;
}

export const adminApi = {
  get: (path: string) => request(path, { method: 'GET' }),
  post: (path: string, data?: unknown) =>
    request(path, { method: 'POST', body: data ? JSON.stringify(data) : undefined }),
  put: (path: string, data?: unknown) =>
    request(path, { method: 'PUT', body: data ? JSON.stringify(data) : undefined }),
  delete: (path: string) => request(path, { method: 'DELETE' }),
};

// Image upload needs multipart/form-data, not JSON, so it bypasses the
// request() wrapper's Content-Type header (the browser sets the correct
// multipart boundary automatically when body is a FormData instance).
export async function uploadImage(file: File): Promise<{ url: string }> {
  const token = getToken();
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('/api/uploads', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(body.error || 'Image upload failed', response.status);
  }
  return body;
}
