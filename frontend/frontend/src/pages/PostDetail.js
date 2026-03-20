import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LikeButton from "../components/LikeButton";
import CommentSection from "../components/CommentSection";
import "../assets/styles/postDetail.css";

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/posts/${postId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to load post");
                }

                setPost(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) return <p>Loading post...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!post) return <p>Post not found.</p>;

    return (
        <div className="post-detail-container">
            <h2>{post.title}</h2>
            <p>By {post.author.username}</p>
            <img src={post.image} alt="Post" className="post-image" />
            <p>{post.content}</p>

            <div className="post-actions">
                <LikeButton postId={post._id} likes={post.likes} />
            </div>

            <CommentSection postId={post._id} comments={post.comments} />
        </div>
    );
};

export default PostDetail;
