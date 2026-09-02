import express from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { requireAuth, requirePasswordChanged } from '../middleware/auth.js';

const router = express.Router();

const UPLOAD_DIR = path.resolve(process.cwd(), 'server/uploads');
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const randomName = crypto.randomBytes(16).toString('hex');
    cb(null, `${randomName}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.has(file.mimetype)) {
      return cb(new Error('Only JPEG, PNG, WEBP, and GIF images are allowed'));
    }
    cb(null, true);
  },
});

router.post('/', requireAuth, requirePasswordChanged, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'Image must be under 5MB' });
      }
      return res.status(400).json({ error: err.message });
    }
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    res.status(201).json({ url: `/uploads/${req.file.filename}` });
  });
});

export default router;
