import express from "express";
import passport from "../config/passport.js";
import {checkRole} from '../middlewares/authMiddleware.js'// RBAC Middleware
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
router.get("/" ,getDashboard);
// router.get("/college", isAuthorized, getColleges);
router.get("/college",passport.authenticate("jwt", { session: false }), checkRole(["admin", "editor", "viewer"]), getFilteredColleges);

router.post("/create",passport.authenticate("jwt", { session: false }), checkRole(["admin", "editor"]), isAuthorized, createCollege);

router.get("/edit/:id", passport.authenticate("jwt", { session: false }), checkRole(["admin", "editor", "viewer"]),isAuthorized, getCollegeById);

router.put("/edit/:id", passport.authenticate("jwt", { session: false }), checkRole(["admin", "editor", "viewer"]),isAuthorized, updateCollege);

router.delete("/college/:id", passport.authenticate("jwt", { session: false }), checkRole(["admin", "editor", "viewer"]),isAuthorized, deleteCollege);

router.post("/upload", passport.authenticate("jwt", { session: false }), checkRole(["admin", "editor", "viewer"]),isAuthorized, upload.single("file"), uploadColleges);


export default router;
