import express from 'express';
import cors from 'cors';
import corsOptions from './middlewares/cors.js';
import errorHandler from './middlewares/errorHandler.js';
import postRouter from './routes/postRouter.js';
import userRouter from './routes/userRouter.js';
import sequelize from './db/index.js';
import './db/associations.js'; 
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRouter.js';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


console.log('--- ENVIRONMENT INFO ---');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);
console.log('VITE_API_BASE_URL:', process.env.VITE_API_BASE_URL);

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ['http://localhost:5173'];

console.log('Allowed Origins:', allowedOrigins);
console.log('-----------------------');


// Create an instance of express
const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 3000;


app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'http://localhost:8080', 'data:'],
      // other directives as needed
    },
  })
);


// Middleware
app.use(express.json());
app.use(cors(corsOptions)); // Use the imported corsOptions here

// For uploads static serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  //*Set static folder up in production
  const buildPath = path.join(__dirname, '../client/dist');
  app.use(express.static(buildPath));

  app.get('*splat', (req, res) => res.sendFile(path.join(buildPath, 'index.html')));
}
// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to the Travel Blog API"
  });
});

// Routes
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/auth', authRoutes);



// Error handling middleware
app.use(errorHandler);


// DB Sync and Server Start
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.table({
        'Server URL': `http://localhost:${PORT}`,
        'Environment': process.env.NODE_ENV || 'development',
        'Database': process.env.DB_URL
      });
    });
  })

  
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });