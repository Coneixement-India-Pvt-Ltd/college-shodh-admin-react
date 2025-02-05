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
        if (!deletedCollege) return res.status(404).json({ error: "College listing not found" });
        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "An error occurred while deleting the college listing" });
    }
};

export const uploadColleges = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const bulkOps = worksheet.map((row) => ({ insertOne: { document: row } }));
        if (bulkOps.length > 0) {
            const result = await College.bulkWrite(bulkOps);
            res.status(201).json({ message: "Bulk data uploaded successfully", insertedCount: result.insertedCount });
        } else {
            res.status(400).json({ message: "No data to upload" });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while uploading bulk data" });
    }
};
