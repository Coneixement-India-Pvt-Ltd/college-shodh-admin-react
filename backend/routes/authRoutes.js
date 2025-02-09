import express from "express";
import passport from "../config/passport.js";
import { signup, login, logout } from "../controllers/authController.js";
import {checkRole} from '../middlewares/authMiddleware.js'// RBAC Middleware
import { authenticateJWT } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", authenticateJWT, (req, res) => {
    res.json({ user: req.user });
});
// 🔒 Protected Routes with RBAC
router.get("/admin-only", passport.authenticate("jwt", { session: false }), checkRole(["admin"]), (req, res) => {
    res.json({ message: "Welcome, Admin!" });
});

router.get("/viewer-only", passport.authenticate("jwt", { session: false }), checkRole(["viewer",]), (req, res) => {
    res.json({ message: "Welcome, User!" });
});

export default router;
