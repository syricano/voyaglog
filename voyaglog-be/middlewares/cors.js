import cors from 'cors';

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.CORS_ORIGIN]  // Single origin from Render env var, e.g. https://voyaglog-fe.onrender.com
  :  process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : ['http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      // Allow requests like curl, Postman or mobile apps without origin
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
};


export default corsOptions;
