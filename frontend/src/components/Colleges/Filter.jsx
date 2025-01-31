
import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";

const Options = [
  { text: "B. Arch", course: "Architecture" },
  { text: "B. Pharm", course: "Pharmacy" },
  { text: "BCA", course: "BCA" },
  { text: "BE/B. Tech", course: "Engineering" },
  { text: "B. Sc", course: "Science" },
];

function Filter() {
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [naacOpen, setNaacOpen] = useState(false);
  const [accreditationOpen, setAccreditationOpen] = useState(false);

  // Refs for the dropdown containers
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const naacRef = useRef(null);
  const accreditationRef = useRef(null);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState("BSc"); // Default to BSc

  const closeModal = () => setShowModal(false);
  const openModal = (type) => {
    setShowModal(true);
    setSelectedType(type);
  };
  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (stateRef.current && !stateRef.current.contains(event.target)) {
        setStateOpen(false);
      }
      if (cityRef.current && !cityRef.current.contains(event.target)) {
        setCityOpen(false);
      }
      if (naacRef.current && !naacRef.current.contains(event.target)) {
        setNaacOpen(false);
      }
      if (accreditationRef.current && !accreditationRef.current.contains(event.target)) {
        setAccreditationOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="ml-96 mt-20 p-4">
        {Options.map((option, index) => (
          <button
            className="h-12 w-32 bg-[#569df4] border border-black-100 rounded-md hover:drop-shadow-lg mr-6"
            key={index}
            onClick={() => {
              if (option.text === "B. Sc" || option.text === "BE/B. Tech") {
                openModal(option.text);
              } else {
                handleCourseChange(option.course);
              }
            }}
          >
            <span className="hover:underline text-white font-medium">
              {option.text}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap ml-80 justify-center sm:justify-start p-4 space-x-0 sm:space-x-2 gap-y-2 sm:gap-y-0 relative z-10 ">
        {/* State Dropdown */}
        <div className="relative" ref={stateRef}>
          <button
            className="rounded-none border border-gray-400 bg-white text-gray-700 px-4 py-2 text-left h-12 w-52 hover:bg-gray-100"
            onClick={() => setStateOpen(!stateOpen)}
          >
            Select State
          </button>
          {stateOpen && (
            <div className="absolute bg-white border rounded-md shadow-lg mt-2 w-full">
              <ul className="max-h-80 overflow-y-auto">
                {[
                  "Andhra Pradesh",
                  "Arunachal Pradesh",
                  "Assam",
                  "Bihar",
                  "Chhattisgarh",
                  "Goa",
                  "Gujarat",
                  "Haryana",
                  "Himachal Pradesh",
                  "Jharkhand",
                  "Karnataka",
                  "Kerala",
                  "Madhya Pradesh",
                  "Maharashtra",
                  "Manipur",
                  "Meghalaya",
                  "Mizoram",
                  "Nagaland",
                  "Odisha",
                  "Punjab",
                  "Rajasthan",
                  "Sikkim",
                  "Tamil Nadu",
                  "Telangana",
                  "Tripura",
                  "Uttar Pradesh",
                  "Uttarakhand",
                  "West Bengal",
                ].map((state, index) => (
                  <li key={index} className="px-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" value={state} />
                      {state}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* City Dropdown */}
        <div className="relative" ref={cityRef}>
          <button
            className="rounded-none border border-gray-400 bg-white text-gray-700 px-4 py-2 text-left h-12 w-52 hover:bg-gray-100"
            onClick={() => setCityOpen(!cityOpen)}
          >
            Select City
          </button>
          {cityOpen && (
            <div className="absolute bg-white border rounded-md shadow-lg mt-2 w-full">
              <ul className="max-h-80 overflow-y-auto">
                {[
                  "Bangalore",
                  "Delhi",
                  "Mumbai",
                  "Pune",
                  "Hyderabad",
                  "Chennai",
                  "Kolkata",
                  "Ahmedabad",
                  "Jaipur",
                  "Lucknow",
                  "Kanpur",
                  "Indore",
                  "Coimbatore",
                  "Chandigarh",
                  "Thiruvananthapuram",
                  "Nagpur",
                  "Patna",
                  "Bhubaneswar",
                  "Visakhapatnam",
                  "Mysore",
                ].map((city, index) => (
                  <li key={index} className="px-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" value={city} />
                      {city}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* NAAC Rating Dropdown */}
        <div className="relative" ref={naacRef}>
          <button
            className="rounded-none border border-gray-400 bg-white text-gray-700 px-4 py-2 text-left h-12 w-52 hover:bg-gray-100"
            onClick={() => setNaacOpen(!naacOpen)}
          >
            Select NAAC Rating
          </button>
          {naacOpen && (
            <div className="absolute bg-white border rounded-md shadow-lg mt-2 w-full">
              <ul className="max-h-80 overflow-y-auto">
                {["Naac A++", "Naac A+", "Naac A", "Naac B++", "Naac B+", "Naac B", "Naac C"].map(
                  (rating, index) => (
                    <li key={index} className="px-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" value={rating} />
                        {rating}
                      </label>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Accreditation Dropdown */}
        <div className="relative" ref={accreditationRef}>
          <button
            className="rounded-none border border-gray-400 bg-white text-gray-700 px-4 py-2 text-left h-12 w-52 hover:bg-gray-100"
            onClick={() => setAccreditationOpen(!accreditationOpen)}
          >
            Select Accreditation
          </button>
          {accreditationOpen && (
            <div className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-2 w-full">
              <ul className="max-h-80 overflow-y-auto">
                {["Accredited", "Non-Accredited"].map(
                  (accreditation, index) => (
                    <li key={index} className="px-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          value={accreditation}
                        />
                        {accreditation}
                      </label>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
        {showModal && <Modal closeModal={closeModal} type={selectedType} />}
      </div>
    </>
  );
}

export default Filter;
