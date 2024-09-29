import bcrypt from "bcryptjs";
import passport from "passport";
import User from "../models/User.js";

// user signup
export const signup = async (req, res) => {
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
};

// user login
export const login = (req, res, next) => {
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
};

// user logout
export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ status: true, message: "Logged out successfully" });
  });
};
