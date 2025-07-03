import User from '../models/User.js';
import bcrypt from 'bcrypt';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const saltRounds = 8;



// Create a new user
export const createUser = asyncHandler(async (req, res) => {
  
  const {
    body: { firstName, lastName, username, phone , email, password },
  } = req;

  const found = await User.findOne({ where: { email } });
  if (found) throw new ErrorResponse('User already exists!');

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = await User.create({ firstName, lastName, username, phone ,email, password: hashedPassword });
  res.status(201).json(newUser);
});

// Get all users
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

// Get user by ID
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    attributes: ['id', 'firstName', 'lastName', 'username','phone', 'email'],
  });

  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  res.status(200).json(user);
});

// Update user by ID
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, username, phone , email, password } = req.body;

  const user = await User.findByPk(id);
  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  user.firstName= firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.username = username || user.username;
  user.phone = phone || user.phone;
  user.email = email || user.email;
  if (password) {
    user.password = await bcrypt.hash(password, saltRounds);
  }

  await user.save();
  res.status(200).json(user);
});

// Delete user by ID
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  await user.destroy();
  res.status(204).send();
});
