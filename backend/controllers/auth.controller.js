import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // if you're using ES modules
import nodemailer from "nodemailer";
import { sendEmail } from "../utils/sendEmail.js";
import OpenAI from "openai";
import fs from "fs";
import { parseResumeWithGemini } from "../services/gemini.service.js";

// Generate Random OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Signup with OTP
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
        return res.status(400).json({
          success: false,
          message:
            "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character",
        });
      }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            otp,
            isVerified: false
        });

        await newUser.save();

        await sendEmail(email, "Verify your email", `Your OTP is: ${otp}`);

        res.status(200).json({ message: "OTP sent to your email" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

        user.isVerified = true;
        user.otp = null;
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Create JWT token (expires in 3 days)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d"
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Gemini integration for resume parsing


export const parseResume = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Resume text is required" });
    }

    const parsedData = await parseResumeWithGemini(text);
    res.json({ parsedResume: parsedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
