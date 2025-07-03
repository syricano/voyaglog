import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const protect = asyncHandler(async (req, res, next) => {
  // Try cookie first, then header
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer') 
    ? req.headers.authorization.split(' ')[1] 
    : null);

  if (!token) throw new ErrorResponse('Not authorized, no token provided', 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) throw new ErrorResponse('User not found', 404);
    
    console.log('Token verified:', decoded);

    req.user = user;
    next();
  } catch (err) {
    console.log('Token verification failed:', err.message);
    throw new ErrorResponse('Invalid token', 401);
  }
});



export default protect;