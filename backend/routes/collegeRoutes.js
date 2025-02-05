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

const router = express.Router();
const upload = multer({ dest: "uploads/" });
router.get("/", isAuthorized, getDashboard);
router.get("/college", isAuthorized, getColleges);
router.post("/create", isAuthorized, createCollege);
router.get("/edit/:id", isAuthorized, getCollegeById);
router.put("/edit/:id", isAuthorized, updateCollege);
router.delete("/college/:id", isAuthorized, deleteCollege);
router.post("/upload", isAuthorized, upload.single("file"), uploadColleges);

export default router;
