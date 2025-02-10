import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js"; // Updated import
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import collegeRoutes from "./routes/collegeRoutes.js";
import { isAuthorized } from "./middleware.js"; // Ensure this works with JWT now

// Configurations
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
// 
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  // allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Passport Middleware (JWT)
app.use(passport.initialize());

// Routes
app.use("/auth", authRoutes);
app.use("/dashboard", passport.authenticate("jwt", { session: false }), collegeRoutes);

app.get("/", (req, res) => res.send("Hello World"));

// Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
