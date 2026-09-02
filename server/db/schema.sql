-- PristineNest blog backend schema
-- Run this once in your cPanel PostgreSQL tool (e.g. phpPgAdmin) against
-- the database you created for this app.

-- ── Staff accounts ──────────────────────────────────────────────────────
-- Note: there is deliberately no way to insert a row here with a plain-text
-- password — passwords are always bcrypt-hashed by the Node app, never by
-- SQL. The very first admin account is created through a one-time setup
-- endpoint (see server/routes/auth.js, added in Batch B), not by hand here.

CREATE TABLE IF NOT EXISTS staff_users (
  id                   SERIAL PRIMARY KEY,
  email                TEXT NOT NULL UNIQUE,
  password_hash        TEXT NOT NULL,
  name                 TEXT NOT NULL,
  role                 TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
  must_change_password BOOLEAN NOT NULL DEFAULT TRUE,
  created_by           INTEGER REFERENCES staff_users(id) ON DELETE SET NULL,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Blog posts ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS posts (
  id               SERIAL PRIMARY KEY,
  slug             TEXT NOT NULL UNIQUE,
  title            TEXT NOT NULL,
  excerpt          TEXT,
  content          TEXT NOT NULL DEFAULT '',
  cover_image_url  TEXT,
  category         TEXT,
  status           TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  author_id        INTEGER REFERENCES staff_users(id) ON DELETE SET NULL,
  published_at     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_posts_status_published_at ON posts (status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts (slug);

-- ── Keep updated_at accurate automatically ─────────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_staff_users_updated_at ON staff_users;
CREATE TRIGGER trg_staff_users_updated_at
  BEFORE UPDATE ON staff_users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_posts_updated_at ON posts;
CREATE TRIGGER trg_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
