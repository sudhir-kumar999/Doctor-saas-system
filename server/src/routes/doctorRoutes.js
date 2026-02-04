import express from "express";
import { getAllDoctors } from "../controllers/doctorController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route – only logged in users can see doctors
router.get("/", protect, getAllDoctors);

export default router;
