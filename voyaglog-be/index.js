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

// Behind Render/NGINX so cookies with SameSite=None + secure work
app.set('trust proxy', 1);

// 1) CORS FIRST
app.use(cors(corsOptions));

// 2) Body + cookies
app.use(cookieParser());
app.use(express.json());

// 3) Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4) Single CSP with dynamic API origin. No regex, no duplicates.
const defaultDirs = helmet.contentSecurityPolicy.getDefaultDirectives();
const API_ORIGIN =
  process.env.PUBLIC_API_ORIGIN ||
  process.env.RENDER_EXTERNAL_URL ||
  'http://localhost:3000';

const directives = {
  ...defaultDirs,
  // allow images from API host and data URLs
  'img-src': ["'self'", 'data:', API_ORIGIN],
};
app.use(helmet.contentSecurityPolicy({ directives }));
// allow cross-origin images/files to be served if needed
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// 5) Health
app.get('/', (_req, res) =>
  res.status(200).json({ message: 'Welcome to the Travel Blog API' })
);

// 6) APIs
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/auth', authRoutes);

// 7) SPA fallback in production (no '*splat', no '(.*)')
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../client/dist');
  app.use(express.static(buildPath));
  app.get('/*', (_req, res) => res.sendFile(path.join(buildPath, 'index.html')));
}

// 8) Errors
app.use(errorHandler);

// 9) Start server
app.listen(PORT, () => {
  console.table({
    'Server URL': `http://localhost:${PORT}`,
    Environment: process.env.NODE_ENV || 'development',
    'Allowed Origins': process.env.CORS_ORIGIN || 'http://localhost:5173',
    'API Origin in CSP': API_ORIGIN,
  });
});

// 10) DB init (top-level await is fine in ESM)
try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log('DB ready');
} catch (e) {
  console.error('DB init failed:', e?.message || e);
}
