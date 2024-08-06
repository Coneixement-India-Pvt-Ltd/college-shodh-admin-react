import express from "express";
import bcrypt from "bcryptjs";
const router = express.Router();
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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

// const verifyUser = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.json({ status: false, message: "Unauthorized" });
//     }
//     const decoded = await jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded) {
//       next();
//     } 
//   } catch (error) {
//     return res.json(error);
//     // return res.status(401).json({ status: false, message: "Unauthorized" });

//   }
// };

// router.get("/verify", verifyUser, (req, res) => {
//   return res.json({ status: true, message: "Authorized" });
  
// });

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      req.user = decoded; // Attach the decoded token payload to the request object
      next();
    }
  } catch (error) {
    // return res.json(error);
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }
  //neew
};

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "Authorized" });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true });
});

export { router as UserRouter };
S