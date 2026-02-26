import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: String,
    age: Number,
    gender: String,
    symptoms: [String],
    duration: String,
    severity: String,
    description: String,
    aiReport: String,
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
