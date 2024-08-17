import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const app = express();
const router = express.Router();

// import {authenticateToken} from "../middleware.js";

//Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (user) {
      return res.json({ message: "User already exists" });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });

    await newUser.save();
    return res.json({ message: "User created successfully" });
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "Invalid Password" });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
  return res.json({ status: true, message: "Login successful" });
});

// forget Password Route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "harleen.cipl@gmail.com",
        pass: "lkkt efpe ddge djxt",
      },
    });

    var mailOptions = {
      from: {
        name: "CollegeShodh",
        address: "harleen.cipl@gmail.com",
      },
      to: email,
      subject: "CollegeShodh Password Reset Link",
      text: `Valid for 5 minutes : http://localhost:5173/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "Error sending email" });
      } else {
        return res.json({
          status: true,
          message: "Password reset link sent to your email",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    return res.json({ status: true, message: "Password reset successful" });
  } catch (error) {
    return res.json({ message: "Invalid or expired token" });
  }
});

// const authenticateToken = (req, res, next) => {
//   console.log("Cookies: ", req.cookies); // Log the cookies to see what is received
//   const token = req.cookies?.token; // Optional chaining to avoid the error
//   if (!token) {
//     return res.json({ Error: "You are not Authenticated" });
//   } else {
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.json({ Error: "You are not Authenticated" });
//       }
//       req.user = user;
//       next();
//     });
//   }
// };

router.get("/verify",(req, res) => {
  console.log(res.json);
  return res.json({ status: true, message: "Authorized" });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true });
});

router.get("/dashboard",(req, res) => {
  res.json({ message: "Welcome to the dashboard" });
});

export { router as UserRouter };
