import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // The user who made the comment
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // The post where the comment was made
      required: true,
    },
    text: {
      type: String,
      required: true,
      maxLength: 500, // Max length of the comment
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
