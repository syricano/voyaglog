// config/corsOptions.js
const raw = process.env.CORS_ORIGIN || 'http://localhost:5173';
export const allowedOrigins = raw.split(',').map(s => s.trim()).filter(Boolean);

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);           // allow curl/Postman
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS policy: Origin ${origin} not allowed`));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  exposedHeaders: ['Set-Cookie'],
};

export default corsOptions;
