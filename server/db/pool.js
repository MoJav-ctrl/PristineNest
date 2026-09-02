import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

// On most shared cPanel hosts, Postgres only listens locally and doesn't
// support SSL — ssl is left off by default and can be enabled via env var
// if your host requires it.
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on('error', (err) => {
  // Catches errors on idle clients so one bad connection can't crash the process
  console.error('Unexpected PostgreSQL pool error:', err);
});

export async function query(text, params) {
  return pool.query(text, params);
}

export async function getClient() {
  // For multi-statement transactions (e.g. create post + attach images)
  return pool.connect();
}

export default pool;
