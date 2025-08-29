import express from "express";
import { signup, verifyOTP, login, getUserProfile } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);

// Protected routes
router.get("/me", authenticateToken, getUserProfile);


export default router;
