// import React, { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { AiOutlineFileExcel } from "react-icons/ai";
// import axios from "axios";

// const Create = () => {
//   // to store and display the name of file uploaded
//   const [fileNames, setFileNames] = useState([]);
//   const [file, setFile] = useState(null);

//   const onDrop = useCallback((acceptedFiles) => {
//     // Extract file names from the dropped files
//     const names = acceptedFiles.map((file) => file.name);
//     setFileNames(names);
//   }, []);

//   // Optional: Handle rejected files
//   const onDropRejected = useCallback((rejectedFiles) => {
//     if (rejectedFiles.length > 0) {
//       console.log("Files rejected:", rejectedFiles);
//     }
//   }, []);

//   // Set up dropzone props
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     onDropRejected,
//     accept: ".xlsx, .xls, .csv",
//     multiple: true,
//   });

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleFileUpload = async (event) => {
//     // console.log("Upload button clicked");
//     //write a axios to send request to the route to upload the file
//     const file = event.target.files[0]; // Get the file from the input element

//     if (!file) {
//       alert("Please select a file first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/auth/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("File uploaded successfully:", response.data);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   return (
//     <div className="sm:ml-40 ml-4 mt-20">
//       <h1 className="text-2xl sm:text-4xl font-bold text-center">
//         Upload An Excel Sheet To Add Bulk Data
//       </h1>
//       <div
//         className="sm:ml-44 ml-4 sm:mr-20 mr-4 rounded-md p-2 mt-7"
//         style={{ backgroundColor: "#4A9CDF" }}
//         {...getRootProps()} // Attach dropzone props here
//       >
//         <input {...getInputProps()} /> {/* Hidden input for file selection */}
//         <div
//           className="p-10 sm:p-12 border-2 border-white border-dotted text-center rounded-md cursor-pointer"
//           onChange={handleFileChange}
//         >
//           <div className="flex justify-center items-center mb-4">
//             <AiOutlineFileExcel size={50} color="#fff" />
//           </div>
//           {/* <input
//             type="file"
//             className="w-full sm:w-auto rounded-md"
//             style={{ backgroundColor: "#fff" }}
//           /> */}
//           <button
//             className="text-white p-2 rounded-md h-16 w-48 font-bold"
//             style={{ backgroundColor: "#222" }}
//             onClick={handleFileChange}
//           >
//             Select file
//           </button>
//           <div className="mt-4">
//             {isDragActive ? (
//               <p>Drop the files here ...</p>
//             ) : (
//               <p>Drag 'n' drop files here, or click to select files</p>
//             )}
//           </div>

//           {/* Display the names of the dropped files  */}
//           {fileNames.length > 0 && (
//             <div className="mt-2 text-center">
//               <h2 className="text-xl font-semibold">Dropped Files:</h2>
//               <ul>
//                 {fileNames.map((name, index) => (
//                   <li key={index} className="text-sm text-gray-700">
//                     {name}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="p-4 flex justify-center">
//         <button
//           className="text-white p-2 rounded-md ml-24 h-16 w-48 bg-orange-500 font-bold hover:bg-orange-600"
//           onClick={handleFileUpload}
//         >
//           Upload
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Create;


import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineFileExcel } from "react-icons/ai";
import axios from "axios";

const Create = () => {
  // to store and display the name of files uploaded
  const [fileNames, setFileNames] = useState([]);
  const [files, setFiles] = useState([]); // Store the selected files

  const onDrop = useCallback((acceptedFiles) => {
    // Extract file names from the dropped files and store the files
    const names = acceptedFiles.map((file) => file.name);
    setFileNames(names);
    setFiles(acceptedFiles); // Store the files for upload
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
    accept: ".xlsx, .xls, .csv",
    multiple: true,
  });

  // Removed handleFileChange function since it's unnecessary with useDropzone

  const handleFileUpload = async () => {
    // Ensure that there are files to upload
    if (files.length === 0) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file); // Append each file to the FormData
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/dashboard/create-bulk",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File(s) uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file(s):", error);
    }
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
        <div
          className="p-10 sm:p-12 border-2 border-white border-dotted text-center rounded-md cursor-pointer"
        >
          <div className="flex justify-center items-center mb-4">
            <AiOutlineFileExcel size={50} color="#fff" />
          </div>
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
          className="text-white p-2 rounded-md ml-24 h-16 w-48 bg-orange-500 font-bold hover:bg-orange-600"
          onClick={handleFileUpload} // Trigger upload on click
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Create;
