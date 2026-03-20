import { useState } from "react";
import { Link } from "react-router-dom";
import "./../assets/styles/post.css";

const Post = ({ post }) => {
    const [likes, setLikes] = useState(post.likes.length);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setLiked(!liked);
    };

    return (
        <div className="post">
            <div className="post-header">
                <Link to={`/profile/${post.user._id}`} className="post-user">
                    {/* <img src={post.user.profilePic} alt="Profile" className="profile-pic" /> */}
                    <span>{post.user.username}</span>
                </Link>
            </div>
            <img src={post.image} alt="Post" className="post-image" />
            <div className="post-actions">
                <button className={liked ? "liked" : ""} onClick={handleLike}>
                    ❤️ {likes}
                </button>
                <Link to={`/post/${post._id}`} className="comment-btn">
                    💬 {post.comments.length} Comments
                </Link>
            </div>
            <p className="post-description">{post.description}</p>
        </div>
    );
};

export default Post;
