// core.js
const raw = process.env.CORS_ORIGIN || 'http://localhost:5173';
const allowedOrigins = raw
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

console.log('Allowed Origins:', allowedOrigins);

const corsOptions = {
  origin(origin, cb) {
    // allow no-origin (curl, server-to-server, health checks)
    if (!origin) return cb(null, true);

    // exact match only; Origin never has a trailing slash or path
    if (allowedOrigins.includes(origin)) {
      return cb(null, true);
    }

    console.warn(`❌ CORS blocked: ${origin}`);
    return cb(new Error(`CORS policy: Origin ${origin} not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie'],
};

export default corsOptions;
