import express from "express";
import {
    createSubscription,
    verifyPayment,
    cancelSubscription,
    getUserSubscribers
} from "../controllers/subscriptionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new subscription using Razorpay
router.post("/create", protect, createSubscription);

// Verify the payment status
router.post("/verify", protect, verifyPayment);

// Cancel a subscription
router.post("/cancel", protect, cancelSubscription);

// Get all subscribers of a user
router.get("/:id", protect, getUserSubscribers);

export default router;
