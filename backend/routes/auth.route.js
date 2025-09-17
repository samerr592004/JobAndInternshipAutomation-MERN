import express from "express";

import { signup, verifyOTP, login, forgetPassword,resetPassword,parseResume } from "../controllers/auth.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";


const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);

router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/parse", parseResume);


// Protected routes
router.get("/me", authenticateToken);



export default router;
