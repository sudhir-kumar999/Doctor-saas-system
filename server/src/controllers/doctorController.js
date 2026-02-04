import User from "../models/User.js";

// Get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");

    res.json({
      success: true,
      doctors,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
