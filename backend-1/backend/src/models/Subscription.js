import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // The user who subscribed
      required: true,
    },
    plan: {
      type: String,
      enum: ["Basic", "Premium", "Pro"], // Subscription plan types
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Expired", "Cancelled"],
      default: "Active",
    },
    paymentId: {
      type: String, // Razorpay Payment ID
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date, // Expiry date of the subscription
      required: true,
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
