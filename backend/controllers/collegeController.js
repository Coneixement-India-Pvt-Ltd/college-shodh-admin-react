import College from "../models/courseSchema.js";
import XLSX from "xlsx";
import mongoose from "mongoose";
import { isAuthorized } from "../middleware.js";
export const getDashboard = (req, res) => {
    res.json({ isAuthenticated: true });
};

export const getColleges = async (req, res) => {
    try {
        const listings = await College.find();
        res.status(200).json(listings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createCollege = async (req, res) => {
    try {
        const newListing = new College(req.body);
        await newListing.save();
        res.status(201).json({ message: "Listing created successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the listing" });
    }
};

export const getCollegeById = async (req, res) => {
    try {
        const listing = await College.findById(req.params.id);
        if (!listing) return res.status(404).json({ message: "Listing not found" });
        res.status(200).json(listing);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateCollege = async (req, res) => {
    try {
        const updatedListing = await College.findByIdAndUpdate(req.params.id, req.body);
        if (!updatedListing) return res.status(404).json({ message: "Listing not found" });
        res.status(200).json({ message: "Listing updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteCollege = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid college listing ID" });
        }
        const deletedCollege = await College.findByIdAndDelete(req.params.id);
        console.log(req.params.id)
        if (!deletedCollege) return res.status(404).json({ error: "College listing not found" });
        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "An error occurred while deleting the college listing" });
    }
};

export const uploadColleges = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Read the Excel file
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Define possible header variants for each schema field
        const possibilityMapping = {
            college_name: ["college name", "colleges", "collegename","College Name"],
            address: ["address", "addr","Address"],
            course: ["course", "course title","Course"],
            dept: ["dept", "department"],
            university: ["university","University"],
            nirf: ["nirf", "nirf ranking"],
            naac: ["naac", "naac rating", "Naac"],
            nba: ["nba", "nba rating", "Nba"],
            fees: ["fees"],
            admission_criteria: ["admission intake", "admission criteria"],
            contact: ["contact"],
            email: ["email", "email/0","Email"],
            website: ["website","Website"]
        };

        // Normalize a string: trim, lowercase, and remove spaces.
        const normalize = str => str.trim().toLowerCase().replace(/\s/g, '');

        // Build a normalized mapping: normalized variant -> schema field
        const normalizedMapping = {};
        for (const field in possibilityMapping) {
            possibilityMapping[field].forEach(variant => {
                normalizedMapping[normalize(variant)] = field;
            });
        }

        // Allowed fields include those from possibilityMapping plus any extra (like "intake")
        const allowedStandardFields = new Set([...Object.keys(possibilityMapping), "intake"]);

        // Process each row from the worksheet
        const processedData = worksheet.map(row => {
            const processedRow = {};

            // Map each CSV column to a schema field using normalized headers
            for (const key in row) {
                const normKey = normalize(key);
                if (normalizedMapping[normKey]) {
                    processedRow[normalizedMapping[normKey]] = row[key];
                } else if (allowedStandardFields.has(key)) {
                    // If key already matches a schema field, copy it.
                    processedRow[key] = row[key];
                }
                // Other columns are ignored.
            }

            // Special processing for email: convert comma-separated string into an array.
            if (processedRow.email) {
                processedRow.email = processedRow.email.split(",").map(email => email.trim());
            } else {
                processedRow.email = [];
            }

            // Process the intake field: convert to a number if possible, otherwise set to null.
            const intakeValue = row["intake"];
            if (intakeValue === "N/A" || intakeValue === "" || intakeValue === undefined) {
                processedRow.intake = null;
            } else {
                const intakeNumber = Number(intakeValue);
                processedRow.intake = isNaN(intakeNumber) ? null : intakeNumber;
            }

            // Clean up the contact field if it contains errors.
            if (processedRow.contact === "#ERROR!") {
                processedRow.contact = null;
            }

            // Remove accidental MongoDB-specific fields if they exist.
            delete processedRow["_id"];
            delete processedRow["__v"];

            return processedRow;
        });

        // Prepare bulk insert operations
        const bulkOps = processedData.map(document => ({
            insertOne: { document }
        }));

        if (bulkOps.length > 0) {
            const result = await College.bulkWrite(bulkOps);
            return res.status(201).json({
                message: "Bulk data uploaded successfully",
                insertedCount: result.insertedCount
            });
        } else {
            return res.status(400).json({ message: "No data to upload" });
        }
    } catch (error) {
        return res.status(500).json({
            error: "An error occurred while uploading bulk data",
            msg: error.message
        });
    }
};
