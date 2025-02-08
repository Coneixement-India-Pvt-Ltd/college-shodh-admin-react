import React, { useState, useEffect } from "react";

const Modal = ({ closeModal, type }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const bscCourses = [
    { name: "Physics", img: "/icons/BSC/Physics.jpg" },
    { name: "Chemistry", img: "/icons/BSC/Chemistry.jpg" },
    { name: "Biology", img: "/images/science.png" },
    { name: "Mathematics", img: "/icons/BSC/math.jpg" },
    { name: "Microbiology", img: "/icons/BSC/microbiology.jpg" },
    { name: "Nursing", img: "/icons/BSC/nursing.jpg" },
    { name: "Home Science", img: "/icons/BSC/Home Science.jpg" },
    { name: "Bio Technology", img: "/images/science.png" },
    { name: "Environmental Science", img: "/images/science.png" },
    { name: "Agriculture", img: "/images/science.png" },
    { name: "Economics", img: "./Phy.png" },
    { name: "Statistics", img: "./Phy.png" },
    { name: "Data Science", img: "./Phy.png" },
    { name: "Biological Science", img: "./Phy.png" },
    { name: "Electronics", img: "./Phy.png" },
    { name: "Applied Geology", img: "./Phy.png" },
    { name: "Physiotherapy", img: "./Phy.png" },
    { name: "Computer Science", img: "./Phy.png" },
    { name: "IT", img: "./Phy.png" },
    { name: "Forensic Science", img: "./Phy.png" },
    { name: "Optometry", img: "./Phy.png" },
    { name: "Botany", img: "./Phy.png" },
    { name: "Zoology", img: "./Phy.png" },
    { name: "Bio Chemistry", img: "./Phy.png" },
    { name: "Psychology", img: "./Phy.png" },
    { name: "Fashion Design", img: "./Phy.png" },
    { name: "Food Technology", img: "./Phy.png" },
    { name: "Horticulture", img: "./Phy.png" },
    { name: "Animation", img: "./Phy.png" },
    { name: "Bioinformatics", img: "./Phy.png" },
    { name: "Geography", img: "./Phy.png" },
    { name: "Hospitality", img: "./Phy.png" },
    { name: "Exploration  Geophysics", img: "./Phy.png" },
    { name: "Medical Imaging Technology", img: "./Phy.png" },
    { name: "Mathematics Scientific Computing", img: "./Phy.png" },
    { name: "Data Science and Application", img: "./Phy.png" },
  ];

  const beCourses = [
    { name: "Computer Science", img: "/images/engineering.png" },
    { name: "Electrical Engineering", img: "/images/engineering.png" },
    { name: "Mechanical Engineering", img: "/images/engineering.png" },
    { name: "Civil Engineering", img: "/images/engineering.png" },
    { name: "Chemical Engineering", img: "/images/engineering.png" },
    { name: "Aerospace Engineering", img: "/images/engineering.png" },
    { name: "Biomedical Engineering", img: "/images/engineering.png" },
    { name: "Environmental Engineering", img: "/images/engineering.png" },
    { name: "Electronic Engineering", img: "./Civil.png" },
    { name: "Agricultural Engineering", img: "./Civil.png" },
    { name: "Automobile Engineering", img: "./Civil.png" },
    { name: "Robotics Engineering", img: "./Civil.png" },
    { name: "Marine Engineering", img: "./Civil.png" },
    { name: "Petroleum Engineering", img: "./Civil.png" },
    { name: "Mining Engineering", img: "./Civil.png" },
    { name: "Mineral Engineering", img: "./Civil.png" },
    { name: "Dyestuff Technology", img: "./Civil.png" },
    { name: "Power Engineering", img: "./Civil.png" },
    { name: "Mechatronics Engineering", img: "./Civil.png" },
    { name: "Structural Engineering", img: "./Civil.png" },
    { name: "Food Technology", img: "./Civil.png" },
    { name: "Cyber Security", img: "./Civil.png" },
    { name: "Industrial Engineering", img: "./Civil.png" },
    { name: "Irrigation Engineering", img: "./Civil.png" },
    { name: "Biotechnology Engineering", img: "./Civil.png" },
    { name: "Aeronautical Engineering", img: "./Civil.png" },
    { name: "Construction Engineering", img: "./Civil.png" },
    { name: "Mathematics & Computing", img: "./Civil.png" },
    { name: "Manufacturing Engineering", img: "./Civil.png" },
    { name: "Computer Science & Engineering", img: "./Civil.png" },
    { name: "RF & Microwave Engineering", img: "./Civil.png" },
    { name: "Artificial Intelligence Engineering", img: "./Civil.png" },
    { name: "Information Technology Engineering", img: "./Civil.png" },
    { name: "Electronics & Telecommunication", img: "./Civil.png" },
    { name: "Pharmaceutical Chemistry and Technology", img: "./Civil.png" },
    { name: "Food Engineering and Technology", img: "./Civil.png" },
    { name: "Surface Coating Technology", img: "./Civil.png" },
    { name: "Polymer Engineering and Technology", img: "./Civil.png" },
    {
      name: "Oils, Oleochemicals and Surfactants Technology",
      img: "./Civil.png",
    },
    { name: "Mining Machinery Engineering", img: "./Civil.png" },
    { name: "Instrumentation and Control Engineering", img: "./Civil.png" },
    { name: "Metallurgical & Materials Engg.", img: "./Civil.png" },
    { name: "Instrumentation and Control Engineering", img: "./Civil.png" },
  ];

  // Decide which options to show based on course type
  const courses = type.toLowerCase() === "bsc" ? bscCourses : beCourses;

  const [currentPage, setCurrentPage] = useState(0);
  const coursesPerPage = 6;

  const handleNext = () => {
    if ((currentPage + 1) * coursesPerPage < courses.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = courses.slice(startIndex, endIndex);

  return (
    <>
      <div
        className="modal-wrapper fixed inset-0 bg-black opacity-50"
        onClick={() => closeModal(null)}
      ></div>
      <div className="modal-container relative z-10 mt-28 p-4 bg-white rounded shadow-lg">
        <h1 className="font-mono">
          {type.toLowerCase() === "bsc"
            ? "B. Sc Courses"
            : "BE/B. Tech Courses"}
        </h1>
        <div className="course-grid grid grid-cols-3 gap-4 mt-4">
          {currentCourses.map((course, index) => (
            <button
              className="model-btn flex flex-col items-center"
              onClick={() => closeModal(course.name)}
              key={index}
            >
              <img src={course.img} alt={course.name} className="w-16 h-16" />
              <span className="font-normal">{course.name}</span>
            </button>
          ))}
        </div>
        <div className="pagination flex justify-between mt-4">
          <button onClick={handlePrev} disabled={currentPage === 0}>
            {"<"} Prev
          </button>
          <button onClick={handleNext} disabled={endIndex >= courses.length}>
            Next {">"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
