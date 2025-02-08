import express from "express";
import {
    getColleges,
    createCollege,
    getCollegeById,
    updateCollege,
    deleteCollege,
    uploadColleges,
    getDashboard,
} from "../controllers/collegeController.js";
import { isAuthorized } from "../middleware.js";
import multer from "multer";
import ApiFeatures from "../utils/ApiFeatures.js";
import College from "../models/courseSchema.js";
const router = express.Router();
const upload = multer({ dest: "uploads/" });
const getFilteredColleges = async (req, res) => {
    try {
        let apiFeatures = new ApiFeatures(College.find().lean(), req.query)
            .search()
            .filter()
            .sort()
            .pagination(20);

        const colleges = await apiFeatures.query;
        res.json({ success: true, count: colleges.length, colleges });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};
router.get("/", isAuthorized, getDashboard);
router.get("/college", isAuthorized, getColleges);
router.post("/create", isAuthorized, createCollege);
router.get("/edit/:id", isAuthorized, getCollegeById);
router.put("/edit/:id", isAuthorized, updateCollege);
router.delete("/college/:id", isAuthorized, deleteCollege);
router.post("/upload", isAuthorized, upload.single("file"), uploadColleges);
// router.get("/", getFilteredColleges);

export default router;
