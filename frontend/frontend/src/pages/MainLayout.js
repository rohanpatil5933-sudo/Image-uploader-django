import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSearch, FaCompass, FaVideo, FaEnvelope, FaHeart, FaPlusCircle, FaUser } from "react-icons/fa";
import axios from "axios";
import "../assets/styles/mainLayout.css";
import LikeButton from "../components/LikeButton";
import CommentSection from "../components/CommentSection";

const MainLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ image: "", caption: "" });
  const storiesData = [
    { username: "sagar123", image: "https://randomuser.me/api/portraits/men/1.jpg" },
    { username: "amar001", image: "https://randomuser.me/api/portraits/men/2.jpg" },
    { username: "lucky777", image: "https://randomuser.me/api/portraits/men/3.jpg" },
    { username: "queen123", image: "https://randomuser.me/api/portraits/women/1.jpg" },
    { username: "disha@67", image: "https://randomuser.me/api/portraits/women/2.jpg" },
    { username: "raj_rock", image: "https://randomuser.me/api/portraits/men/4.jpg" },
    { username: "deepa_21", image: "https://randomuser.me/api/portraits/women/3.jpg" },
    { username: "mohit_09", image: "https://randomuser.me/api/portraits/men/5.jpg" },
    { username: "priya_sharma", image: "https://randomuser.me/api/portraits/women/4.jpg" },
    { username: "rohit_singh", image: "https://randomuser.me/api/portraits/men/6.jpg" },
    { username: "ananya_98", image: "https://randomuser.me/api/portraits/women/5.jpg" },
    { username: "vikas_xo", image: "https://randomuser.me/api/portraits/men/7.jpg" },
    { username: "tanya_star", image: "https://randomuser.me/api/portraits/women/6.jpg" },
    { username: "rahul_gamer", image: "https://randomuser.me/api/portraits/men/8.jpg" },
    { username: "simran_k", image: "https://randomuser.me/api/portraits/women/7.jpg" },
    { username: "arjun_dev", image: "https://randomuser.me/api/portraits/men/9.jpg" },
    { username: "riya_love", image: "https://randomuser.me/api/portraits/women/8.jpg" },
  ];
  
  const [stories] = useState(storiesData);
  const token = localStorage.getItem("token");
  const storedUserId = localStorage.getItem("userId");
  const storedUsername = localStorage.getItem("username");
