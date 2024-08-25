dotenv.config();
import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { UserRouter } from "./routes/user.js";
import cookieParser from "cookie-parser";
import College from "./models/courseSchema.js"

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/auth", UserRouter);
app.use(cookieParser());

mongoose
  .connect(process.env.ATLASDB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// render data
app.get("/api/courses", async (req, res) => {
  try {
    const listings = await College.find();
    // console.log(listings);
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create route
app.post("/api/courses", async (req, res) => {
  const listing = new College({
    college_name: req.body.college_name,
    address: req.body.address,
    course: req.body.course,
    dept: req.body.dept,
    university: req.body.university,
    nirf: req.body.nirf,
    naac: req.body.naac,
    nba: req.body.nba,
    fees: req.body.fees,
    admission_criteria: req.body.admission_criteria,
    intake: req.body.intake,
    contact: req.body.contact,
    faculty: req.body.faculty,
    email: req.body.email,
    website: req.body.website,
  });
  console.log(listing); 
});



app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
