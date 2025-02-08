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

  // Handler for text search
  const handleKeywordChange = (e) => {
    updateFilter({ keyword: e.target.value });
  };

  // Handler for state selection
  const handleStateChange = (state) => {
    updateFilter({ state });
    setStateOpen(false);
  };

  // Handler for NAAC selection
  const handleNaacChange = (naac) => {
    updateFilter({ naac });
    setNaacOpen(false);
  };

  // Handler for course selection.
  // For BTech or BSc, we update with "Engineering"
  // For BCA, we update with "BCA"
  // Other courses remain unchanged.
  const handleCourseChange = (course) => {
    let updatedCourse = course;

    // Map BTech and BSc to "Engineering"
    if (course.toLowerCase() === "btech" || course.toLowerCase() === "bsc") {
      updatedCourse = "Engineering";

    }
    else    if (
      course.toLowerCase() === "bpharm" ||
      course.toLowerCase() === "b.pharm" ||
      course.toLowerCase() === "pharmacy"
    ) {
      updatedCourse = "Pharmacy";
    } else if (course.toLowerCase() === "bca") {
      // For BCA, we explicitly set "BCA" (this is optional if course is already "BCA")
      updatedCourse = "BCA";
    }

    // Reset department on course change
    updateFilter({ course: updatedCourse, dept: "" });

    // Open the modal if the course requires department selection.
    // In this example, we assume only "Engineering" and "BCA" require additional dept selection.
    if (["engineering", "bca"].includes(updatedCourse.toLowerCase())) {
      setSelectedCourseForModal(updatedCourse);
      setShowModal(true);
    }
  };

  return (
    <div className="ml-96 mt-20 p-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by college name"
        value={filters.keyword}
        onChange={handleKeywordChange}
        className="border p-2 mb-4"
      />

      {/* Course Buttons */}
      <div className="mb-4">
        {["BTech", "Pharmacy", "BSC", "BCA"].map((course, index) => (
          <button
            key={index}
            className="h-12 w-32 bg-[#569df4] border rounded-md hover:shadow-lg mr-6 text-white"
            onClick={() => handleCourseChange(course)}
          >
            {course}
          </button>
        ))}
      </div>

      {/* State Dropdown */}
      <div className="relative mb-4" ref={stateRef}>
        <button
          className="rounded border bg-white text-gray-700 px-4 py-2 h-12 w-52 hover:bg-gray-100"
          onClick={() => setStateOpen(!stateOpen)}
        >
          {filters.state || "Select State"}
        </button>
        {stateOpen && (
          <div className="absolute bg-white border rounded-md shadow-lg mt-2 w-full">
            <ul className="max-h-80 overflow-y-auto">
              {["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu"].map(
                (state, index) => (
                  <li key={index} className="px-2">
                    <button onClick={() => handleStateChange(state)}>
                      {state}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>

      {/* NAAC Dropdown */}
      <div className="relative mb-4" ref={naacRef}>
        <button
          className="rounded border bg-white text-gray-700 px-4 py-2 h-12 w-52 hover:bg-gray-100"
          onClick={() => setNaacOpen(!naacOpen)}
        >
          {filters.naac || "Select NAAC Rating"}
        </button>
        {naacOpen && (
          <div className="absolute bg-white border rounded-md shadow-lg mt-2 w-full">
            <ul className="max-h-80 overflow-y-auto">
              {[
                "Naac A++",
                "Naac A+",
                "Naac A",
                "Naac B++",
                "Naac B+",
                "Naac B",
                "Naac C",
              ].map((rating, index) => (
                <li key={index} className="px-2">
                  <button onClick={() => handleNaacChange(rating)}>
                    {rating}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Modal for department selection (for courses that require dept selection) */}
      {showModal && (
        <Modal
          closeModal={(selectedDept) => {
            setShowModal(false);
            if (selectedDept) {
              updateFilter({ dept: selectedDept });
            }
          }}
          type={selectedCourseForModal}
        />
      )}
    </div>
  );
};

export default Filter;
