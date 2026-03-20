import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // The user who liked the post
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // The post that was liked
      required: true,
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);

export default Like;
