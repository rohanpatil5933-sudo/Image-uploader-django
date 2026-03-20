import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h1 className="logo">Instagram</h1>
            <ul className="sidebar-menu">
                <li><Link to="/">🏠 Home</Link></li>
                <li><Link to="/search">🔍 Search</Link></li>
                <li><Link to="/explore">📸 Explore</Link></li>
                <li><Link to="/reels">🎥 Reels</Link></li>
                <li><Link to="/messages">💬 Messages</Link></li>
                <li><Link to="/notifications">🔔 Notifications</Link></li>
                <li><Link to="/create">➕ Create</Link></li>
                <li><Link to="/profile">👤 Profile</Link></li>
                <li><Link to="/more">⚙ More</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
