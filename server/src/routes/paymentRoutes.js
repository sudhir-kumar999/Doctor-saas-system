import express from "express";
import { createOrder, getPaymentStatus } from "../controllers/paymentController.js";
// import { isAuthenticated } from "../middleware/auth.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-order", protect, createOrder);

router.get("/status/:id", protect, getPaymentStatus);

export default router;
