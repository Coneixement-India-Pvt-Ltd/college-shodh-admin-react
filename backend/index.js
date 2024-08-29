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

import User from "./models/User.js"; // Your User model
import College from "./models/courseSchema.js"; // Your College model
import { isAuthorized } from "./middleware.js"; // Middleware to check if user is authenticated

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

        // Use the comparePassword method from the schema
        //  const isMatch = await user.comparePassword(user.password);
        //  console.log(isMatch);
        //  if (!isMatch) {
        //    return done(null, false, { message: "Incorrect ashajs password." });
        //  }

        // Compare password with hashed password in the database
        // console.log("Original Password:", password);
        // console.log("Hashed Password:", user.password);

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

// User registration route
app.post("/auth/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already taken" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res
      .status(201)
      .json({ status: true, message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
});

// User login route using Passport.js authentication
app.post("/auth/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: info.message || "Login failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res
        .status(200)
        .json({ status: true, message: "Logged in successfully" });
    });
  })(req, res, next);
});

// app.post(
//   "/auth/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     successRedirect: "/dashboard",
//   })
// );

// User logout route
// app.post("/auth/logout",(req, res) => {
//   req.logout();
//   res.status(200).json({ status: true, message: "Logged out successfully" });
// });

app.post("/auth/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ status: true, message: "Logged out successfully" });
  });
});

// Example of a protected route
app.get("/dashboard", isAuthorized, (req, res) => {
  res.json({ isAuthenticated: true });
  //console.log("Welcome to the dashboard")
});

// API route to get courses (public route)
// app.get("/api/courses", async (req, res) => {
//   try {
//     const listings = await College.find();
//     res.status(200).json(listings);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// colleges route
app.get("/dashboard/college",isAuthorized, async (req, res) => {
  try {
    const listings = await College.find();
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create route
app.post("/dashboard/create", isAuthorized, async (req, res) => {
  try {
    const newListing = new College(req.body);
    await newListing.save();
    console.log("Listing created successfully:", newListing);
    res.status(201).json({ message: "Listing created successfully" });
  } catch (error) {
    console.error("Error creating listing:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the listing" });
  }
});


//  edit route
app.get('/dashboard/edit/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await College.findById(id);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update route
app.put("/dashboard/edit/:id", isAuthorized, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedListing = await College.findByIdAndUpdate(id, req.body
    );
    if (!updatedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    // res.redirect('/dashboard/college');
    res.status(200).json({ message: 'Listing updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




// delete route
app.delete("/dashboard/college/:id", isAuthorized, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the listing ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid college listing ID" });
    }

    const deletedCollege = await College.findByIdAndDelete(id);

    if (!deletedCollege) {
      return res.status(404).json({ error: "College listing not found" });
    }

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error("Error deleting college listing:", err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the college listing" });
  }

});





app.get("/", function (req, res) {
  res.send("Hello World");
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
