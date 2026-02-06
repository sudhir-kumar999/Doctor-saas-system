import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./src/routes/authRoutes.js";
// import userRoutes from "./src/routes/userRoutes.js";
import doctorRoutes from "./src/routes/doctorRoutes.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

import paymentRoutes from "./src/routes/paymentRoutes.js";
import webhookRoutes from "./src/routes/webhookRoutes.js";


const app = express();
app.use(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  webhookRoutes
);

// Needed for correct HTTPS / secure cookies behind Render proxy
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

// Allow both local dev and Render frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://doctor-saas-systems.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server / tools with no origin
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", doctorRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/admin", adminRoutes);



// app.use(express.json());

// Baaki sab routes ke liye normal JSON parser
// app.use(express.json());

// ---------- NORMAL ROUTES ----------

app.use("/api/payment", paymentRoutes);

export default app;
