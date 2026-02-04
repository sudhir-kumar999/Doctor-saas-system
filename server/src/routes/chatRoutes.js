import express from "express";
import { getDoctorChatList, getMessages } from "../controllers/chatController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:doctorId", protect, getMessages);
router.get("/doctor/list", protect, getDoctorChatList);


export default router;
