import express from 'express';
import { query } from '../db/pool.js';
import { hashPassword, verifyPassword, generateTempPassword } from '../utils/password.js';
import { signToken } from '../utils/jwt.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { loginRateLimiter, recordFailedLogin, clearLoginAttempts } from '../middleware/rateLimit.js';

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function publicUser(row) {
  // Never send password_hash to the client, ever.
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    mustChangePassword: row.must_change_password,
    createdAt: row.created_at,
  };
}

// ── One-time bootstrap: create the very first admin account ──────────────
// Self-disables once any account exists, so it can't be used as a
// standing backdoor. No auth required — there's no one to authenticate as
// yet on a freshly-created database.
router.post('/setup', async (req, res) => {
  try {
    const existing = await query('SELECT id FROM staff_users LIMIT 1');
    if (existing.rows.length > 0) {
      return res.status(403).json({ error: 'Setup has already been completed' });
    }

    const { email, password, name } = req.body || {};
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'A valid email is required' });
    }
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!password || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    const passwordHash = await hashPassword(password);
    const result = await query(
      `INSERT INTO staff_users (email, password_hash, name, role, must_change_password)
       VALUES ($1, $2, $3, 'admin', false)
       RETURNING *`,
      [email.toLowerCase().trim(), passwordHash, name.trim()]
    );

    res.status(201).json({ user: publicUser(result.rows[0]) });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'An account with that email already exists' });
    }
    console.error('Setup failed:', err.message);
    res.status(500).json({ error: 'Setup failed' });
  }
});

// Lets the frontend show "Set up your admin account" vs "Log in" without
// needing to attempt a real login first.
router.get('/setup/status', async (req, res) => {
  try {
    const existing = await query('SELECT id FROM staff_users LIMIT 1');
    res.json({ setupComplete: existing.rows.length > 0 });
  } catch (err) {
    console.error('Setup status check failed:', err.message);
    res.status(503).json({ error: 'Could not check setup status' });
  }
});

// ── Login ──────────────────────────────────────────────────────────────

router.post('/login', loginRateLimiter, async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await query(
      'SELECT * FROM staff_users WHERE email = $1',
      [String(email).toLowerCase().trim()]
    );
    const user = result.rows[0];

    // Compare against a dummy hash even when the user doesn't exist, so
    // response timing doesn't reveal whether an email is registered.
    const hashToCheck = user?.password_hash || '$2a$10$invalidsaltinvalidsaltinvalidsaltinval';
    const validPassword = await verifyPassword(password, hashToCheck);

    if (!user || !validPassword) {
      recordFailedLogin(req);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    clearLoginAttempts(req);

    const token = signToken({ userId: user.id, email: user.email, role: user.role });
    res.json({ token, user: publicUser(user) });
  } catch (err) {
    console.error('Login failed:', err.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ── Current user ─────────────────────────────────────────────────────────

router.get('/me', requireAuth, async (req, res) => {
  try {
    const result = await query('SELECT * FROM staff_users WHERE id = $1', [req.auth.userId]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Account no longer exists' });
    res.json({ user: publicUser(user) });
  } catch (err) {
    console.error('Fetching current user failed:', err.message);
    res.status(500).json({ error: 'Could not load account' });
  }
});

// ── Self-service password change ─────────────────────────────────────────
// Deliberately NOT gated by requirePasswordChanged — this is the one place
// someone with must_change_password=true needs to be able to reach.

router.post('/change-password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters' });
    }

    const result = await query('SELECT * FROM staff_users WHERE id = $1', [req.auth.userId]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Account no longer exists' });

    const validCurrent = await verifyPassword(currentPassword, user.password_hash);
    if (!validCurrent) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const newHash = await hashPassword(newPassword);
    await query(
      'UPDATE staff_users SET password_hash = $1, must_change_password = false WHERE id = $2',
      [newHash, user.id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('Password change failed:', err.message);
    res.status(500).json({ error: 'Password change failed' });
  }
});

// ── Staff management (admin only) ────────────────────────────────────────

router.get('/staff', requireAuth, requireAdmin, async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM staff_users ORDER BY created_at DESC'
    );
    res.json({ staff: result.rows.map(publicUser) });
  } catch (err) {
    console.error('Listing staff failed:', err.message);
    res.status(500).json({ error: 'Could not load staff list' });
  }
});

router.post('/staff', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { email, name, role } = req.body || {};
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'A valid email is required' });
    }
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const finalRole = role === 'admin' ? 'admin' : 'staff';

    const tempPassword = generateTempPassword();
    const passwordHash = await hashPassword(tempPassword);

    const result = await query(
      `INSERT INTO staff_users (email, password_hash, name, role, must_change_password, created_by)
       VALUES ($1, $2, $3, $4, true, $5)
       RETURNING *`,
      [email.toLowerCase().trim(), passwordHash, name.trim(), finalRole, req.auth.userId]
    );

    // The only time this plaintext password is ever available — the admin
    // needs to copy it now and share it with the new staff member directly.
    res.status(201).json({ user: publicUser(result.rows[0]), tempPassword });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'An account with that email already exists' });
    }
    console.error('Creating staff account failed:', err.message);
    res.status(500).json({ error: 'Could not create staff account' });
  }
});

router.post('/staff/:id/reset-password', requireAuth, requireAdmin, async (req, res) => {
  try {
    const staffId = Number(req.params.id);
    const tempPassword = generateTempPassword();
    const passwordHash = await hashPassword(tempPassword);

    const result = await query(
      `UPDATE staff_users SET password_hash = $1, must_change_password = true
       WHERE id = $2 RETURNING *`,
      [passwordHash, staffId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Staff account not found' });
    }

    res.json({ user: publicUser(result.rows[0]), tempPassword });
  } catch (err) {
    console.error('Resetting staff password failed:', err.message);
    res.status(500).json({ error: 'Could not reset password' });
  }
});

router.delete('/staff/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const staffId = Number(req.params.id);

    if (staffId === req.auth.userId) {
      return res.status(400).json({ error: 'You cannot delete your own account' });
    }

    const target = await query('SELECT role FROM staff_users WHERE id = $1', [staffId]);
    if (target.rows.length === 0) {
      return res.status(404).json({ error: 'Staff account not found' });
    }

    if (target.rows[0].role === 'admin') {
      const adminCount = await query("SELECT COUNT(*) FROM staff_users WHERE role = 'admin'");
      if (Number(adminCount.rows[0].count) <= 1) {
        return res.status(400).json({ error: 'Cannot delete the last remaining admin account' });
      }
    }

    await query('DELETE FROM staff_users WHERE id = $1', [staffId]);
    res.json({ success: true });
  } catch (err) {
    console.error('Deleting staff account failed:', err.message);
    res.status(500).json({ error: 'Could not delete staff account' });
  }
});

export default router;
