// A minimal in-memory rate limiter for the login endpoint. No external
// dependency (like Redis) needed since cPanel Node Apps run as a single
// process — this would need to move to shared storage if ever scaled to
// multiple instances, but that's not this deployment's shape.

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

const attempts = new Map(); // key: "ip:email" -> { count, firstAttemptAt }

// Periodically clear out stale entries so this map doesn't grow forever.
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of attempts) {
    if (now - entry.firstAttemptAt > WINDOW_MS) attempts.delete(key);
  }
}, WINDOW_MS).unref();

export function loginRateLimiter(req, res, next) {
  const email = String(req.body?.email || '').toLowerCase().trim();
  const key = `${req.ip}:${email}`;
  const now = Date.now();
  const entry = attempts.get(key);

  if (entry && now - entry.firstAttemptAt < WINDOW_MS) {
    if (entry.count >= MAX_ATTEMPTS) {
      const retryAfterSec = Math.ceil((WINDOW_MS - (now - entry.firstAttemptAt)) / 1000);
      res.set('Retry-After', String(retryAfterSec));
      return res.status(429).json({ error: 'Too many login attempts. Please try again later.' });
    }
  }

  next();
}

export function recordFailedLogin(req) {
  const email = String(req.body?.email || '').toLowerCase().trim();
  const key = `${req.ip}:${email}`;
  const now = Date.now();
  const entry = attempts.get(key);

  if (entry && now - entry.firstAttemptAt < WINDOW_MS) {
    entry.count += 1;
  } else {
    attempts.set(key, { count: 1, firstAttemptAt: now });
  }
}

export function clearLoginAttempts(req) {
  const email = String(req.body?.email || '').toLowerCase().trim();
  attempts.delete(`${req.ip}:${email}`);
}
