import express from "express";
<<<<<<< HEAD
import { signup, verifyOTP, login,forgetPassword,resetPassword,parseResume } from "../controllers/auth.controller.js";
=======
import { signup, verifyOTP, login, getUserProfile } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
>>>>>>> 62e49ddcdbd31b0aba52bf441c032f7058273fa6

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
<<<<<<< HEAD
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/parse", parseResume);
=======

// Protected routes
router.get("/me", authenticateToken, getUserProfile);

>>>>>>> 62e49ddcdbd31b0aba52bf441c032f7058273fa6

export default router;
