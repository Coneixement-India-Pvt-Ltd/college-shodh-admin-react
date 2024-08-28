import React from "react";
import Typography from "@mui/material/Typography";

const Preview = ({ formData }) => {
  return (
    <div sx={{ mt: 2, mb: 1 }}>
      <div className="text-center p-2">
        <h1 className="text-3xl">Preview:</h1>
        <br />
      </div>

      <div className="border-2 border-gray-400 p-8 bg-slate-200 rounded">
        <strong>College Name:</strong> {formData.college_name}
        <br />
        <strong>Address:</strong> {formData.address}
        <br />
        <strong>Program:</strong> {formData.course}
        <br />
        <strong>Courses:</strong> {formData.dept}
        <br />
        <strong>University:</strong> {formData.university}
        <br />
        <strong>NAAC:</strong> {formData.naac}
        <br />
        <strong>NBA Approved:</strong> {formData.nba}
        <br />
        <strong>NIRF:</strong> {formData.nirf}
        <br />
        <strong>Admission Criteria:</strong> {formData.admission_criteria}
        <br />
        <strong>FEES:</strong> {formData.fees}
        <br />
        <strong>Intake:</strong> {formData.intake}
        <br />
        <strong>Faculty:</strong> {formData.faculty}
        <br />
        <strong>Website:</strong> {formData.website}
        <br />
        <strong>Contact:</strong> {formData.contact}
        <br />
        <strong>Email:</strong> {formData.email}
        <br />
      </div>
    </div>
  );
};

export default Preview;
