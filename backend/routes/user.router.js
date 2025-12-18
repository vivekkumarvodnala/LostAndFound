import express from "express";
import { updateProfile, getUserDetails } from "../controllers/user.controller.js";
import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.put("/update", protect, upload.single("profilePic"), updateProfile);
router.get("/:id", getUserDetails);

export default router;
