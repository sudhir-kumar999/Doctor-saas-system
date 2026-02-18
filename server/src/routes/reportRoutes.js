import express from "express";
import protect from "../middleware/authMiddleware.js";
import { generateReport, myReport, singleReport } from "../controllers/reportController.js";
const reportRoute=express.Router()

reportRoute.post("/generate-report",protect,generateReport)
reportRoute.get("/allreport/:userId",protect,myReport)
reportRoute.get("/single/:id",protect,singleReport)


export default reportRoute;