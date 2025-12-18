import express from "express";
import { register, login, logout, getMe } from "../controllers/auth.controller.js";
import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/signup",upload.single('profilePic'),register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, getMe);

export default router;
