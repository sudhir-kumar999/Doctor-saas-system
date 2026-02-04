import User from "../models/User.js";
import Appointment from "../models/Appointment.js";

// Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" });
  res.json({ users });
};

// Get all doctors
export const getAllDoctors = async (req, res) => {
  const doctors = await User.find({ role: "doctor" });
  res.json({ doctors });
};

// Delete user or doctor
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};

// Get all appointments
export const getAllAppointments = async (req, res) => {
  const appointments = await Appointment.find()
    .populate("userId", "name email")
    .populate("doctorId", "name email");

  res.json({ appointments });
};
