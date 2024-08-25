import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineFileExcel } from "react-icons/ai";

const Create = () => {
  // to store and display the name of file uploaded
  const [fileNames, setFileNames] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    // Extract file names from the dropped files
    const names = acceptedFiles.map((file) => file.name);
    setFileNames(names);
  }, []);

  // Optional: Handle rejected files
  const onDropRejected = useCallback((rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      console.log("Files rejected:", rejectedFiles);
    }
  }, []);

  // Set up dropzone props
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    multiple: true,
  });

  const uploadBtn = () => {
    console.log("Upload button clicked");
  };

  return (
    <div className="sm:ml-40 ml-4 mt-20">
      <h1 className="text-2xl sm:text-4xl font-bold text-center">
        Upload An Excel Sheet To Add Bulk Data
      </h1>
      <div
        className="sm:ml-44 ml-4 sm:mr-20 mr-4 rounded-md p-2 mt-7"
        style={{ backgroundColor: "#4A9CDF" }}
        {...getRootProps()} // Attach dropzone props here
      >
        <input {...getInputProps()} /> {/* Hidden input for file selection */}
        <div className="p-10 sm:p-12 border-2 border-white border-dotted text-center rounded-md cursor-pointer">
          <div className="flex justify-center items-center mb-4">
            <AiOutlineFileExcel size={50} color="#fff" />
          </div>
          {/* <input
            type="file"
            className="w-full sm:w-auto rounded-md"
            style={{ backgroundColor: "#fff" }}
          /> */}
          <button
            className="text-white p-2 rounded-md h-16 w-48 font-bold"
            style={{ backgroundColor: "#222" }}
            onClick={uploadBtn}
          >
            Select file
          </button>
          <div className="mt-4">
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop files here, or click to select files</p>
            )}
          </div>

          {/* Display the names of the dropped files  */}
          {fileNames.length > 0 && (
            <div className="mt-2 text-center">
              <h2 className="text-xl font-semibold">Dropped Files:</h2>
              <ul>
                {fileNames.map((name, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 flex justify-center">
        <button
          className="text-white p-2 ml-24 rounded-md h-16 w-52 bg-orange-500 font-bold hover:bg-orange-600"
          onClick={uploadBtn}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Create;
