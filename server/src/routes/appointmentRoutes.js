import express from "express";
import { bookAppointment, getDoctorAppointments } from "../controllers/appointmentController.js";
import protect from "../middleware/authMiddleware.js";
import { getMyAppointments } from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/book", protect, bookAppointment);
router.get("/my", protect, getMyAppointments);

router.get("/doctor", protect, getDoctorAppointments);


export default router;
