import Report from "../models/Report.js";
import { generateAIReport } from "../services/geminiService.js";


export const generateReport=async(req,res)=>{


     try {
    const userId = req.body.userId; // frontend se bhejna hoga
    const aiReport = await generateAIReport(req.body);

    const newReport = await Report.create({
      ...req.body,
      userId,
      aiReport,
    });

    res.json({ report: aiReport, reportId: newReport._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate report" });
  }
}


export const myReport=async(req,res)=>{
    try {
        console.log("report run")
        console.log(req.params.userId)
    const reports = await Report.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
}

export const singleReport=async(req,res)=>{
    try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Error fetching report" });
  }
}