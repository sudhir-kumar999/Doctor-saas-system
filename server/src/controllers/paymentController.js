import { razorpayInstance } from "../config/razorpay.js";
import { Payment } from "../models/paymentModel.js";

// CREATE ORDER API
export const createOrder = async (req, res) => {
  try {
    const { amount, appointmentId } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    // Save in DB
    const payment = await Payment.create({
      userId: req.user.id,
      appointmentId,
      razorpayOrderId: order.id,
      amount,
    });

    res.status(200).json({
      success: true,
      order,
      paymentId: payment._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET PAYMENT STATUS
export const getPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
