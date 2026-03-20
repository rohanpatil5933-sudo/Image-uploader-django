import { useState, useEffect } from "react";
import axios from "axios";
import "./../assets/styles/likeButton.css";

const LikeButton = ({ postId }) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState([]);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // Ensure it's stored as a string
    if (!token) console.error("User not authenticated!");

    const headers = { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/posts/${postId}`, { headers });
                console.log("Post data:", response.data); // Debugging

                setLikes(response.data.likes);

                // Check if userId exists in likes array
                const userHasLiked = response.data.likes.some(like => String(like._id) === String(userId));
                setLiked(userHasLiked);
            } catch (error) {
                console.error("Error fetching likes:", error);
            }
        };

        fetchLikes();
    }, [postId]);

    // **Like Post (POST request)**
    const likePost = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/likes/post/${postId}/like`, 
                {}, 
                { headers }
            );
            setLikes(response.data.likes); // Update likes array
            setLiked(true);
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    // **Unlike Post (DELETE request)**
    const unlikePost = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/likes/post/${postId}/unlike`, 
                { headers }
            );
            setLikes(response.data.likes); // Update likes array
            setLiked(false);
        } catch (error) {
            console.error("Error unliking post:", error);
        }
    };

    return (
        <div className="like-container">
            {liked ? (
                <button className="unlike-button" onClick={unlikePost}>
                    ❤️ Unlike
                </button>
            ) : (
                <button className="like-button" onClick={likePost}>
                    🤍 Like
                </button>
            )}
            <p className="like-count">Likes: {likes.length}</p>
        </div>
    );
};

export default LikeButton;
