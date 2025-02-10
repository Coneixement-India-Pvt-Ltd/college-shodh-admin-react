import React, { useState, useRef, useEffect } from "react";
import Modal from "./Modal";

const Filter = ({ filters, updateFilter }) => {
  const [stateOpen, setStateOpen] = useState(false);
  const [naacOpen, setNaacOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourseForModal, setSelectedCourseForModal] = useState("");

  const stateRef = useRef(null);
  const naacRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (stateRef.current && !stateRef.current.contains(event.target)) {
        setStateOpen(false);
      }
      if (naacRef.current && !naacRef.current.contains(event.target)) {
        setNaacOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleKeywordChange = (e) => {
    updateFilter({ keyword: e.target.value });
  };

  const handleStateChange = (state) => {
    updateFilter({ state });
    setStateOpen(false);
  };

  const handleNaacChange = (naac) => {
    updateFilter({ naac });
    setNaacOpen(false);
  };

  const handleCourseChange = (course) => {
    let updatedCourse = course;

    if (["btech", "bsc"].includes(course.toLowerCase()))
      updatedCourse = "Engineering";
    else if (["bpharm", "b.pharm", "pharmacy"].includes(course.toLowerCase()))
      updatedCourse = "Pharmacy";
    else if (course.toLowerCase() === "bca") updatedCourse = "BCA";
    else if (course.toLowerCase() === "b.arch") updatedCourse = "Architecture";

    updateFilter({ course: updatedCourse, dept: "" });

    if (["engineering", "bca"].includes(updatedCourse.toLowerCase())) {
      setSelectedCourseForModal(updatedCourse);
      setShowModal(true);
    }
  };

  const resetFilters = () => {
    updateFilter({ keyword: "", state: "", naac: "", course: "", dept: "" });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 bg-white rounded-lg shadow-md space-y-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by college name"
          value={filters.keyword}
          onChange={handleKeywordChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
        {filters.keyword && (
          <button
            onClick={() => updateFilter({ keyword: "" })}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        )}
      </div>

      {/* Course Buttons */}
      <div className="flex flex-wrap gap-2">
        {["BTech", "Pharmacy", "BSC", "BCA", "B.Arch"].map((course) => (
          <button
            key={course}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-all"
            onClick={() => handleCourseChange(course)}
          >
            {course}
          </button>
        ))}
      </div>

      {/* State Dropdown */}
      <div className="relative" ref={stateRef}>
        <button
          className="w-full p-3 border border-gray-300 rounded-md bg-white text-left focus:ring focus:ring-blue-300"
          onClick={() => setStateOpen(!stateOpen)}
        >
          {filters.state || "Select State"}
        </button>
        {filters.state && (
          <button
            onClick={() => updateFilter({ state: "" })}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        )}
        {stateOpen && (
          <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 shadow-md z-10">
            {["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu"].map(
              (state) => (
                <li
                  key={state}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleStateChange(state)}
                >
                  {state}
                </li>
              )
            )}
          </ul>
        )}
      </div>

      {/* NAAC Dropdown */}
      <div className="relative" ref={naacRef}>
        <button
          className="w-full p-3 border border-gray-300 rounded-md bg-white text-left focus:ring focus:ring-blue-300"
          onClick={() => setNaacOpen(!naacOpen)}
        >
          {filters.naac || "Select NAAC Rating"}
        </button>
        {filters.naac && (
          <button
            onClick={() => updateFilter({ naac: "" })}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        )}
        {naacOpen && (
          <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 shadow-md z-10">
            {[
              "Naac A++",
              "Naac A+",
              "Naac A",
              "Naac B++",
              "Naac B+",
              "Naac B",
              "Naac C",
            ].map((rating) => (
              <li
                key={rating}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleNaacChange(rating)}
              >
                {rating}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full p-3 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-all"
      >
        Reset Filters
      </button>

      {/* Modal for department selection */}
      {showModal && (
        <Modal
          closeModal={(selectedDept) => {
            setShowModal(false);
            if (selectedDept) updateFilter({ dept: selectedDept });
          }}
          type={selectedCourseForModal}
        />
      )}
    </div>
  );
};

export default Filter;
