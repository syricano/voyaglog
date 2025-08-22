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

app.set('trust proxy', 1);

// CORS
app.use(cors(corsOptions));

// Body & cookies
app.use(cookieParser());
app.use(express.json());

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Security headers (minimal)
app.use(helmet());
// allow cross-origin usage of images/files (frontend <> backend)
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// API routes
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/auth', authRoutes);

// Serve SPA in production (no wildcard patterns that break express/router)
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../voyaglog-fe/dist');
  app.use(express.static(buildPath));
  app.use((req, res, next) => {
    if (req.method !== 'GET') return next();
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Errors
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.table({
    'Server URL': `http://localhost:${PORT}`,
    Environment: process.env.NODE_ENV || 'development',
    'Allowed Origins': process.env.CORS_ORIGIN || 'http://localhost:5173',
  });
});

// DB init
try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log('DB ready');
} catch (e) {
  console.error('DB init failed:', e?.message || e);
}
