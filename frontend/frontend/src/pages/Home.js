import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/home.css";
import Register from "./Register";
import getapp from "../assets/images/login_bottom.png";
import instaPreview from "../assets/images/home.png"; 

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-content">
                {/* Left Side: Instagram Preview Image */}
                <div className="home-left">
                    <img src={instaPreview} alt="Instagram Preview" className="preview-image" />
                </div>
                
                {/* Right Side: Authentication Section */}
                <div className="home-right">
                    <div className="login-box">
                        <h1 className="logo-text">Instagram</h1>
                        <p className="signup-text">
                            Sign up to see photos and videos from your friends.
                        </p>
                        <button className="facebook-login-btn">Log in with Facebook</button>
                        <h2 className="or-text">OR</h2>
                        <div className="register-container">
                              <Register />
                        </div>
                        <p className="info-text">
                            People who use our service may have uploaded your contact information to Instagram. 
                            <a href="#"> Learn more</a>
                        </p>
                        <p className="terms">
                            By signing up, you agree to our 
                            <a href="#"> Terms</a>, 
                            <a href="#"> Privacy Policy</a>, and 
                            <a href="#"> Cookies Policy</a>.
                        </p>
                    </div>

                    {/* Login Link */}
                    <div className="login-box secondary-box">
                        <p>Have an account? <Link to="/login">Log in</Link></p>
                    </div>

                    {/* App Download Section */}
                    <div className="get-app">
                        <p>Get the app.</p>
                        <div className="app-links">
                            <img src={getapp} alt="Download on Google Play" />
                        </div>
                    </div>
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

export default Home;
