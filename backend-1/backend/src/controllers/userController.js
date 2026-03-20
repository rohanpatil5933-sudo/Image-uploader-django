import User from "../models/User.js";

// @desc   Get user profile by ID
// @route  GET /api/users/:id
// @access Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   Follow a user
// @route  POST /api/users/:id/follow
// @access Private
const followUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.user._id);

        if (!userToFollow || !loggedInUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (loggedInUser.following.includes(userToFollow._id)) {
            return res.status(400).json({ message: "Already following this user" });
        }

        loggedInUser.following.push(userToFollow._id);
        userToFollow.followers.push(loggedInUser._id);

        await loggedInUser.save();
        await userToFollow.save();

        res.json({ message: `You are now following ${userToFollow.username}` });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   Unfollow a user
// @route  POST /api/users/:id/unfollow
// @access Private
const unfollowUser = async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.user._id);

        if (!userToUnfollow || !loggedInUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!loggedInUser.following.includes(userToUnfollow._id)) {
            return res.status(400).json({ message: "You are not following this user" });
        }

        loggedInUser.following = loggedInUser.following.filter(
            (id) => id.toString() !== userToUnfollow._id.toString()
        );
        userToUnfollow.followers = userToUnfollow.followers.filter(
            (id) => id.toString() !== loggedInUser._id.toString()
        );

        await loggedInUser.save();
        await userToUnfollow.save();

        res.json({ message: `You have unfollowed ${userToUnfollow.username}` });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export { getUserProfile, followUser, unfollowUser };
