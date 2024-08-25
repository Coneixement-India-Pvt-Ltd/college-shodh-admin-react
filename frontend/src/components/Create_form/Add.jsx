import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import Preview from "./Preview";

const steps = ["Add College Form", "Preview"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [formData, setFormData] = React.useState({
    college_name: "",
    university: "",
    program: "",
    naac: "",
    nirf: "",
    state: "",
    address: "",
    courseFees: "",
    Intake: "",
    faculty: "",
    website: "",
    contact: "",
    email: "",
    nbaApproved: "",
    courses: "",
  });

  const handleNext = () => {
    if (activeStep == steps.length - 1) {
      handleFinish();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleFinish = () => {
    console.log("Form Data:", formData);
    // if more steps?
    if (activeStep < steps.length - 1) {
      // Move to next step
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      // stepper reaches the end
      setActiveStep(steps.length);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      college_name: "",
      university: "",
      program: "",
      courses: "",
      naac: "",
      nbaApproved: "",
      nirf: "",
      address: "",
      state: "",
      courseFees: "",
      intake: "",
      faculty: "",
      website: "",
      contact: "",
      email: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="mt-24 ml-80 mr-16">
      <div>
        <Box sx={{ width: "100%" }} className="p-4">
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>
                  <Typography sx={{ fontSize: "1.75rem" }}>{label}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <div className="p-20">
                <div className="text-center p-16 border rounded">
                  <img
                    src="/images/tick.png"
                    alt="tick"
                    className="h-12 mx-auto mb-3"
                  />
                  <strong>All steps completed - you're done</strong>
                </div>
              </div>

              <Box sx={{ textAlign: "right" }}>
                <Button
                  onClick={handleReset}
                  sx={{
                    backgroundColor: "#0056b3",
                    color: "#FFFFFF",
                    marginBottom: "16px",
                    "&:hover": {
                      backgroundColor: "#0A30C1",
                    },
                  }}
                >
                  Reset
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <Box component="form">
                  <Box className="-ml-64">
                    <div className="grid grid-cols-1 gap-4 ml-96 mr-40 mt-8">
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
                      </div>

                      <div>
                        <label className="block mb-2">Program:</label>
                        <select
                          name="program"
                          value={formData.program}
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
                      </div>

                      {formData.program === "BE/B. Tech" && (
                        <div>
                          <label className="block mb-2">Courses:</label>
                          <div className="flex flex-wrap gap-2">
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Computer Science Engineering"
                                checked={
                                  formData.courses ===
                                  "Computer Science Engineering"
                                }
                                onChange={handleChange}
                              />
                              Computer Science Engineering
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Mechanical Engineering"
                                checked={
                                  formData.courses === "Mechanical Engineering"
                                }
                                onChange={handleChange}
                              />
                              Mechanical Engineering
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Electrical Engineering"
                                checked={
                                  formData.courses === "Electrical Engineering"
                                }
                                onChange={handleChange}
                              />
                              Electrical Engineering
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Civil Engineering"
                                checked={
                                  formData.courses === "Civil Engineering"
                                }
                                onChange={handleChange}
                              />
                              Civil Engineering
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Aeronautical Engineering"
                                checked={
                                  formData.courses ===
                                  "Aeronautical Engineering"
                                }
                                onChange={handleChange}
                              />
                              Aeronautical Engineering
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Chemical Engineering"
                                checked={
                                  formData.courses === "Chemical Engineering"
                                }
                                onChange={handleChange}
                              />
                              Chemical Engineering
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Automobile Engineering"
                                checked={
                                  formData.courses === "Automobile Engineering"
                                }
                                onChange={handleChange}
                              />
                              Automobile Engineering
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Biomedical Engineering"
                                checked={
                                  formData.courses === "Biomedical Engineering"
                                }
                                onChange={handleChange}
                              />
                              Biomedical Engineering
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Aerospace Engineering"
                                checked={
                                  formData.courses === "Aerospace Engineering"
                                }
                                onChange={handleChange}
                              />
                              Aerospace Engineering
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Marine Engineering"
                                checked={
                                  formData.courses === "Marine Engineering"
                                }
                                onChange={handleChange}
                              />
                              Marine Engineering
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Petroleum Engineering"
                                checked={
                                  formData.courses === "Petroleum Engineering"
                                }
                                onChange={handleChange}
                              />
                              Petroleum Engineering
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Food Engineering"
                                checked={
                                  formData.courses === "Food Engineering"
                                }
                                onChange={handleChange}
                              />
                              Food Engineering
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Agricultural Engineering"
                                checked={
                                  formData.courses ===
                                  "Agricultural Engineering"
                                }
                                onChange={handleChange}
                              />
                              Agricultural Engineering
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Information Technology Engineering"
                                checked={
                                  formData.courses ===
                                  "Information Technology Engineering"
                                }
                                onChange={handleChange}
                              />
                              Information Technology Engineering
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Biotechnology Engineering"
                                checked={
                                  formData.courses ===
                                  "Biotechnology Engineering"
                                }
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
                                name="courses"
                                value="Physics"
                                checked={formData.courses === "Physics"}
                                onChange={handleChange}
                              />
                              Physics
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Chemistry"
                                checked={formData.courses === "Chemistry"}
                                onChange={handleChange}
                              />
                              Chemistry
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Biology"
                                checked={formData.courses === "Biology"}
                                onChange={handleChange}
                              />
                              Biology
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Computer Sceince"
                                checked={
                                  formData.courses === "Computer Sceince"
                                }
                                onChange={handleChange}
                              />
                              Computer Sceince
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Animation"
                                checked={formData.courses === "Animation"}
                                onChange={handleChange}
                              />
                              Animation
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Microbiology"
                                checked={formData.courses === "Microbiology"}
                                onChange={handleChange}
                              />
                              Microbiology
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Botany"
                                checked={formData.courses === "Botany"}
                                onChange={handleChange}
                              />
                              Botany
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Biotechnology"
                                checked={formData.courses === "Biotechnology"}
                                onChange={handleChange}
                              />
                              Biotechnology
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Food Technology"
                                checked={formData.courses === "Food Technology"}
                                onChange={handleChange}
                              />
                              Food Technology
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Information Technology"
                                checked={
                                  formData.courses === "Information Technology"
                                }
                                onChange={handleChange}
                              />
                              Information Technology
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Computer Programming"
                                checked={
                                  formData.courses === "Computer Programming"
                                }
                                onChange={handleChange}
                              />
                              Computer Programming
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Psychology"
                                checked={formData.courses === "Psychology"}
                                onChange={handleChange}
                              />
                              Psychology
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Aviation"
                                checked={formData.courses === "Aviation"}
                                onChange={handleChange}
                              />
                              Aviation
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Nursing"
                                checked={formData.courses === "Nursing"}
                                onChange={handleChange}
                              />
                              Nursing
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Cell Biology"
                                checked={formData.courses === "Cell Biology"}
                                onChange={handleChange}
                              />
                              Cell Biology
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Forestry"
                                checked={formData.courses === "Forestry"}
                                onChange={handleChange}
                              />
                              Forestry
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Statistics"
                                checked={formData.courses === "Statistics"}
                                onChange={handleChange}
                              />
                              Statistics
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Nautical Science"
                                checked={
                                  formData.courses === "Nautical Science"
                                }
                                onChange={handleChange}
                              />
                              Nautical Science
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Agriculture"
                                checked={formData.courses === "Agriculture"}
                                onChange={handleChange}
                              />
                              Agriculture
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Aquaculture"
                                checked={formData.courses === "Aquaculture"}
                                onChange={handleChange}
                              />
                              Aquaculture
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Biochemistry"
                                checked={formData.courses === "Biochemistry"}
                                onChange={handleChange}
                              />
                              Biochemistry
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Dietetics"
                                checked={formData.courses === "Dietetics"}
                                onChange={handleChange}
                              />
                              Dietetics
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Electronic"
                                checked={formData.courses === "Electronic"}
                                onChange={handleChange}
                              />
                              Electronic
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Fashion Technology"
                                checked={
                                  formData.courses === "Fashion Technology"
                                }
                                onChange={handleChange}
                              />
                              Fashion Technology
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Forensic Science"
                                checked={
                                  formData.courses === "Forensic Science"
                                }
                                onChange={handleChange}
                              />
                              Forensic Science
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Medical Technology"
                                checked={
                                  formData.courses === "Medical Technology"
                                }
                                onChange={handleChange}
                              />
                              Medical Technology
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Multimedia"
                                checked={formData.courses === "Multimedia"}
                                onChange={handleChange}
                              />
                              Multimedia
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Nutrition"
                                checked={formData.courses === "Nutrition"}
                                onChange={handleChange}
                              />
                              Nutrition
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Physiotherapy"
                                checked={formData.courses === "Physiotherapy"}
                                onChange={handleChange}
                              />
                              Physiotherapy
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Genetics"
                                checked={formData.courses === "Genetics"}
                                onChange={handleChange}
                              />
                              Genetics
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Interior Design"
                                checked={formData.courses === "Interior Design"}
                                onChange={handleChange}
                              />
                              Interior Design
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Mathematics"
                                checked={formData.courses === "Mathematics"}
                                onChange={handleChange}
                              />
                              Mathematics
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Zoology"
                                checked={formData.courses === "Zoology"}
                                onChange={handleChange}
                              />
                              Zoology
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Home Science"
                                checked={formData.courses === "Home Sceince"}
                                onChange={handleChange}
                              />
                              Home Sceince
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Paleontology"
                                checked={formData.courses === "Paleontology"}
                                onChange={handleChange}
                              />
                              Paleontology
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Geology"
                                checked={formData.courses === "Geology"}
                                onChange={handleChange}
                              />
                              Geology
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Oceanography"
                                checked={formData.courses === "Oceanography"}
                                onChange={handleChange}
                              />
                              Oceanography
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Astrobiology"
                                checked={formData.courses === "Astrobiology"}
                                onChange={handleChange}
                              />
                              Astrobiology
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Astronomy"
                                checked={formData.courses === "Astronomy"}
                                onChange={handleChange}
                              />
                              Astronomy
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Environment & Sustainability"
                                checked={
                                  formData.courses ===
                                  "Environment & Sustainability"
                                }
                                onChange={handleChange}
                              />
                              Environment & Sustainability
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Data Science"
                                checked={formData.courses === "Data Science"}
                                onChange={handleChange}
                              />
                              Data Science
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="courses"
                                value="Exercise & Sports Science"
                                checked={
                                  formData.courses ===
                                  "Exercise & Sports Science"
                                }
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
                      </div>

                      <div>
                        <label className="block mb-2">NBA Approved:</label>
                        <select
                          name="nbaApproved"
                          value={formData.nbaApproved}
                          onChange={handleChange}
                          className="border w-full"
                          required
                        >
                          <option value="">Select Approval</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                          <option value="N/A">N/A</option>
                        </select>
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
                      </div>

                      <div>
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
                      </div>

                      <div>
                        <label className="block mb-2">Course Fees:</label>
                        <select
                          name="courseFees"
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
                      </div>

                      <div>
                        <label className="block mb-2">Intake:</label>
                        <input
                          type="text"
                          name="Intake"
                          value={formData.Intake}
                          onChange={handleChange}
                          className="border w-full"
                          required
                        />
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
                      </div>

                      <div>
                        <label className="block mb-2">Official Email:</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="border p-2 mb-4 w-full"
                          required
                        />
                      </div>
                    </div>
                  </Box>
                </Box>
              )}

              {/* PREVIEW PAGE */}
              {activeStep === 1 && <Preview formData={formData} />}

              {/* {activeStep === 2 && (
                <div className="p-36">
                  <div className="text-center p-16 border-4 rounded">
                    <strong>Submit your information.</strong>
                  </div>
                </div>
              )} */}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{
                    mr: 1,
                    backgroundColor: "#0969FF",
                    color: "white",
                    marginBottom: "50px",
                    "&:hover": {
                      backgroundColor: "#0A30C1",
                    },
                  }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} className="mb-5" />
                <Button
                  onClick={handleNext}
                  sx={{
                    backgroundColor: "#0969FF",
                    marginBottom: "50px",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#0A30C1",
                    },
                  }}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </div>
  );
}
