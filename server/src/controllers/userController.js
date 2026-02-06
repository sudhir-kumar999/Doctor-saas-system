import User from "../models/User.js";

// Update Doctor Fees
export const updateDoctorFees = async (req, res) => {
  try {
    const { fees } = req.body;

    // Sirf doctor hi apni fees update kare
    if (req.user.role !== "doctor") {
      return res.status(403).json({
        message: "Only doctors can update fees",
      });
    }

    if (!fees || fees <= 0) {
      return res.status(400).json({
        message: "Please enter valid fees",
      });
    }

    const updatedDoctor = await User.findByIdAndUpdate(
      req.user.id,
      { fees },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Fees updated successfully",
      doctor: updatedDoctor,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
