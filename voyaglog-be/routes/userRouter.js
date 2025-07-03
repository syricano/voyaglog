import express from 'express';
import  validateRequest  from '../middlewares/validateRequest.js';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.route('/')
  .post(validateRequest('users'), createUser) // Create a new user
  .get(getUsers); // Get all users

userRouter.route('/:id')
  .get(getUserById) // Get a user by ID
  .put(validateRequest('users'), updateUser) // Update a user by ID
  .delete(deleteUser); // Delete a user by ID

export default userRouter;