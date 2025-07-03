import Post from "../models/Post.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import path, { dirname, join } from 'path';
import { fileURLToPath } from "url";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper: validate if id is a positive integer (Sequelize PK assumption)
const isValidId = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

// Get all posts (like Mongoose find().populate())
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.findAll({
    include: {
      model: User,
      as: 'author',
      attributes: ['id', 'firstName', 'lastName', 'email', 'username']
    }
  });

  const plainPosts = posts.map(post => post.toJSON());
  res.status(200).json(plainPosts);
});

// Create a new post
export const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.filename : null;

  // Create post
  const newPost = await Post.create({
    authorId: req.user.id,
    title,
    content,
    image
  });

  // Refetch with author included (like populate)
  const fullPost = await Post.findByPk(newPost.id, {
    include: {
      model: User,
      as: 'author',
      attributes: ['id', 'firstName', 'lastName', 'email', 'username']
    }
  });

  if (!fullPost) {
    throw new ErrorResponse('Post creation failed', 500);
  }

  res.status(201).json(fullPost.toJSON());
});

// Get a single post by ID
export const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) throw new ErrorResponse('Invalid ID', 400);

  const post = await Post.findByPk(id, {
    include: {
      model: User,
      as: 'author',
      attributes: ['id', 'firstName', 'lastName', 'username', 'email']
    }
  });

  if (!post) throw new ErrorResponse('Post not found', 404);

  res.status(200).json(post.toJSON());
});

// Get posts of logged in user (like find with filter author)
export const getMyPosts = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const posts = await Post.findAll({
    where: { authorId: userId },
    include: {
      model: User,
      as: 'author',
      attributes: ['id', 'firstName', 'lastName', 'username', 'email']
    }
  });

  // Instead of 404, return empty array if no posts
  const plainPosts = posts.map(post => post.toJSON());
  res.status(200).json(plainPosts);
});

// Update post by ID
export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const image = req.file ? req.file.filename : req.body.image;

  if (!isValidId(id)) throw new ErrorResponse('Invalid ID', 400);

  const post = await Post.findByPk(id);

  if (!post) throw new ErrorResponse('Post not found', 404);

  if (post.authorId !== req.user.id) {
    throw new ErrorResponse('Not authorized to update this post', 403);
  }

  // If new image uploaded, delete old image file if exists
  if (req.file && post.image) {
    const oldImagePath = join(__dirname, '..', 'uploads', post.image);
    fs.unlink(oldImagePath, (err) => {
      if (err) console.error('Failed to delete old image:', err);
    });
  }

  post.title = title || post.title;
  post.content = content || post.content;
  post.image = image || post.image;

  await post.save();

  // Refetch with author included
  const updatedPost = await Post.findByPk(id, {
    include: {
      model: User,
      as: 'author',
      attributes: ['id', 'firstName', 'lastName', 'username', 'email']
    }
  });

  res.status(200).json(updatedPost.toJSON());
});

// Delete post by ID
export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) throw new ErrorResponse('Invalid ID', 400);

  const post = await Post.findByPk(id);

  if (!post) throw new ErrorResponse('Post not found', 404);

  if (post.authorId !== req.user.id) {
    throw new ErrorResponse('Not authorized to delete this post', 403);
  }

  await post.destroy();

  if (post.image) {
    const imagePath = join(__dirname, '..', 'uploads', post.image);
    fs.unlink(imagePath, (err) => {
      if (err) console.error('Failed to delete image:', err);
    });
  }

  res.status(200).json({ success: `Post with id ${id} deleted` });
});
