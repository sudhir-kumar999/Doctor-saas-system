import express from "express";
import protect from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

import {
  getAllUsers,
  getAllDoctors,
  deleteUser,
  getAllAppointments
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/doctors", protect, adminOnly, getAllDoctors);
router.delete("/delete/:id", protect, adminOnly, deleteUser);
router.get("/appointments", protect, adminOnly, getAllAppointments);

export default router;
