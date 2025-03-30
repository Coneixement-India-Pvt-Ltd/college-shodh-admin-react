import College from "../models/courseSchema.js";
import XLSX from "xlsx";
import mongoose from "mongoose";

/** ✅ Get Dashboard Stats */
export const getDashboard = async (req, res) => {
    try {
        const totalColleges = await College.countDocuments();
        res.status(200).json({ success: true, totalColleges });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/** ✅ Get All Colleges (Filtered) */
export const getColleges = async (req, res) => {
    try {
        const listings = await College.find();
        res.status(200).json({ success: true, count: listings.length, listings });
    } catch (err) {
        console.error("Error fetching colleges:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/** ✅ Create College */
export const createCollege = async (req, res) => {
    try {
        const newCollege = new College(req.body);
        await newCollege.save();
        res.status(201).json({ message: "College added successfully", newCollege });
    } catch (error) {
        console.error("Error creating college:", error);
        res.status(500).json({ message: "An error occurred while adding the college" });
    }
};

/** ✅ Get College by ID */
export const getCollegeById = async (req, res) => {
    try {
        const college = await College.findById(req.params.id);
        if (!college) return res.status(404).json({ message: "College not found" });
        res.status(200).json(college);
    } catch (err) {
        console.error("Error fetching college:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/** ✅ Update College */
export const updateCollege = async (req, res) => {
    try {
        const updatedCollege = await College.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCollege) return res.status(404).json({ message: "College not found" });
        res.status(200).json({ message: "College updated successfully", updatedCollege });
    } catch (err) {
        console.error("Error updating college:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/** ✅ Delete College */
export const deleteCollege = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid College ID" });
        }
        const deletedCollege = await College.findByIdAndDelete(req.params.id);
        if (!deletedCollege) return res.status(404).json({ error: "College not found" });

        console.log("Deleted College ID:", req.params.id);
        res.status(200).json({ message: "College deleted successfully", deletedCollege });
    } catch (err) {
        console.error("Error deleting college:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/** ✅ Bulk Upload Colleges from Excel */
export const uploadColleges = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const fieldMapping = {
            college_name: ["college name", "collegename", "College Name"],
            address: ["address", "addr", "Address"],
            course: ["course", "course title", "Course"],
            dept: ["dept", "department"],
            university: ["university", "University"],
            nirf: ["nirf", "nirf ranking"],
            nirf_category: ["nirf category", "nirf_category"],
            naac: ["naac", "naac rating", "Naac"],
            nba: ["nba", "nba rating", "Nba"],
            fees: ["fees"],
            admission_criteria: ["admission intake", "admission criteria"],
            contact: ["contact"],
            email: ["email", "email/0", "Email"],
            website: ["website", "Website"],
            intake: ["intake"],
        };

        const normalize = (str) => str.trim().toLowerCase().replace(/\s/g, '');
        const normalizedMapping = {};

        for (const field in fieldMapping) {
            fieldMapping[field].forEach((variant) => {
                normalizedMapping[normalize(variant)] = field;
            });
        }

        const processedData = worksheet.map((row) => {
            const processedRow = {};
            for (const key in row) {
                const normKey = normalize(key);
                if (normalizedMapping[normKey]) {
                    processedRow[normalizedMapping[normKey]] = row[key];
                }
            }

            if (processedRow.email) {
                processedRow.email = processedRow.email.split(",").map((email) => email.trim());
            } else {
                processedRow.email = [];
            }

            if (processedRow.contact === "#ERROR!") {
                processedRow.contact = null;
            }

            return processedRow;
        });

        const bulkOps = processedData.map((document) => ({
            insertOne: { document },
        }));

        if (bulkOps.length > 0) {
            const result = await College.bulkWrite(bulkOps);
            return res.status(201).json({
                message: "Bulk data uploaded successfully",
                insertedCount: result.insertedIds.length,
            });
        } else {
            return res.status(400).json({ message: "No data to upload" });
        }
    } catch (error) {
        console.error("Error uploading colleges:", error);
        return res.status(500).json({
            error: "An error occurred while uploading bulk data",
            msg: error.message,
        });
    }
};