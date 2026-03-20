import Comment from "../models/Comment.js";
import Post from "../models/Post.js";


const likePost = async (req, res) => {
    try {
        console.log("Post ID received:", req.params.postId); // Debugging

        // Find the post by ID
        const post = await Post.findById(req.params.postId);
        console.log("Post found:", post); // Debugging

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if user already liked the post (assuming likes is an array of user IDs)
        if (post.likes.includes(req.user._id)) {
            return res.status(400).json({ message: "Post already liked" });
        }

        // Increment the likes count and push user ID
        post.likes.push(req.user._id);
        await post.save();

        res.json({ message: "Post liked", likes: post.likes.length });
    } catch (error) {
        console.error("Error in likePost:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const unlikePost = async (req, res) => {
    try {
        console.log("Post ID received:", req.params.postId); // Debugging

        const post = await Post.findById(req.params.postId);
        console.log("Post found:", post); // Debugging

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if user has liked the post
        if (!post.likes.includes(req.user._id)) {
            return res.status(400).json({ message: "Post not liked yet" });
        }

        // Remove user ID from likes array
        post.likes = post.likes.filter((id) => id.toString() !== req.user._id.toString());
        await post.save();

        res.json({ message: "Post unliked", likes: post.likes.length });
    } catch (error) {
        console.error("Error in unlikePost:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const likeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) return res.status(404).json({ message: "Comment not found" });

        if (comment.likes.includes(req.user._id)) {
            return res.status(400).json({ message: "Comment already liked" });
        }

        comment.likes.push(req.user._id);
        await comment.save();

        res.json({ message: "Comment liked" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   Unlike a comment
// @route  DELETE /api/comments/:id/unlike
// @access Private
const unlikeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) return res.status(404).json({ message: "Comment not found" });

        if (!comment.likes.includes(req.user._id)) {
            return res.status(400).json({ message: "Comment not liked yet" });
        }

        comment.likes = comment.likes.filter((id) => id.toString() !== req.user._id.toString());
        await comment.save();

        res.json({ message: "Comment unliked" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export { likeComment, unlikeComment, likePost, unlikePost };
