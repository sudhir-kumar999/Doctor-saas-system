import express from "express";
import { getAllDoctors } from "../controllers/doctorController.js";
import protect from "../middleware/authMiddleware.js";
import { updateDoctorFees } from "../controllers/userController.js";

const router = express.Router();

// Protected route – only logged in users can see doctors
router.get("/", protect, getAllDoctors);
router.put("/update-fees", protect, updateDoctorFees);

export default router;
