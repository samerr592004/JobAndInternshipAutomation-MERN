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

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//forget password
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Create reset token (expires in 10 minutes)
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    // 3. Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 4. Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      html: `
        <h1>Reset Your Password</h1>
        <p>Click on the following link to reset your password:</p>
        <a href="http://localhost:5173/reset-password/${token}">
          Reset Password ${token}
        </a>
        <p>The link will expire in 10 minutes.</p>
        <p>If you didn't request a password reset, please ignore this email.</p>
      `,
    };

    // 5. Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reset password


export const resetPassword = async (req, res) => {
  try {
    // Verify the token
    const decodedToken = jwt.verify(req.params.token, process.env.JWT_SECRET);

    // Find the user
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Validate password strength (optional but good to add)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(req.body.newPassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 chars, include uppercase, lowercase, number, and special character",
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ message: "Password updated successfully" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(400).send({ message: "Token expired" });
    }
    res.status(500).send({ message: err.message });
  }
};

// openAi integration

// console.log("Loaded API Key:", process.env.OPENAI_API_KEY?.slice(0,10));

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// Parse resume text with OpenAI
// export const parseResume = async (req, res) => {
//   try {
//     const { text } = req.body; // Extracted resume text (from PDF/DOCX parser)

//     const prompt = `
//       Extract structured information from this resume text:
//       Resume: """${text}"""
      
//       Return in JSON format with fields:
//       {
//         "name": "",
//         "email": "",
//         "phone": "",
//         "skills": [],
//         "education": [],
//         "experience": []
//       }
//     `;

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini", // Or gpt-4.1 if you want higher accuracy
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0,
//     });

//     const parsedData = response.choices[0].message.content;
//     res.json({ parsedData: JSON.parse(parsedData) });

//   } catch (error) {
//     console.error("Error parsing resume:", error);
//     res.status(500).json({ error: "Failed to parse resume" });
//   }
// };
//

// Gemini integration



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
