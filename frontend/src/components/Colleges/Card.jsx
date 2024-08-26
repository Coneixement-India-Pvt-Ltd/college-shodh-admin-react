import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

// for card icons
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoNewspaperOutline } from "react-icons/io5";

const Card = () => {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [filterNaac, setFilterNaac] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Added loading state
  const collegesPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/courses")
      .then((response) => {
        setColleges(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Ensure loading is false even if there's an error
      });
  }, []);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    const sortedColleges = [...colleges].sort((a, b) => {
      if (event.target.value === "lowToHigh") {
        return a.nirf - b.nirf;
      } else if (event.target.value === "highToLow") {
        return b.nirf - a.nirf;
      }
      return 0;
    });
    setColleges(sortedColleges);
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
  };

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
  };

  const filteredColleges = colleges.filter((college) => {
    const isStateMatch = selectedState
      ? college.address.toLowerCase().includes(selectedState.toLowerCase())
      : true;
    const isCourseMatch = selectedCourse
      ? college.course &&
        college.course.toLowerCase().includes(selectedCourse.toLowerCase())
      : true;
    return (
      (search === "" ||
        college.name.toLowerCase().includes(search.toLowerCase())) &&
      (!filterNaac || college.naac === filterNaac) &&
      isStateMatch &&
      isCourseMatch
    );
  });

  const totalPages = Math.ceil(filteredColleges.length / collegesPerPage);
  const displayedColleges = filteredColleges.slice(
    (currentPage - 1) * collegesPerPage,
    currentPage * collegesPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderWidth: "8px", // Adjust the border width to make the ring thicker
    marginTop: "-300px",
  };

  return (
    <div className="flex flex-col ml-64 mt-2 items-left mb-0">
      {loading ? (
        <div className="flex justify-center items-center h-full w-full mt-72">
          <HashLoader
            size={100}
            color={"orange"}
            loading={loading}
            cssOverride={override}
          />
        </div>
      ) : (
        displayedColleges.map((college) => (
          <div
            key={college._id}
            className="border-b border-gray-300 border rounded-lg p-2 pl-6 pr-6 mb-5 mr-32 ml-20 hover:shadow-2xl transition-shadow "
          >
            <h1 className="text-xl font-bold text-gray-900 text-left">
              {college.college_name}
            </h1>

            <div className="flex flex-wrap">
              <div className="w-1/2">
                <p
                  className="text-sm text-gray-600 mb-2 text-left flex items-center
                    "
                >
                  <IoLocationOutline className="text-orange-500 size-5 mr-1" />
                  <i> {college.address} </i>
                  {/* &nbsp;
                      {college.university} */}
                </p>

                <p className="text-sm text-gray-600 mb-1 text-left flex items-center">
                  <FaRegBuilding className="text-orange-500 size-5 mr-2" />{" "}
                  <b> Dept: {college.dept} </b>
                </p>
                <p className="text-sm text-gray-600 mb-1 text-left flex items-center">
                  <PiStudentFill className="text-orange-500 size-5 mr-2" />{" "}
                  Student Intake: {college.intake}
                </p>
                <p className="text-sm text-gray-600 mb-1 text-left flex items-center">
                  <FaPeopleGroup className="text-orange-500 size-5 mr-2" />{" "}
                  Faculty Count: {college.faculty}
                </p>

                <div className="text-sm text-gray-600 mb-1 text-left flex items-center ">
                  <IoNewspaperOutline className="text-orange-500 mr-1" />{" "}
                  Admission Criteria:
                  <p>{college.admission_criteria}</p>
                </div>
              </div>

              <div className="mt-7">
                <p className="text-sm text-blue-400 font-bold mb-1 text-left">
                  NIRF Rank: {college.nirf}
                </p>
                <p className="text-sm text-blue-400 font-bold mb-1 text-left">
                  NBA: {college.nba}
                </p>
                <p className="text-sm text-blue-400 font-bold mb-1 text-left">
                  NAAC: {college.naac}
                </p>
              </div>

              <hr className="w-full mb-2" />

              <div>
                <p className="text-sm text-gray-600 mb-1 text-left flex items-center">
                  <FaPhoneAlt className="mr-2 text-orange-400 size-4" />{" "}
                  {college.contact}
                </p>
                <p className="text-sm text-gray-600 mb-1 text-left flex items-center">
                  <MdEmail className="mr-2 text-orange-400 size-5" />{" "}
                  {college.email}
                </p>
              </div>

              <div className="flex justify-end mt-2 ml-auto mb-1 gap-1">
                <Link to="/dashboard/edit/:id">
                  <Button
                    className="text-white rounded-lg p-2 w-24"
                    style={{ backgroundColor: "#FF5A1F" }}
                  >
                    Edit
                  </Button>
                </Link>
                <Link>
                  <Button
                    variant="contained"
                    className="text-white rounded-lg p-2 w-24"
                    style={{ backgroundColor: "#4A9CDF" }}
                  >
                    Delete
                  </Button>
                </Link>
                {/* <Link to={college.website}> */}
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="text-white rounded-lg p-2 w-full"
                    style={{ backgroundColor: "#95C730" }}
                  >
                    Know more
                  </Button>
                </a>
                {/* </Link> */}
              </div>
            </div>
          </div>
        ))
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Card;
