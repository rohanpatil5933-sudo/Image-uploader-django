import { useState, useEffect } from "react";
import Post from "./Post";
import "../assets/styles/postList.css";

const PostList = ({ posts }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (posts.length >= 0) {
            setIsLoading(false);
        }
    }, [posts]);

    return (
        <div className="post-list-container">
            {isLoading ? (
                <p className="loading-text">Loading posts...</p>
            ) : posts.length > 0 ? (
                posts.map((post) => <Post key={post._id} post={post} />)
            ) : (
                <p className="no-posts-text">No posts available</p>
            )}
        </div>
    );
};

export default PostList;
