import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import PostList from "../components/PostList";
import "../assets/styles/profile.css";

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showFileInput, setShowFileInput] = useState(false); // State to control input visibility

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
                console.log("User data:", response.data);

                fetchUserPosts(response.data._id);
            } catch (error) {
                console.error("Error fetching profile data:", error.response?.data || error.message);
            }
        };

        const fetchUserPosts = async (userId) => {
            try {
                const token = localStorage.getItem("token");
                if (!userId) return;
                console.log("Fetching posts for user ID:", userId);
                const response = await axios.get(`http://localhost:8000/api/posts/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserPosts(response.data);
                console.log("User posts:", response.data);
            } catch (error) {
                console.error("Error fetching user posts:", error.response?.data || error.message);
            }
        };

        fetchProfile();
    }, []);

    // Handle File Change
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Handle Profile Photo Update
    const handleUpload = async () => {
        if (!showFileInput) {
            setShowFileInput(true);
            return; // Show the file input first
        }

        if (!selectedFile) {
            alert("Please select an image!");
            return;
        }

        const formData = new FormData();
        formData.append("avatar", selectedFile);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put("http://localhost:8000/api/auth/update-avatar",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const updatedAvatar = response.data.avatar;

            // Store in local storage for persistence
            localStorage.setItem("avatar", updatedAvatar);

            // Update UI
            setUser((prevUser) => ({ ...prevUser, avatar: updatedAvatar }));

            alert("Profile photo updated successfully!");

            // Hide the file input after upload
            setShowFileInput(false);
            setSelectedFile(null);
        } catch (error) {
            console.error("Error updating profile photo:", error.response?.data || error.message);
        }
    };

    return (
        <div className="profile">
            <Navbar />
            {user ? (
                <div className="profile-header">
                    <img 
                        src={user.avatar ? `http://localhost:8000${user.avatar}` : "https://www.example.com/default-avatar.png"} 
                        alt={`${user.username}'s profile`} 
                        className="profile-pic" 
                    />
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                    <p><strong>Followers:</strong> {user.followers?.length} | <strong>Following:</strong> {user.following?.length}</p>

                    {/* Conditional Rendering for File Input */}
                    {showFileInput && (
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    )}

                    <button onClick={handleUpload}>
                        {showFileInput ? "Upload Profile Photo" : "Change Profile Photo"}
                    </button>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}

            <h3>{user?.username}'s Posts</h3>
            <PostList posts={userPosts} />
        </div>
    );
};

export default Profile;
