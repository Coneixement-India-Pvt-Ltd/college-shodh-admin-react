import React from "react";
// import { BsFiletypePdf } from "react-icons/bs";
import { AiOutlineFileExcel } from "react-icons/ai";


const Create = () => {
  return (
    <>
      <div className="sm:ml-40 ml-4 mt-32">
        <h1 className="mt-16 text-2xl sm:text-4xl font-bold text-center">
          Upload An Excel Sheet To Add Bulk Data
        </h1>
        <div
          className="sm:ml-44 ml-4 sm:mr-12 mr-4 rounded-md p-2 mt-7"
          style={{ backgroundColor: "#4A9CDF" }}
        >
          <div className="p-10 sm:p-16 border-2 border-white border-dotted text-center rounded-md">
            <div className="flex justify-center items-center mb-4">
              <AiOutlineFileExcel size={50} color="#fff" />
            </div>
            <input
              type="file"
              className="w-full sm:w-auto rounded-md"
              style={{ backgroundColor: "#fff" }}
            />
            <div className="p-4">
              <button
                className="text-white p-2 w-full sm:w-24 rounded-md"
                style={{ backgroundColor: "#C94104" }}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
