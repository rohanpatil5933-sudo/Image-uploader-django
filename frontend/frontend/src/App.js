import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

// Import pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";

// Import components
import Navbar from "./components/Navbar";
import MainLayout from "./pages/MainLayout";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/layout" element={<MainLayout />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/post/:id" element={<PostDetail />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
