import Appointment from "../models/Appointment.js";

export const bookAppointment = async (req, res) => {

  try {
    const { doctorId, date, time, reason } = req.body;

    const appointment = await Appointment.create({
      userId: req.user.id,
      doctorId,
      date,
      time,
      reason
    });

    res.json({
      message: "Appointment Booked",
      appointment
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      userId: req.user.id
    }).populate("doctorId", "name email");

    res.json({
      appointments
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.user.id
    }).populate("userId", "name email");

    res.json({ appointments });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


