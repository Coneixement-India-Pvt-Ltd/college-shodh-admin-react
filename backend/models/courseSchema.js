// const mongoose = require("mongoose");
import mongoose from "mongoose";
import express from "express";
const Schema = mongoose.Schema;

const collegeSchema = Schema({
  college_name: String,
  address: String,
  course: String,
  dept: String,
  university: String,
  nirf: {
    type: String,
    default: null,
  },
  naac: {
    type: String,
    default: null,
  },
  nba: String,
  fees: String,
  admission_criteria: String,
  intake: Number,
  contact: String,
  faculty: {
    type: String,
    default: null,
  },
  email: [String],
  website: String,
});

const College = mongoose.model("College", collegeSchema);

export default College;
