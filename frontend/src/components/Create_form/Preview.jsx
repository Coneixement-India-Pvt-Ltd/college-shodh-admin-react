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
        <strong>College Name:</strong> {formData.collegeName}
        <br />
        <strong>University:</strong> {formData.university}
        <br />
        <strong>Program:</strong> {formData.program}
        <br />
        <strong>Courses:</strong> {formData.courses}
        <br />
        <strong>NAAC:</strong> {formData.naac}
        <br />
        <strong>NBA Approved:</strong> {formData.nbaApproved}
        <br />
        <strong>NIRF:</strong> {formData.nirf}
        <br />
        <strong>Address:</strong> {formData.address}
        <br />
        <strong>State:</strong> {formData.state}
        <br />
        <strong>FEES:</strong> {formData.courseFees}
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
