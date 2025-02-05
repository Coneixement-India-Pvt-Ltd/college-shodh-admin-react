import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import configurePassport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import collegeRoutes from "./routes/collegeRoutes.js";
import { isAuthorized } from "./middleware.js";

// Configurations
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Session Configuration
const sessionStore = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,
  collectionName: "sessions",
});

app.use(
  expressSession({
    store: sessionStore,
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true },
  })
);

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

// Routes
app.use("/auth", authRoutes);
app.use("/dashboard", collegeRoutes);

app.get("/", (req, res) => res.send("Hello World"));

// Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
