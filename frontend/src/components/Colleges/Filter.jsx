const Options = [
    { text: "B. Arch", course: "Architecture" },
    { text: "B. Pharm", course: "Pharmacy" },
    { text: "BCA", course: "BCA" },
    { text: "BE/B. Tech", course: "Engineering" },
    { text: "B. Sc", course: "Science" },
  ];

  

  function Filter(){
    return(
        <>
        <div className="ml-80 mt-20 p-4">
            {Options.map((option, index) => (
            <button
                className="h-12 w-48 ml-4 bg-[#569df4] border border-black-100 rounded-md hover:drop-shadow-lg"
                key={index}
            >
                <span className="hover:underline text-white font-medium">
                {option.text}
                </span>
            </button>
            ))}
        </div>

        <div className="flex ml-80 p-4">
                <div className="">
                    {/* <label for="HeadlineAct" class="block text-sm font-medium text-gray-900"> State </label> */}

                    <select
                        name="State"
                        id="State"
                        class="rounded-lg border-gray-300 text-gray-700 sm:text-sm h-12 w-48 ml-4"
                    >
                        <option value="">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
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
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                    </select>
                </div>

                <div className="">
                    {/* <label for="HeadlineAct" class="block text-sm font-medium text-gray-900">City </label> */}

                    <select
                        name="City"
                        id="City"
                        class=" rounded-lg border-gray-300 text-gray-700 sm:text-sm h-12 w-48 ml-4"
                    >
                        <option value="">Select City</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Pune">Pune</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Jaipur">Jaipur</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Kanpur">Kanpur</option>
                        <option value="Indore">Indore</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                        <option value="Nagpur">Nagpur</option>
                        <option value="Patna">Patna</option>
                        <option value="Bhubaneswar">Bhubaneswar</option>
                        <option value="Visakhapatnam">Visakhapatnam</option>
                        <option value="Mysore">Mysore</option>
                    </select>
                </div>

                <div className="">
                    {/* <label for="HeadlineAct" class="block text-sm font-medium text-gray-900"> NAAC Rating </label> */}

                    <select
                        name="NAAC"
                        id="NAAC"
                        class=" rounded-lg border-gray-300 text-gray-700 sm:text-sm h-12 w-48 ml-4"
                    >
                        <option value="">Select Rating</option>
                        <option value="A++">A++</option>
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="B++">B++</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>

                <div className="">
                    {/* <label for="HeadlineAct" class="block text-sm font-medium text-gray-900"> NBA Accredated </label> */}

                    <select
                        name="Acrredation"
                        id="Accredation"
                        class=" rounded-lg border-gray-300 text-gray-700 sm:text-sm h-12 w-48 ml-4"
                    >
                        <option value="">Select Accredation</option>
                        <option value="JM">Accredated</option>
                        <option value="JM">Non Accredated</option>
                    </select>
                </div>

        </div>

      </>
    );
  }

  export default Filter;