import { verifyToken } from '../utils/jwt.js';
import { query } from '../db/pool.js';

// Reads "Authorization: Bearer <token>", verifies it, and attaches the
// decoded payload as req.auth. Does NOT hit the database — cheap and fast,
// but means a role change or account deletion won't take effect for an
// already-issued token until it expires (bounded by JWT_EXPIRES_IN).
export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    req.auth = verifyToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
}

// Must run after requireAuth.
export function requireAdmin(req, res, next) {
  if (req.auth?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// Must run after requireAuth. Blocks access to everything except the
// change-password/me/logout routes until a forced password reset is done —
// checked fresh against the database on every request, since this can
// change between when the token was issued and now.
export async function requirePasswordChanged(req, res, next) {
  try {
    const result = await query(
      'SELECT must_change_password FROM staff_users WHERE id = $1',
      [req.auth.userId]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Account no longer exists' });
    }
    if (user.must_change_password) {
      return res.status(403).json({ error: 'Password change required', code: 'PASSWORD_CHANGE_REQUIRED' });
    }
    next();
  } catch (err) {
    console.error('requirePasswordChanged check failed:', err.message);
    res.status(503).json({ error: 'Could not verify account status' });
  }
}
