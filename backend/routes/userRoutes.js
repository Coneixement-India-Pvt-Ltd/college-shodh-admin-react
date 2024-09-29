import express from "express";
import {
  college,
  create,
  edit,
  update,
  deleteCollege,
  uploadBulk,
} from "../controllers/userController.js";

// import { isAuthorized } from "../middleware.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/college", college);

router.post("/create", create);

router.get("/edit/:id", edit);

router.put("/update/:id", update);

router.delete("/delete/:id", deleteCollege);

router.post, upload.single("file"), ("/uploadBulk", uploadBulk);

export default router;
