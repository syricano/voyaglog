import { z } from 'zod';
import ErrorResponse from '../utils/ErrorResponse.js';

// Zod middleware for validating request body
const validateZod = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const formatted = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    return next(new ErrorResponse(`Validation error: ${formatted}`, 400));
  }

  req.sanitizedBody = result.data;
  next();
};

export default validateZod;
