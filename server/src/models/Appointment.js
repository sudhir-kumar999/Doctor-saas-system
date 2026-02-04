import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: String,
  time: String,
  reason: String,
  status: {
    type: String,
    default: "pending"
  }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
