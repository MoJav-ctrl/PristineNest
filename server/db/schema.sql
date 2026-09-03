-- PristineNest blog backend schema (MariaDB / MySQL version)
-- Run this once in your cPanel database tool (e.g. phpMyAdmin) against
-- the database you created for this app.
--
-- Requires MariaDB 10.5+ for full compatibility (CHECK constraints,
-- triggers, RETURNING support in the Node app's query layer). Confirmed
-- working against MariaDB 10.6.

-- ── Staff accounts ──────────────────────────────────────────────────────
-- Note: there is deliberately no way to insert a row here with a plain-text
-- password — passwords are always bcrypt-hashed by the Node app, never by
-- SQL. The very first admin account is created through a one-time setup
-- endpoint (see server/routes/auth.js), not by hand here.

CREATE TABLE IF NOT EXISTS staff_users (
  id                   INT AUTO_INCREMENT PRIMARY KEY,
  email                VARCHAR(255) NOT NULL UNIQUE,
  password_hash        TEXT NOT NULL,
  name                 VARCHAR(255) NOT NULL,
  role                 VARCHAR(20) NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
  must_change_password BOOLEAN NOT NULL DEFAULT TRUE,
  created_by           INT NULL,
  created_at           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_staff_users_created_by FOREIGN KEY (created_by)
    REFERENCES staff_users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ── Blog posts ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS posts (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  slug             VARCHAR(255) NOT NULL UNIQUE,
  title            VARCHAR(500) NOT NULL,
  excerpt          TEXT,
  content          LONGTEXT NOT NULL,
  cover_image_url  TEXT,
  category         VARCHAR(100),
  status           VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  author_id        INT NULL,
  published_at     DATETIME NULL,
  created_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_posts_author_id FOREIGN KEY (author_id)
    REFERENCES staff_users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE INDEX idx_posts_status_published_at ON posts (status, published_at DESC);
CREATE INDEX idx_posts_slug ON posts (slug);

-- ── Keep updated_at accurate automatically ─────────────────────────────
-- No PL/pgSQL function needed here — MariaDB triggers can update the row
-- directly.

DROP TRIGGER IF EXISTS trg_staff_users_updated_at;
CREATE TRIGGER trg_staff_users_updated_at
  BEFORE UPDATE ON staff_users
  FOR EACH ROW
  SET NEW.updated_at = CURRENT_TIMESTAMP;

DROP TRIGGER IF EXISTS trg_posts_updated_at;
CREATE TRIGGER trg_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  SET NEW.updated_at = CURRENT_TIMESTAMP;
