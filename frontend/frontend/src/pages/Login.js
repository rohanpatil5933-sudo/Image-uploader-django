import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/auth.css";
import instagramLogo from "../assets/images/logo.png";
import getapp from "../assets/images/login_bottom.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", JSON.stringify(data._id));
            localStorage.setItem("username", data.username);
            localStorage.setItem("avatar", data.avatar);
            navigate("/layout");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <img src={instagramLogo} alt="Instagram Logo" className="instagram-logo" />

                {error && <p className="error">{error}</p>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Username or Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="auth-btn">Log In</button>
                </form>

                <div className="or-separator">
                    <div className="line"></div>
                    <span>OR</span>
                    <div className="line"></div>
                </div>

                <a href="#" className="forgot-password">Forgotten your password?</a>
            </div>

            <div className="signup-container">
                <p>Don't have an account? <a href="/">Sign up</a></p>
            </div>

            <div className="get-app">
                 <p>Get the app.</p>
                    <div className="app-links">
                       <img src={getapp} alt="Download on Google Play" />
                   </div>
           </div>

           {/* Footer Section */}
           <footer>
                <ul className="footer-links">
                    <li><a href="#">Meta</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Jobs</a></li>
                    <li><a href="#">Help</a></li>
                    <li><a href="#">API</a></li>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Instagram Lite</a></li>
                    <li><a href="#">Threads</a></li>
                    <li><a href="#">Contact Uploading & Non-Users</a></li>
                    <li><a href="#">Meta Verified</a></li>
                </ul>
                <p className="footer-language">English (UK)</p>
                <p className="footer-copy">&copy; 2025 Instagram from Meta</p>
            </footer>
        </div>
    );
};

export default Login;