let currentUserId = null;
try {
  if (storedUserId) {
    currentUserId = JSON.parse(storedUserId);
  }
} catch (error) {
  console.error("Error parsing userId from localStorage:", error);
  localStorage.removeItem("userId"); // Remove corrupted data
}

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8000/api/posts/", {
          headers: {Authorization: `Bearer ${token}`},
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8000/api/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(response.data);
            console.log("User data fetched successfully:", response.data);
        } catch (error) {
            console.error("Error fetching profile data:", error.response?.data || error.message);
        }
    }});

  // const handleLike = (postId) => {
  //   setPosts((prevPosts) =>
  //     prevPosts.map((post) =>
  //       post._id === postId ? { ...post, likes: [...post.likes, "newLike"] } : post
  //     )
  //   );
  // };

  const handleCommentChange = (postId, text) => {
    setComments({ ...comments, [postId]: text });
  };

  const handleCommentSubmit = (postId) => {
    console.log("Comment submitted for post:", postId, comments[postId]);
    setComments({ ...comments, [postId]: "" });
  };

  const handleCreatePost = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/posts/",
        {
          caption: newPost.caption,
          image: newPost.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPosts([response.data.post, ...posts]);
      localStorage.setItem("postId", response.data.post._id);
      console.log("Post created successfully", response.data.post);
      setShowCreatePost(false);
      setNewPost({ image: "", caption: "" });
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

  const handleDeletePost = async (postId) => {
    console.log("Deleting post with ID:", postId);
    try {
      await axios.delete(`http://localhost:8000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
  
      // Remove the deleted post from the state
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewPost({ ...newPost, image: URL.createObjectURL(file) }); // Convert to a local URL for preview
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="main-layout">
      <div className="sidebar">
        <h1 className="logo">Instagram</h1>
        <ul>
          <li><Link to="/layout"><FaHome /> Home</Link></li>
          <li><Link to="#"><FaSearch /> Search</Link></li>
          <li><Link to="#"><FaCompass /> Explore</Link></li>
          <li><Link to="#"><FaVideo /> Reels</Link></li>
          <li><Link to="#"><FaEnvelope /> Messages</Link></li>
          <li><Link to="#"><FaHeart /> Notifications</Link></li>
          <li><button onClick={() => setShowCreatePost(true)}><FaPlusCircle /> Create</button></li>
          <li><Link to="/profile"><FaUser /> Profile</Link></li>
          {/* <li><Link to="/more">More</Link></li> */}
        </ul>
      </div>
      <div className="center-content">
        <div className="stories-container">
      {stories.map((story, index) => (
        <div key={index} className="story">
          <img src={story.image} alt={story.username} loading="lazy" />
          <p>{story.username}</p>
        </div>
      ))}
    </div>

        {showCreatePost && (
          <div className="create-post-form">
            <h2>Create Post</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange }
              placeholder="Select Image"
            />
            {/* <input
              type="text"
              placeholder="Image URL"
              value={newPost.image}
              onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
            /> */}
            <input
              type="text"
              placeholder="Caption"
              value={newPost.caption}
              onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
            />
            <button onClick={handleCreatePost}>Add Post</button>
            <button onClick={() => setShowCreatePost(false)}>Cancel</button>
          </div>
        )}

<div className="posts-container">
  {posts.map((post) => (
    <div key={post._id} className="post">
      <h4>{post.user.username}</h4>
      <img src={post.image} alt="Post" />
      <p>{post.description}</p>

      {/* Like & Delete Buttons */}
      <div className="post-actions">
        {/* <button
          className={post.likes.includes(currentUserId) ? "like-btn liked" : "like-btn"}
          onClick={() => handleLike(post._id)}
        >
          <FaHeart /> Like ({post.likes.length})
          
        </button> */}
        <LikeButton postId={post._id}  />  
        <button className="delete-btn" onClick={() => handleDeletePost(post._id)}>
          🗑️ Delete
        </button>
      </div>

      {/* Comment Section */}
      <div className="comment-section">
        <CommentSection postId={post._id} />
      </div>
    </div>
  ))}
</div>
        </div>  
      <div className="right-sidebar"> 
        <div className="account-switch"> 
          <div className="user-info"> 
            <img src={user.avatar ? `http://localhost:8000${user.avatar}` : "https://www.example.com/default-avatar.png"} 
                        alt={`${user.username}'s profile`}  /> 
                    <div> 
                       <h2 style={{"color":"black"}}>{storedUsername}</h2> 
                       <Link to="/">Switch</Link>
                    </div> 
                 </div> 
                 <button className="logout-btn"
                          style={
                            {
                              backgroundColor: "red",
                              color: "white",
                              border: "none",
                              padding: "10px 16px",
                              borderRadius: "5px",
                              fontSize: "16px",
                              fontWeight: "bold",
                              cursor: "pointer",
                              transition: "background-color 0.3s ease",
                               boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)"
                            }
                          }
                         onClick={handleLogout}
                     >
                               Log Out
                           </button>
                  </div> 
                  <div className="suggested-users">
                             <h4>Suggested for you</h4>
                               {[
                                 { name: "john", img: "https://randomuser.me/api/portraits/men/1.jpg" },
                                 { name: "marry", img: "https://randomuser.me/api/portraits/women/1.jpg" },
                                 { name: "annie", img: "https://randomuser.me/api/portraits/women/2.jpg" },
                                               ].map((user, index) => (
                            <div key={index} className="suggested-user">
                               <img src={user.img} alt={user.name} />
                                <p>{user.name}</p>
                               <button>Follow</button>
                             </div>
                               ))}
                            </div>
              </div>
    </div>
  );
};
export default MainLayout;
