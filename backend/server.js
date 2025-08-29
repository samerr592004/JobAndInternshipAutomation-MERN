import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import testRoutes from "./routes/test.route.js";
import connectDB from './config/DBConnection.js';
import authRoutes from "./routes/auth.route.js";



// Load environment variables
dotenv.config();

// Create app
const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:8083',
    'http://localhost:8080',
    'http://localhost:8081',
    'http://localhost:8082',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/test", testRoutes);
app.use("/api/auth",authRoutes)

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

//Database Connection
connectDB();
// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

