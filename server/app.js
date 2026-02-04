import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./src/routes/authRoutes.js";
// import userRoutes from "./src/routes/userRoutes.js";
import doctorRoutes from "./src/routes/doctorRoutes.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import chatRoutes from "./src/routes/chatRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointment", appointmentRoutes);

export default app;
