// dotenv.config();
// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import College from "./models/courseSchema.js"

// const app = express();

// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// // app.use("/auth", UserRouter);
// app.use(cookieParser());

// mongoose
//   .connect(process.env.ATLASDB_URL)
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });

//   const sessionOptions = {
//     store,
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//       httpOnly: true,
//     },
//   };

//   app.use(session(sessionOptions));

// app.get("/api/courses", async (req, res) => {
//   try {
//     const listings = await College.find();
//     // console.log(listings);
//     res.status(200).json(listings);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

// app.listen(process.env.PORT || 3001, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import expressSession from "express-session";
// import passport from "passport";
// import MongoStore from "connect-mongo";
// import LocalStrategy from "passport-local";
// import bcrypt from "bcryptjs";
// import User from "./models/User.js";
// import College from "./models/courseSchema.js";
// import { isAuthorized } from "./middleware.js";

// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   expressSession({
//     secret: "mySecretKey",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// mongoose
//   .connect(process.env.ATLASDB_URL)
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });

// // Configure session store
// const sessionStore = MongoStore.create({
//   mongoUrl: process.env.ATLASDB_URL,
//   collectionName: "sessions",
// });

// const sessionOptions = {
//   store: sessionStore,
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     httpOnly: true,
//   },
// };

// // app.use(session(sessionOptions));
// // app.use(passport.initialize());
// // app.use(passport.session());

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email", // Make sure this matches your login form field names
//       passwordField: "password",
//     },
//     async (email, password, done) => {
//       try {
//         const user = await User.findOne({ email });
//         if (!user) {
//           return done(null, false, { message: "Incorrect username." });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//           return done(null, false, { message: "Incorrect password." });
//         }
//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// app.post("/auth/signup", async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "Username or Email already taken" });
//     }

//     // Create a new user
//     const newUser = new User({ username, email, password });
//     await newUser.save();

//     res
//       .status(201)
//       .json({ status: true, message: "User registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ status: false, message: "Server error" });
//   }
// });

// app.post(
//   "/auth/login",
//   passport.authenticate("local", { failureRedirect: "/", successRedirect: "/dashboard" })
// );

// // app.post("/auth/login", async (req, res) => {
// //   console.log(req.body);
// //  });

// app.post("/auth/logout", (req, res) => {
//   req.logout();
//   res.redirect("/login");
// });

// app.get("/api/courses", async (req, res) => {
//   try {
//     const listings = await College.find();
//     res.status(200).json(listings);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.get("/dashboard", isAuthorized, (req, res) => {
//   res.send("Welcome to the dashboard");
// });

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.listen(process.env.PORT || 3001, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

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
        console.log("Original Password:", password);
        console.log("Hashed Password:", user.password);

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
app.get("/dashboard",isAuthorized,(req, res) => {
  res.json({ isAuthenticated: true });
  console.log("Welcome to the dashboard")
});

// API route to get courses (public route)
app.get("/api/courses", async (req, res) => {
  try {
    const listings = await College.find();
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Root route for testing
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
