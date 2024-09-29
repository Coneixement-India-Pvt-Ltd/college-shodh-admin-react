import User from "../models/User.js";

// Fetch user profile
// export const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ status: false, message: "User not found" });
//     }
//     res.status(200).json({ status: true, data: user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ status: false, message: "Server error" });
//   }
// };



// colleges route
export const college = async (req, res) => {
  try {
    const listings = await College.find();
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create route
export const create = async (req, res) => {
  try {
    const newListing = new College(req.body);
    await newListing.save();
    console.log("Listing created successfully:", newListing);
    res.status(201).json({ message: "Listing created successfully" });
  } catch (error) {
    console.error("Error creating listing:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the listing" });
  }
};

//  edit route
export const edit = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await College.findById(id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update route
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedListing = await College.findByIdAndUpdate(id, req.body);
    if (!updatedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    // res.redirect('/dashboard/college');
    res.status(200).json({ message: "Listing updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete route
export const deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the listing ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid college listing ID" });
    }

    const deletedCollege = await College.findByIdAndDelete(id);

    if (!deletedCollege) {
      return res.status(404).json({ error: "College listing not found" });
    }

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error("Error deleting college listing:", err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the college listing" });
  }
};

// Route for bulk uploading data through an Excel file
export const uploadBulk = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Read the Excel file
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Iterate through the worksheet and save each row to the database
    const bulkOps = worksheet.map((row) => ({
      insertOne: {
        document: row,
      },
    }));
    console.log(bulkOps);

    if (bulkOps.length > 0) {
      const result = await College.bulkWrite(bulkOps);
      console.log("Bulk data uploaded successfully:", result);
      res.status(201).json({
        message: "Bulk data uploaded successfully",
        insertedCount: result.insertedCount,
      });
    } else {
      res.status(400).json({ message: "No data to upload" });
    }
  } catch (error) {
    console.error("Error uploading bulk data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while uploading bulk data" });
  }
};
