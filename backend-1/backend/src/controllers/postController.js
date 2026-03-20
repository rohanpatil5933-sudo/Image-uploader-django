import Post from "../models/Post.js";
import User from "../models/User.js";

// @desc   Create a new post
// @route  POST /api/posts
// @access Private
const createPost = async (req, res) => {
    const { caption, image } = req.body;

    if (!caption || !image) {
        return res.status(400).json({ message: "Caption and image are required" });
    }

    try {
        const newPost = new Post({
            user: req.user._id,
            image,
            description: caption,
        });

        const savedPost = await newPost.save();

        res.status(201).json({
            message: "Post created successfully",
            post: savedPost,
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// @desc   Get all posts
// @route  GET /api/posts
// @access Public
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "username profilePic")
            .populate("likes", "username profilePic") // Include liked users
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// @desc   Get a single post by ID
// @route  GET /api/posts/:id
// @access Public
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("user", "username profilePic")
            .populate("likes", "username profilePic");
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// @desc   Delete a post
// @route  DELETE /api/posts/:id
// @access Private
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized action" });
        }

        await post.deleteOne();
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// @desc   Like a post
// @route  POST /api/posts/:id/like
// @access Private
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ message: "Post not found" });

        if (!post.likes.includes(req.user._id)) {
            post.likes.push(req.user._id);
            await post.save();
            return res.json({ message: "Post liked", likes: post.likes.length });
        }

        res.status(400).json({ message: "Already liked this post" });
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// @desc   Unlike a post
// @route  POST /api/posts/:id/unlike
// @access Private
const unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.likes.includes(req.user._id)) {
            post.likes = post.likes.filter((id) => id.toString() !== req.user._id.toString());
            await post.save();
            return res.json({ message: "Post unliked", likes: post.likes.length });
        }

        res.status(400).json({ message: "You haven't liked this post yet" });
    } catch (error) {
        console.error("Error unliking post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// @desc   Get all posts by a specific user
// @route  GET /api/posts/user/:userId  
const getUserPosts = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("Fetching posts for user ID:", userId); 
        const posts = await Post.find({ user: userId }) // 🔹 Ensure it's querying correctly
            .populate("user", "username profilePic")
            .sort({ createdAt: -1 });

        if (!posts.length) {
            return res.status(404).json({ message: "No posts found for this user" });
        }

        res.json(posts);
    } catch (error) {
        console.error("Error fetching user's posts:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export { createPost, getAllPosts, getPostById, deletePost, likePost, unlikePost, getUserPosts };
