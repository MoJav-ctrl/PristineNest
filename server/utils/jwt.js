import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '12h';

if (!SECRET && process.env.NODE_ENV === 'production') {
  // Fail loudly at startup rather than silently signing tokens with `undefined`
  throw new Error('JWT_SECRET is not set. Refusing to start in production without it.');
}

export function signToken(payload) {
  return jwt.sign(payload, SECRET || 'insecure_dev_only_secret', { expiresIn: EXPIRES_IN });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET || 'insecure_dev_only_secret');
}
