import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegBuilding,  FaPhoneAlt } from "react-icons/fa";
// import { FaRegBuilding, FaPeopleGroup, FaPhoneAlt } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { IoNewspaperOutline } from "react-icons/io5";

const Card = ({ colleges, setColleges }) => { // Accept setColleges from parent
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/dashboard/college/${id}`);
      toast.success("Listing deleted successfully");

      // Remove deleted college from state
      setColleges((prevColleges) => prevColleges.filter(college => college._id !== id));
      
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Failed to delete listing");
    }
  };

  return (
    <div className="flex flex-col ml-64 mt-2 items-left mb-0">
      {colleges.map((college) => (
        <div
          key={college._id}
          className="border-b border-gray-300 rounded-lg p-4 mb-4 mr-32 ml-20 hover:shadow-xl transition-shadow"
        >
          <h1 className="text-xl font-bold text-gray-900">
            {college.college_name}
          </h1>
          <div className="flex flex-wrap">
            <div className="w-1/2">
              <p className="text-sm text-gray-600 flex items-center">
                <IoLocationOutline className="text-orange-500 mr-1" />
                <i>{college.address}</i>
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <FaRegBuilding className="text-orange-500 mr-2" />
                <b>Dept: {college.dept}</b>
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <PiStudentFill className="text-orange-500 mr-2" />
                Student Intake: {college.intake}
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                {/* <FaPeopleGroup className="text-orange-500 mr-2" /> */}
                Faculty Count: {college.faculty}
              </p>
              <div className="text-sm text-gray-600 flex items-center">
                <IoNewspaperOutline className="text-orange-500 mr-1" />
                Admission Criteria: <span>{college.admission_criteria}</span>
              </div>
            </div>

            <div className="mt-7">
              <p className="text-sm text-blue-400 font-bold">
                NIRF Rank: {college.nirf}
              </p>
              <p className="text-sm text-blue-400 font-bold">
                NBA: {college.nba}
              </p>
              <p className="text-sm text-blue-400 font-bold">
                NAAC: {college.naac}
              </p>
            </div>

            <hr className="w-full my-2" />

            <div>
              <p className="text-sm text-gray-600 flex items-center">
                <FaPhoneAlt className="mr-2 text-orange-400" />{" "}
                {college.contact}
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                {college.email}
              </p>
            </div>

            <div className="flex justify-end mt-2 ml-auto gap-2">
              <Link to={`/dashboard/edit/${college._id}`}>
                <button className="bg-green-500 text-white rounded-lg p-2 w-24">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(college._id)}
                className="bg-red-500 text-white rounded-lg p-2 w-24"
              >
                Delete
              </button>
              <a
                href={college.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-blue-500 text-white rounded-lg p-2">
                  Know more
                </button>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
