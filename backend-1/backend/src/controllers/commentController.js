import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// @desc   Add a comment to a post
// @route  POST /api/posts/:id/comments
// @access Private
const addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { postId } = req.params; // Correct extraction
        console.log("Post ID:", postId); // Debugging

        const post = await Post.findById(postId);
        console.log("Post found:", post); // Debugging

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = new Comment({
            user: req.user._id,
            post: postId,
            text,
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error in addComment:", error); // Debugging
        res.status(500).json({ message: "Server error" });
    }
};


// @desc   Get all comments for a post
// @route  GET /api/posts/:id/comments
// @access Public
const getPostComments = async (req, res) => {
    try {
        const { postId } = req.params; // Extract postId correctly
        console.log("Fetching comments for Post ID:", postId); // Debugging

        const comments = await Comment.find({ post: postId }).populate("user", "username profilePic");

        if (!comments || comments.length === 0) {
            return res.status(200).json({ message: "No comments found", comments: [] });
        }

        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// @desc   Delete a comment
// @route  DELETE /api/comments/:id
// @access Private
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) return res.status(404).json({ message: "Comment not found" });

        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await comment.deleteOne();
        res.json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export { addComment, getPostComments, deleteComment };
