// Import necessary modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import MongoStore from "connect-mongo"; // For storing sessions in MongoDB
import multer from "multer";
import XLSX from "xlsx";
import { MongoClient } from "mongodb";

import path from "path";

import User from "./models/User.js"; // Your User model
import College from "./models/courseSchema.js"; // Your College model
// import { isAuthorized } from "./middleware.js"; // Middleware to check if user is authenticated

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    credentials: true, // Allow credentials (cookies, headers) to be sent
  })
);

// Middleware to parse cookies
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), "public")));
const upload = multer({ dest: "uploads/" });

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Configure and use Express session
const sessionStore = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL, // MongoDB connection URL
  collectionName: "sessions", // Collection name for sessions
});

app.use(
  expressSession({
    store: sessionStore, // Use MongoDB to store sessions
    secret: "mySecretKey", // Secret key for signing the session ID cookie
    resave: false, // Avoid resaving session if unmodified
    saveUninitialized: false, // Don't save uninitialized sessions
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Session duration: 7 days
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    },
  })
);

// Initialize Passport.js and use it with session
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose
  .connect(process.env.ATLASDB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Configure Passport.js with the Local Strategy for authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Use "email" instead of "username" for the username field
      passwordField: "password", // Use "password" for the password field
    },
    async (email, password, done) => {
      try {
        // Find user by email
        const user = await User.findOne({ email });
        //console.log(user);
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        //console.log(user.password);

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        // Authentication successful
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use("/auth", authRoutes);
app.use("/dashboard", userRoutes);

app.get("/", function (req, res) {
  res.send("Hello World");
});

// Start the server
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
