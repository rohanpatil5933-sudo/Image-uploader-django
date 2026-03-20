import express from "express";
import { likePost, unlikePost, likeComment,unlikeComment } from "../controllers/likeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Like a post
router.post("/post/:postId/like", protect, likePost);

// Unlike a post
router.delete("/post/:postId/unlike", protect, unlikePost);

// Like a comment
router.post("/comment/:commentId", protect, likeComment);

// Unlike a comment
router.delete("/comment/:commentId", protect, unlikeComment);

export default router;
