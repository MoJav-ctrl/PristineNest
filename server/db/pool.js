import mysql from 'mysql2/promise';
import 'dotenv/config';

// Migrated from PostgreSQL to MariaDB/MySQL (cPanel host only offered
// MySQL, not Postgres). This file is a compatibility shim: the rest of
// the app still writes queries using Postgres-style $1, $2... placeholders
// and expects a { rows: [...] } shape back, so this adapter translates
// both directions rather than requiring every route file to be rewritten.
//
// RETURNING on INSERT/UPDATE/DELETE works here because MariaDB (10.5+)
// supports it natively — if you're on plain MySQL instead of MariaDB,
// RETURNING is NOT supported and those queries will need rewriting to a
// separate SELECT after the write.

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Converts Postgres-style positional placeholders ($1, $2, ...) to MySQL's
// unnamed placeholder (?). Safe here because every query in this app uses
// each placeholder exactly once, in the same left-to-right order as its
// params array — this does NOT handle a placeholder reused more than once.
function toMysqlPlaceholders(text) {
  return text.replace(/\$\d+/g, '?');
}

export async function query(text, params = []) {
  const [rows] = await pool.query(toMysqlPlaceholders(text), params);
  // SELECT and RETURNING queries get back an array of row objects.
  // Plain INSERT/UPDATE/DELETE (no RETURNING) get back an OkPacket
  // instead — normalize that to an empty rows array so callers that
  // don't use .rows for those cases are unaffected.
  return { rows: Array.isArray(rows) ? rows : [] };
}

export async function getClient() {
  // For multi-statement transactions (e.g. create post + attach images)
  const connection = await pool.getConnection();
  return {
    query: async (text, params = []) => {
      const [rows] = await connection.query(toMysqlPlaceholders(text), params);
      return { rows: Array.isArray(rows) ? rows : [] };
    },
    release: () => connection.release(),
  };
}

export default pool;
