// index.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import corsOptions from './config/corsOptions.js';
import errorHandler from './middlewares/errorHandler.js';
import postRouter from './routes/postRouter.js';
import userRouter from './routes/userRouter.js';
import authRoutes from './routes/authRouter.js';
import sequelize from './db/index.js';
import './db/associations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// If you’re behind a proxy (Render), keep this for secure cookies
app.set('trust proxy', 1);

// 1) CORS
app.use(cors(corsOptions));

// 2) Body + cookies
app.use(cookieParser());
app.use(express.json());

// 3) Static user uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4) CSP (allow frontend to call backend + allow images)
//    NOTE: we include 'unsafe-inline' in script-src to avoid blocking any
//    tiny inline scripts in your built index.html. Remove it if not needed.
const API_ORIGIN =
  process.env.PUBLIC_API_ORIGIN ||
  process.env.VITE_API_BASE_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  'http://localhost:3000';

const defaultDirs = helmet.contentSecurityPolicy.getDefaultDirectives();
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...defaultDirs,
      "script-src": ["'self'", "'unsafe-inline'"],
      "connect-src": ["'self'", API_ORIGIN],
      "img-src": ["'self'", "data:", API_ORIGIN],
    },
  })
);
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// 5) API routes
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/auth', authRoutes);

// 6) Serve SPA in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../voyaglog-fe/dist');
  app.use(express.static(buildPath));
  // IMPORTANT: Express 5 / path-to-regexp v6 needs a NAMED wildcard:
  app.get('/:path(*)', (_req, res) => res.sendFile(path.join(buildPath, 'index.html')));
}

// 7) Errors
app.use(errorHandler);

// 8) Start
app.listen(PORT, () => {
  console.table({
    'Server URL': `http://localhost:${PORT}`,
    Environment: process.env.NODE_ENV || 'development',
    'Allowed Origins': process.env.CORS_ORIGIN || 'http://localhost:5173',
    'API Origin in CSP': API_ORIGIN,
  });
});

// 9) DB init
try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log('DB ready');
} catch (e) {
  console.error('DB init failed:', e?.message || e);
}
