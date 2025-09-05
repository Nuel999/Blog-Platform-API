import dotenv from "dotenv";
dotenv.config();

// Core dependencies
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";

// Custom middleware
import { errorHandler } from "./src/middleware/errorHandler.js";
import rateLimiter from "./src/middleware/rateLimiter.js";

// Routes
import authRoutes from "./src/routes/authRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";

// Initialize express app
const app = express();

//Security Middleware
// Helmet helps secure Express apps by setting various HTTP headers
app.use(helmet());

// CORS (Cross-Origin Resource Sharing)
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*" })); // Allow requests from specified origins or all if none specified

// Body pa
// Parse incoming JSON requests (so we can access req.body)
app.use(express.json());

/* --------- LOGGER ----------------- */
// Morgan logs HTTP requests to the console (useful in dev mode)
app.use(morgan("dev"));

/* ----- RATE LIMITING ----------------- */
// Prevents brute-force attacks (e.g. max 100 requests per 15 minutes per IP)
app.use("/api", rateLimiter);

/* ----------- ROUTES ----------------- */

app.use("/api/auth", authRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/comments", commentRoutes);


// Catch and format all errors into clean JSON responses
app.use(errorHandler);


// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(process.env.PORT || 5000, () =>
      console.log(` Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
