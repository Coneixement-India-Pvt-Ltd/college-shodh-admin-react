import mongoose from "mongoose";
const Schema = mongoose.Schema;

const collegeSchema = new Schema({
  college_name: String,
  address: String,
  course: String,
  dept: String,
  university: String,
  nirf: {
    type: Number,
    default: 0,
  },
  nirf_category: {
    type: String,
    default: "",
    enum: ["Engineering", "Autonomous", "Medical", "Management", "Pharmacy"],
  },
  naac: {
    type: String,
    default: null,
  },
  nba: String,
  fees: String,
  admission_criteria: String,
  intake: {
    type: Number,
    default: null,
  },
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