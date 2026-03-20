import express from "express";
import { getUserProfile, followUser, unfollowUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get a user profile by ID
router.get("/:id", protect, getUserProfile);

// Follow a user
router.post("/:id/follow", protect, followUser);

// Unfollow a user
router.post("/:id/unfollow", protect, unfollowUser);

export default router;
