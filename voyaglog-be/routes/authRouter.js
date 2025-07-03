import express from 'express';
import validateZod from '../middlewares/validateZod.js';
import protect from '../middlewares/protect.js';
import { signup, login, profile, logout } from '../controllers/authController.js';
import { userSchema, signInSchema } from '../schemas/users.js';

const router = express.Router();

// Protected route for current user info
router.get('/profile', protect, profile);

// Signup route with validation
router.post('/signup', validateZod(userSchema.POST), signup);

// Login route with validation (no protect middleware here!)
router.post('/login', validateZod(signInSchema), login);

// Logout route
router.post('/logout', logout);

export default router;
