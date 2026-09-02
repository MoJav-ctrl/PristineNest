import express from 'express';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';
import { createServer as createViteServer } from 'vite';
import { query } from './db/pool.js';
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';
import uploadsRoutes from './routes/uploads.js';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3001;

  // cPanel Node Apps run behind Apache as a reverse proxy — without this,
  // req.ip would show the proxy's address for every visitor, which would
  // break the login rate limiter (and any future per-IP logic).
  app.set('trust proxy', 1);

  app.use(cors());
  app.use(express.json({ limit: '2mb' }));

  // Uploaded blog images are served directly as static files
  app.use('/uploads', express.static(path.resolve(process.cwd(), 'server/uploads')));

  app.use('/api/auth', authRoutes);
  app.use('/api/posts', postsRoutes);
  app.use('/api/uploads', uploadsRoutes);

  app.get('/api/health', async (req, res) => {
    try {
      await query('SELECT 1');
      res.json({ status: 'ok', database: 'connected' });
    } catch (err) {
      console.error('Health check failed:', err.message);
      res.status(503).json({ status: 'error', database: 'unreachable' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
