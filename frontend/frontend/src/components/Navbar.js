import { Link, useNavigate } from "react-router-dom";
import "./../assets/styles/navbar.css";

const Navbar = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
      };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/layout" className="navbar-logo">
                    Instagram Clone
                </Link>
                <ul className="navbar-links">
                    <li>
                        <Link to="/layout">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
