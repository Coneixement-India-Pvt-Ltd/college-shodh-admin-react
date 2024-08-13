import React from "react";
import { Link } from "react-router-dom";

// for card icons
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoNewspaperOutline } from "react-icons/io5";

const Card = () => {
  return (
    <div className="ml-64 mt-20 p-4">
      <h1>This is Card</h1>

      <div
        id="college-card"
        className="border-b border-gray-300 border rounded-lg p-2 pl-6 pr-6 mb-5 mr-32 ml-20 hover:shadow-2xl transition-shadow"
      >
        <h1 className="text-xl font-bold text-gray-900 text-left">
          Sinhgad College of Engineering
        </h1>

        <div className="flex flex-wrap">
          <div className="w-1/2">
            <p className="text-sm text-gray-600 mb-2 text-left flex items-center">
              <IoLocationOutline className="text-orange-500 size-5 mr-1" />
              <i> Pune, Maharashtra </i>
            </p>

            <p className="text-sm text-gray-600 mb-1 text-left flex items-center">
              <FaRegBuilding className="text-orange-500 size-5 mr-2" />{" "}
              <b> Dept: Engineering </b>
            </p>
            <p className="text-sm text-gray-600 mb-1 text-left flex items-center">
              <PiStudentFill className="text-orange-500 size-5 mr-2" /> Student
              Intake: 100
            </p>
            <p className="text-sm text-gray-600 mb-1 text-left flex items-center">
              <FaPeopleGroup className="text-orange-500 size-5 mr-2" /> Faculty
              Count: 10
            </p>

            <div className="text-sm text-gray-600 mb-1 text-left flex items-center ">
              <IoNewspaperOutline className="text-orange-500 mr-1" /> Admission
              Criteria:
              <p>Entrance exam</p>
            </div>
          </div>

          <div className="mt-7">
            <p className="text-sm text-blue-400 font-bold mb-1 text-left">
              NIRF Rank: 100th
            </p>
            <p className="text-sm text-blue-400 font-bold mb-1 text-left">
              NBA: Accrediated
            </p>
            <p className="text-sm text-blue-400 font-bold mb-1 text-left">
              NAAC: A
            </p>
          </div>

          <hr className="w-full mb-2" />

          <div>
            <p className="text-sm text-gray-600 mb-1 text-left flex items-center">
              <FaPhoneAlt className="mr-2 text-orange-400 size-4" />
              22222222
            </p>
            <p className="text-sm text-gray-600 mb-1 text-left flex items-center">
              <MdEmail className="mr-2 text-orange-400 size-5" />
              abc@gmail.com
            </p>
          </div>

          <div className="flex justify-end mt-2 ml-auto mb-1">
            <Link to="">
              <button
                className="text-white rounded-lg p-2"
                style={{ backgroundColor: "blue" }}
              >
                Know more
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
