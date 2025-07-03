import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import { Op } from 'sequelize';

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRATION || '7d';

// 🔐 Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    jwtSecret,
    { expiresIn: jwtExpiration }
  );
};

// 🍪 Set token in cookie
const setTokenCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// ✍️ Register
export const signup = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, username, email, password, phone } = req.body;
  console.log('📥 Incoming signup data:', req.body);

  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email }, { username }],
    },
  });

  if (existingUser) {
    console.warn('⚠️ User already exists:', existingUser.username);
    throw new ErrorResponse('User already exists', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      phone,
      email,
      password: hashedPassword,
    });

    console.log('✅ User created:', newUser?.id);

    const token = generateToken(newUser);
    setTokenCookie(res, token);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        firstName,
        lastName,
        username,
        phone,
        email,
      },
    });
  } catch (err) {
    console.error('❌ Sequelize error during User.create:', err);
    if (
      err.name === 'SequelizeValidationError' ||
      err.name === 'SequelizeUniqueConstraintError'
    ) {
      return res.status(400).json({
        error: err.errors?.[0]?.message || 'Validation error',
      });
    }
    return next(new ErrorResponse('Signup failed', 500));
  }
});

// 🔑 Login
export const login = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body || {};
  if (!identifier || !password) {
  throw new ErrorResponse('Missing email/username or password', 400);
  }

  const trimmed = identifier.trim();

  const user = await User.findOne({
    where: {
      [trimmed.includes('@') ? 'email' : 'username']: trimmed,
    },
  });

  if (!user) throw new ErrorResponse('Invalid credentials', 401);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ErrorResponse('Invalid credentials', 401);

  const token = generateToken(user);
  setTokenCookie(res, token);

  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      phone: user.phone,
      email: user.email,
    },
  });
});

// 🧠 Get current user
export const profile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ErrorResponse('User not found', 404);

  res.status(200).json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    phone: user.phone,
    email: user.email,
  });
});

// 🚪 Logout
export const logout = asyncHandler(async (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

// ✏️ Update User
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, username, email, phone, password } = req.body;

  const user = await User.findByPk(id);
  if (!user) throw new ErrorResponse('User not found', 404);

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.username = username || user.username;
  user.email = email || user.email;
  user.phone = phone || user.phone;

  if (password) {
    user.password = await bcrypt.hash(password, 12);
  }

  await user.save();

  res.status(200).json({
    message: 'User updated successfully',
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      phone: user.phone,
      email: user.email,
    },
  });
});
