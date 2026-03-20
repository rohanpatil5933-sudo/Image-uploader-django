import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String, // URL of the user's avatar image
      default: "https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70._SX1080_FMjpg_.jpg",
    },
    bio: {
      type: String,
      maxLength: 200,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // User that follows the current user
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // User being followed by the current user
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
