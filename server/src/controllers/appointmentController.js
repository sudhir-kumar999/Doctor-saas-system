import Appointment from "../models/Appointment.js";

// 1. CREATE APPOINTMENT - DEFAULT PENDING PAYMENT
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason, fees } = req.body;

    const appointment = await Appointment.create({
      userId: req.user.id,
      doctorId,
      date,
      time,
      reason,
      fees,
      status: "pending_payment",   // 🔥 IMPORTANT
    });

    res.json({
      message: "Appointment Created - Pending Payment",
      appointment,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. USER SIDE - SHOW ONLY CONFIRMED APPOINTMENTS
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      userId: req.user.id,
      status: "confirmed",        // 🔥 ONLY SUCCESSFUL PAYMENTS
    }).populate("doctorId", "name email");

    res.json({
      appointments,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. DOCTOR SIDE - SHOW ONLY CONFIRMED APPOINTMENTS
export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.user.id,
      status: "confirmed",       // 🔥 ONLY PAID APPOINTMENTS
    }).populate("userId", "name email");

    res.json({ appointments });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
