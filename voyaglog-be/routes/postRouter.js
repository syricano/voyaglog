import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts,
} from "../controllers/postController.js";
import validateRequest from '../middlewares/validateRequest.js';
import upload from "../middlewares/upload.js";
import protect from "../middlewares/protect.js";

const postRouter = Router();

// Public routes
postRouter.get("/", getPosts);
postRouter.get("/my-posts", protect, getMyPosts);
postRouter.get("/:id", getPostById);

// Protected routes with upload and validation middlewares
postRouter.post(
  "/",
  protect,
  upload.single("image"),
  validateRequest("posts"),
  createPost
);

postRouter.put(
  "/:id",
  protect,
  upload.single("image"),
  validateRequest("posts"),
  updatePost
);

postRouter.delete("/:id", protect, deletePost);

export default postRouter;
