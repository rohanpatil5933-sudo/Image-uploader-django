import express from "express";
import {
  addComment,
  deleteComment,
  getPostComments, // Corrected name from getCommentsByPost
} from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a comment to a post
router.post("/:postId", protect, addComment);

// Get all comments for a post
router.get("/:postId", getPostComments); // Corrected function name

// Delete a comment
router.delete("/:commentId", protect, deleteComment);

export default router;
