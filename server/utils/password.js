import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const SALT_ROUNDS = 10;

export async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

export async function verifyPassword(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}

// Generates a random temporary password for newly-created staff accounts,
// e.g. "kx7m-pw2q-9tzr". Deliberately avoids ambiguous characters (0/O, 1/l/I)
// since a human has to read and type this once.
const SAFE_CHARS = 'abcdefghjkmnpqrstuvwxyz23456789';

export function generateTempPassword() {
  const randomChunk = () =>
    Array.from({ length: 4 }, () => SAFE_CHARS[crypto.randomInt(SAFE_CHARS.length)]).join('');
  return `${randomChunk()}-${randomChunk()}-${randomChunk()}`;
}
