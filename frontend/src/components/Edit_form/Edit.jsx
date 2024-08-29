import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { toast } from "react-toastify";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // form validation and error handling
  const [errors, setErrors] = React.useState({});

  const [formData, setFormData] = useState({
    college_name: "",
    address: "",
    course: "",
    dept: "",
    university: "",
    nirf: "",
    naac: "",
    nba: "",
    fees: "",
    admission_criteria: "",
    intake: "",
    contact: "",
    faculty: "",
    email: "",
    website: "",
  });

  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/dashboard/edit/${id}`
        );
        setFormData({
          college_name: response.data.college_name || "",
          address: response.data.address || "",
          course: response.data.course || "",
          dept: response.data.dept || "",
          university: response.data.university || "",
          nirf: response.data.nirf || "",
          naac: response.data.naac || "",
          nba: response.data.nba || "",
          fees: response.data.fees || "",
          admission_criteria: response.data.admission_criteria || "",
          intake: response.data.intake || "",
          contact: response.data.contact || "",
          faculty: response.data.faculty || "",
          email: response.data.email || "",
          website: response.data.website || "",
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCollegeData();
  }, [id]);

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/dashboard/edit/${id}`,
        formData
      );
      if (response.status === 200) {
        
        toast.success("Edit successful");
        navigate("/dashboard/college");
      } else {
        toast.error("Edit failed");
      }
    } catch (error) {
      toast.error("Error:", error);
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const validateForm = () => {
  //   const fields = [
  //     { name: "college_name", label: "College Name is required" },
  //     { name: "university", label: "University is required" },
  //     { name: "course", label: "Program is required" },
  //     { name: "naac", label: "NAAC is required" },
  //     { name: "nirf", label: "NIRF is required" },
  //     { name: "admission_criteria", label: "Admission criteria is required" },
  //     { name: "address", label: "Address is required" },
  //     { name: "fees", label: "Course Fees are required" },
  //     { name: "intake", label: "Intake is required" },
  //     { name: "faculty", label: "Faculty is required" },
  //     { name: "website", label: "Website is required" },
  //     { name: "contact", label: "Contact is required" },
  //     { name: "email", label: "Email is required" },
  //     { name: "nba", label: "NBA Approval status is required" },
  //     // { name: "dept", label: "dept are required" },
  //   ];

  //   const newErrors = {};
  //   console.log(newErrors);

  //   fields.map((field) => {
  //     if (!formData[field.name]) {
  //       newErrors[field.name] = field.label;
  //     }
  //     return null;
  //   });

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  return (
    <div className="grid grid-cols-1 gap-4 ml-96 mr-40 mt-20">
      <h1 className=" text-2xl font-semibold">Edit Form</h1>
      <div>
        <label className="block mb-2">College Name:</label>
        <input
          type="text"
          name="college_name"
          value={formData.college_name}
          onChange={handleChange}
          className="border w-full"
          required
        />
        {/* {errors.college_name && (
          <Typography color="error" variant="body2">
            {errors.college_name}
          </Typography>
        )} */}
      </div>

      <div>
        <label className="block mb-2">University:</label>
        <input
          type="text"
          name="university"
          value={formData.university}
          onChange={handleChange}
          className="border w-full"
          required
        />
        {/* {errors.university && (
          <Typography color="error" variant="body2">
            {errors.university}
          </Typography>
        )} */}
      </div>

      <div>
        <label className="block mb-2">Program:</label>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="border w-full"
          required
        >
          <option value="">Select Program</option>
          <option value="B. Arch">B. Arch</option>
          <option value="B. Pharm">B. Pharm</option>
          <option value="BCA">BCA</option>
          <option value="BE/B. Tech">BE/B. Tech</option>
          <option value="B. Sc">B. Sc</option>
        </select>
        {errors.course && (
          <Typography color="error" variant="body2">
            {errors.course}
          </Typography>
        )}
      </div>

      {formData.course === "BE/B. Tech" && (
        <div>
          <label className="block mb-2">Courses:</label>
          <div className="flex flex-wrap gap-2">
            <label>
              <input
                type="radio"
                name="dept"
                value="Computer Science Engineering"
                checked={formData.dept === "Computer Science Engineering"}
                onChange={handleChange}
              />
              Computer Science Engineering
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Mechanical Engineering"
                checked={formData.dept === "Mechanical Engineering"}
                onChange={handleChange}
              />
              Mechanical Engineering
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Electrical Engineering"
                checked={formData.dept === "Electrical Engineering"}
                onChange={handleChange}
              />
              Electrical Engineering
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Civil Engineering"
                checked={formData.dept === "Civil Engineering"}
                onChange={handleChange}
              />
              Civil Engineering
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Aeronautical Engineering"
                checked={formData.dept === "Aeronautical Engineering"}
                onChange={handleChange}
              />
              Aeronautical Engineering
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Chemical Engineering"
                checked={formData.dept === "Chemical Engineering"}
                onChange={handleChange}
              />
              Chemical Engineering
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Automobile Engineering"
                checked={formData.dept === "Automobile Engineering"}
                onChange={handleChange}
              />
              Automobile Engineering
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Biomedical Engineering"
                checked={formData.dept === "Biomedical Engineering"}
                onChange={handleChange}
              />
              Biomedical Engineering
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Aerospace Engineering"
                checked={formData.dept === "Aerospace Engineering"}
                onChange={handleChange}
              />
              Aerospace Engineering
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Marine Engineering"
                checked={formData.dept === "Marine Engineering"}
                onChange={handleChange}
              />
              Marine Engineering
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Petroleum Engineering"
                checked={formData.dept === "Petroleum Engineering"}
                onChange={handleChange}
              />
              Petroleum Engineering
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Food Engineering"
                checked={formData.dept === "Food Engineering"}
                onChange={handleChange}
              />
              Food Engineering
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Agricultural Engineering"
                checked={formData.dept === "Agricultural Engineering"}
                onChange={handleChange}
              />
              Agricultural Engineering
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Information Technology Engineering"
                checked={formData.dept === "Information Technology Engineering"}
                onChange={handleChange}
              />
              Information Technology Engineering
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Biotechnology Engineering"
                checked={formData.dept === "Biotechnology Engineering"}
                onChange={handleChange}
              />
              Biotechnology Engineering
            </label>
          </div>
        </div>
      )}

      {formData.course === "B. Sc" && (
        <div>
          <label className="block mb-2">Courses:</label>
          <div className="flex flex-wrap gap-2">
            <label>
              <input
                type="radio"
                name="dept"
                value="Physics"
                checked={formData.dept === "Physics"}
                onChange={handleChange}
              />
              Physics
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Chemistry"
                checked={formData.dept === "Chemistry"}
                onChange={handleChange}
              />
              Chemistry
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Biology"
                checked={formData.dept === "Biology"}
                onChange={handleChange}
              />
              Biology
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Computer Sceince"
                checked={formData.dept === "Computer Sceince"}
                onChange={handleChange}
              />
              Computer Sceince
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Animation"
                checked={formData.dept === "Animation"}
                onChange={handleChange}
              />
              Animation
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Microbiology"
                checked={formData.dept === "Microbiology"}
                onChange={handleChange}
              />
              Microbiology
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Botany"
                checked={formData.dept === "Botany"}
                onChange={handleChange}
              />
              Botany
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Biotechnology"
                checked={formData.dept === "Biotechnology"}
                onChange={handleChange}
              />
              Biotechnology
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Food Technology"
                checked={formData.dept === "Food Technology"}
                onChange={handleChange}
              />
              Food Technology
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Information Technology"
                checked={formData.dept === "Information Technology"}
                onChange={handleChange}
              />
              Information Technology
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Computer Programming"
                checked={formData.dept === "Computer Programming"}
                onChange={handleChange}
              />
              Computer Programming
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Psychology"
                checked={formData.dept === "Psychology"}
                onChange={handleChange}
              />
              Psychology
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Aviation"
                checked={formData.dept === "Aviation"}
                onChange={handleChange}
              />
              Aviation
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Nursing"
                checked={formData.dept === "Nursing"}
                onChange={handleChange}
              />
              Nursing
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Cell Biology"
                checked={formData.dept === "Cell Biology"}
                onChange={handleChange}
              />
              Cell Biology
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Forestry"
                checked={formData.dept === "Forestry"}
                onChange={handleChange}
              />
              Forestry
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Statistics"
                checked={formData.dept === "Statistics"}
                onChange={handleChange}
              />
              Statistics
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Nautical Science"
                checked={formData.dept === "Nautical Science"}
                onChange={handleChange}
              />
              Nautical Science
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Agriculture"
                checked={formData.dept === "Agriculture"}
                onChange={handleChange}
              />
              Agriculture
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Aquaculture"
                checked={formData.dept === "Aquaculture"}
                onChange={handleChange}
              />
              Aquaculture
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Biochemistry"
                checked={formData.dept === "Biochemistry"}
                onChange={handleChange}
              />
              Biochemistry
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Dietetics"
                checked={formData.dept === "Dietetics"}
                onChange={handleChange}
              />
              Dietetics
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Electronic"
                checked={formData.dept === "Electronic"}
                onChange={handleChange}
              />
              Electronic
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Fashion Technology"
                checked={formData.dept === "Fashion Technology"}
                onChange={handleChange}
              />
              Fashion Technology
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Forensic Science"
                checked={formData.dept === "Forensic Science"}
                onChange={handleChange}
              />
              Forensic Science
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Medical Technology"
                checked={formData.dept === "Medical Technology"}
                onChange={handleChange}
              />
              Medical Technology
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Multimedia"
                checked={formData.dept === "Multimedia"}
                onChange={handleChange}
              />
              Multimedia
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Nutrition"
                checked={formData.dept === "Nutrition"}
                onChange={handleChange}
              />
              Nutrition
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Physiotherapy"
                checked={formData.dept === "Physiotherapy"}
                onChange={handleChange}
              />
              Physiotherapy
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Genetics"
                checked={formData.dept === "Genetics"}
                onChange={handleChange}
              />
              Genetics
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Interior Design"
                checked={formData.dept === "Interior Design"}
                onChange={handleChange}
              />
              Interior Design
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Mathematics"
                checked={formData.dept === "Mathematics"}
                onChange={handleChange}
              />
              Mathematics
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Zoology"
                checked={formData.dept === "Zoology"}
                onChange={handleChange}
              />
              Zoology
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Home Science"
                checked={formData.dept === "Home Sceince"}
                onChange={handleChange}
              />
              Home Sceince
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Paleontology"
                checked={formData.dept === "Paleontology"}
                onChange={handleChange}
              />
              Paleontology
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Geology"
                checked={formData.dept === "Geology"}
                onChange={handleChange}
              />
              Geology
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Oceanography"
                checked={formData.dept === "Oceanography"}
                onChange={handleChange}
              />
              Oceanography
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Astrobiology"
                checked={formData.dept === "Astrobiology"}
                onChange={handleChange}
              />
              Astrobiology
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Astronomy"
                checked={formData.dept === "Astronomy"}
                onChange={handleChange}
              />
              Astronomy
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Environment & Sustainability"
                checked={formData.dept === "Environment & Sustainability"}
                onChange={handleChange}
              />
              Environment & Sustainability
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Data Science"
                checked={formData.dept === "Data Science"}
                onChange={handleChange}
              />
              Data Science
            </label>
            <label>
              <input
                type="radio"
                name="dept"
                value="Exercise & Sports Science"
                checked={formData.dept === "Exercise & Sports Science"}
                onChange={handleChange}
              />
              Exercise & Sports Sceince
            </label>
          </div>
        </div>
      )}

      <div>
        <label className="block mb-2">NAAC Rating:</label>
        <select
          name="naac"
          value={formData.naac}
          onChange={handleChange}
          className="border w-full"
          required
        >
          <option value="">Select NAAC Rating</option>
          <option value="A++">A++</option>
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="B++">B++</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="NotNaac">Not Accredited</option>
        </select>
        {errors.naac && (
          <Typography color="error" variant="body2">
            {errors.naac}
          </Typography>
        )}
      </div>

      <div>
        <label className="block mb-2">NBA Approved:</label>
        <select
          name="nba"
          value={formData.nba}
          onChange={handleChange}
          className="border w-full"
          required
        >
          <option value="">Select Approval</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="N/A">N/A</option>
        </select>
        {/* {errors.nba && (
                          <Typography color="error" variant="body2">
                            {errors.nba}
                          </Typography>
                        )} */}
      </div>

      <div>
        <label className="block mb-2">NIRF Ranking:</label>
        <input
          type="text"
          name="nirf"
          value={formData.nirf}
          onChange={handleChange}
          className="border w-full"
          required
        />
        {errors.nirf && (
          <Typography color="error" variant="body2">
            {errors.nirf}
          </Typography>
        )}
      </div>

      <div>
        <label className="block mb-2">Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border w-full"
          required
        />
        {errors.address && (
          <Typography color="error" variant="body2">
            {errors.address}
          </Typography>
        )}
      </div>

      <div>
        <label className="block mb-2">Admission Criteria:</label>
        <input
          type="text"
          name="admission_criteria"
          value={formData.admission_criteria}
          onChange={handleChange}
          className="border w-full"
          required
        />
        {errors.admission_criteria && (
          <Typography color="error" variant="body2">
            {errors.admission_criteria}
          </Typography>
        )}
      </div>

      {/* <div>
                        <label className="block mb-2">State:</label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="border w-full"
                          required
                        >
                          <option value="">Select State</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Arunachal Pradesh">
                            Arunachal Pradesh
                          </option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">
                            Himachal Pradesh
                          </option>
                          <option value="Jammu and Kashmir">
                            Jammu and Kashmir
                          </option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Andaman and Nicobar Islands">
                            Andaman and Nicobar Islands
                          </option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Dadra and Nagar Haveli">
                            Dadra and Nagar Haveli
                          </option>
                          <option value="Daman and Diu">Daman and Diu</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Lakshadweep">Lakshadweep</option>
                          <option value="Puducherry">Puducherry</option>
                        </select>
                        {errors.collegeName && (
                          <Typography color="error" variant="body2">
                            {errors.state}
                          </Typography>
                        )}
                      </div> */}

      <div>
        <label className="block mb-2">Course Fees:</label>
        <select
          name="fees"
          value={formData.courseFees}
          onChange={handleChange}
          className="border w-full"
          required
        >
          <option value="">Select Course Fees</option>
          <option value="0-50k">0-50k</option>
          <option value="50k-1L">50k-1L</option>
          <option value="1,00,000+">1L-1.5L</option>
          <option value="1.5L-2L">1.5L-2L</option>
          <option value="2L+">Above 2L</option>
        </select>
        {errors.fees && (
          <Typography color="error" variant="body2">
            {errors.fees}
          </Typography>
        )}
      </div>

      <div>
        <label className="block mb-2">Intake:</label>
        <input
          type="text"
          name="intake"
          value={formData.intake}
          onChange={handleChange}
          className="border w-full"
          required
        />
        {errors.intake && (
          <Typography color="error" variant="body2">
            {errors.intake}
          </Typography>
        )}
      </div>

      <div>
        <label className="block mb-2">Number of Faculty:</label>
        <input
          type="text"
          name="faculty"
          value={formData.faculty}
          onChange={handleChange}
          className="border w-full"
          required
        />
        {errors.faculty && (
          <Typography color="error" variant="body2">
            {errors.faculty}
          </Typography>
        )}
      </div>

      <div>
        <label className="block mb-2">Website:</label>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="border w-full"
          required
        />
        {errors.website && (
          <Typography color="error" variant="body2">
            {errors.website}
          </Typography>
        )}
      </div>

      <div>
        <label className="block mb-2">Contact No:</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="border w-full"
          required
        />
        {errors.contact && (
          <Typography color="error" variant="body2">
            {errors.contact}
          </Typography>
        )}
      </div>

      <div>
        <label className="block mb-2">Official Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        {errors.email && (
          <Typography color="error" variant="body2">
            {errors.email}
          </Typography>
        )}

        <Button
          onClick={handleEdit}
          color="inherit"
          sx={{
            mt: 3,
            backgroundColor: "#0969FF",
            color: "white",
            marginBottom: "50px",
            "&:hover": {
              backgroundColor: "#0A30C1",
            },
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Edit;
