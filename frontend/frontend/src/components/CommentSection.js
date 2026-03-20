import { useState, useEffect } from "react";
import axios from "axios";
import "./../assets/styles/commentSection.css";

const CommentSection = ({ postId }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem("token");

    const headers = { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    // **Fetch Comments (GET request)**
    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/comments/${postId}`, { headers });
            console.log("Fetched comments:", response.data); // Debugging
            setComments(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching comments:", error);
            setComments([]); // Fallback to empty array
        }
    };

    // **useEffect is now unconditional**
    useEffect(() => {
        fetchComments();
    }, [postId]);

    // **Add Comment (POST request)**
    const addComment = async () => {
        if (!comment.trim()) return;
        try {
            const response = await axios.post(`http://localhost:8000/api/comments/${postId}`, 
                { text: comment }, { headers }
            );
            setComments([...comments, response.data]);
            setComment(""); 
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    // **Like/Unlike Comment**
    const toggleLike = async (commentId, likedByUser) => {
        try {
            await axios.post(`http://localhost:8000/api/comments/${commentId}/like`, {}, { headers });
            setComments(comments.map(c => 
                c._id === commentId ? { ...c, likedByUser: !likedByUser, likes: c.likes + (likedByUser ? -1 : 1) } : c
            ));
        } catch (error) {
            console.error("Error liking comment:", error);
        }
    };

    // **Delete Comment (DELETE request)**
    const deleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:8000/api/comments/${commentId}`, { headers });
            setComments(comments.filter(c => c._id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    // **UI Rendering - Moved Authentication Check Here**
    if (!token) {
        return <p>Please log in to view and post comments.</p>;
    }

    return (
        <div className="comment-section">
            <div className="comment-input">
                <input 
                    type="text" 
                    placeholder="Write a comment..." 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                />
                <button onClick={addComment}>Post</button>
            </div>
            <div className="comments-list">
                {comments.length > 0 ? (
                    comments.map((c) => (
                        <div key={c._id} className="comment">
                            <span><strong>{c.user.username}</strong>: {c.text}</span>
                            <div className="comment-actions">
                                <button 
                                    className={c.likedByUser ? "liked" : "unliked"} 
                                    onClick={() => toggleLike(c._id, c.likedByUser)}
                                >
                                    {c.likedByUser ? "❤️" : "🤍"} {c.likes}
                                </button>
                                {/* <button onClick={() => deleteComment(c._id)}>🗑️</button> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
