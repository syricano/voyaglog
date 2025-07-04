const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ['http://localhost:5173'];

console.log('Allowed Origins:', allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      // Allow tools like Postman or curl with no origin
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.warn(`❌ Origin not allowed: ${origin}`);
      return callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
};

export default corsOptions;
