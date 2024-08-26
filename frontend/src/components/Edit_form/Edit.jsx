import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  console.log(id);
  
  const [formData, setFormData] = useState({
    collegeName: "",
    university: "",
    program: "",
    naac: "",
    nirf: "",
    state: "",
    address: "",
    courseFees: "",
    Intake: "",
    faculty: "",
    website: "",
    contact: "",
    email: "",
    nbaApproved: "",
    courses: "",
  });

  return (
    <div className="mt-16 ml-96 mr-36 p-4">
      <h1 className="text-3xl mb-4">Edit College Information</h1>
      <form className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="text-lg font-semibold">
              {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key] || ""}  
              className="p-2 border rounded"
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Edit;



