import React from "react";

const CreateBulk = () => {
  return (
    <div className="ml-80 mt-20 mb-8">
      <h1 className="mb-2">Upload an excel sheet</h1>
      <input type="file" />
      <button
        className="text-white p-2 rounded-md mb-4"
        style={{ backgroundColor: "#1D4ED8" }}
      >
        Upload
      </button>
      <hr />
    </div>
  );
};

export default CreateBulk;
