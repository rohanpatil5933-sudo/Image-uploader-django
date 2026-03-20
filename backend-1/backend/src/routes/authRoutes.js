import express from "express";
import { registerUser, loginUser, getProfile, updateAvatar } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer storage settings (store images in 'uploads' folder)
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, `${req.user._id}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// Register new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get logged-in user profile
router.get("/profile", protect, getProfile);

// Update Profile Picture Route
router.put("/update-avatar", protect, upload.single("avatar"), updateAvatar);

export default router;
