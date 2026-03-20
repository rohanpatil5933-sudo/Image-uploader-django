import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  getUserPosts,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new post
router.post("/", protect, createPost);

// Get all posts
router.get("/", protect, getAllPosts);

// Get a single post by ID
router.get("/:id", protect, getPostById);

// Delete a post
router.delete("/:id", protect, deletePost);

// Like a post
router.post("/:id/like", protect, likePost);

// Unlike a post
router.post("/:id/unlike", protect, unlikePost);

// Get all posts by a specific user
router.get("/user/:id", protect, getUserPosts);

export default router;
