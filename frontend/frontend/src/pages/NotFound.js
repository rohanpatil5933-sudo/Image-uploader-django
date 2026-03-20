import { Link } from "react-router-dom";
import "../assets/styles/notFound.css";

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="home-button">Go Back Home</Link>
        </div>
    );
};

export default NotFound;
