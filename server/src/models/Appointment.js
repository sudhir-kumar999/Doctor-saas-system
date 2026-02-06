import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  date: String,
  time: String,
  reason: String,

  fees: Number,

  status: {
    type: String,
    enum: ["pending_payment", "confirmed", "cancelled"],
    default: "pending_payment",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Appointment", appointmentSchema);
