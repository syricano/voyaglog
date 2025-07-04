import cors from 'cors';

const allowedOrigins = [
  'https://voyaglog.onrender.com', // frontend
  'http://localhost:5173',          // dev
];

console.log('Allowed Origins:', allowedOrigins);
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      // Allow requests like curl, Postman or mobile apps without origin
      console.log('No origin provided, allowing request');
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      console.log(`Origin ${origin} is allowed`);
      callback(null, true);
    } else {
      console.log(`Origin ${origin} is not allowed`);
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
};


export default corsOptions;
