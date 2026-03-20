import Subscription from "../models/Subscription.js";

// @desc   Create a new subscription using Razorpay
// @route  POST /api/subscriptions/create
// @access Private
const createSubscription = async (req, res) => {
    try {
        const subscription = new Subscription({
            subscriber: req.user._id,
            subscribedTo: req.body.subscribedTo, // Assuming subscribedTo ID is sent in the request body
        });

        await subscription.save();
        res.status(201).json({ message: "Subscription created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc   Verify the payment status
// @route  POST /api/subscriptions/verify
// @access Private
const verifyPayment = async (req, res) => {
    try {
        // Implement payment verification logic (Example: Razorpay webhook validation)
        res.json({ message: "Payment verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc   Cancel a subscription
// @route  POST /api/subscriptions/cancel
// @access Private
const cancelSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findOneAndDelete({
            subscriber: req.user._id,
            subscribedTo: req.body.subscribedTo, // Assuming subscribedTo ID is sent in the request body
        });

        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }

        res.json({ message: "Subscription canceled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc   Get all subscribers of a user
// @route  GET /api/subscriptions/:id
// @access Public
const getUserSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscription.find({ subscribedTo: req.params.id }).populate(
            "subscriber",
            "username profilePic"
        );
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export { createSubscription, verifyPayment, cancelSubscription, getUserSubscribers };
