import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";
import Appointment from "../models/Appointment.js";


export const handleWebhook = async (req, res) => {
  try {
    console.log("🔥 WEBHOOK HIT RECEIVED");

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const receivedBody = req.body;

    console.log("Raw Body:", receivedBody);

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(receivedBody);

    const digest = shasum.digest("hex");

    const signature = req.headers["x-razorpay-signature"];

    console.log("Generated Digest:", digest);
    console.log("Received Signature:", signature);

    // Signature verify
    if (digest !== signature) {
      console.log("❌ Signature Mismatch");
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    const event = JSON.parse(receivedBody);

    console.log("Event Type:", event.event);

    // PAYMENT SUCCESS
    // if (event.event === "payment.captured") {
    //   const razorpayPaymentId = event.payload.payment.entity.id;
    //   const razorpayOrderId = event.payload.payment.entity.order_id;

    //   console.log("Payment Captured:", razorpayOrderId);

    //   const payment = await Payment.findOneAndUpdate(
    //     { razorpayOrderId },
    //     {
    //       razorpayPaymentId,
    //       status: "success",
    //     },
    //     { new: true }
    //   );

    //   console.log("Updated Payment:", payment);
    // }

    if (event.event === "payment.captured" || event.event === "order.paid") {

      const razorpayPaymentId = event.payload.payment.entity.id;
      const razorpayOrderId = event.payload.payment.entity.order_id;

      console.log("Payment Captured:", razorpayOrderId);

      // 1️⃣ Update Payment Record
      const payment = await Payment.findOneAndUpdate(
        { razorpayOrderId },
        {
          razorpayPaymentId,
          status: "success",
        },
        { new: true }
      );

      console.log("Updated Payment:", payment);

      // 2️⃣ 🔥 UPDATE APPOINTMENT STATUS HERE
      if (payment && payment.appointmentId) {

        console.log("Updating Appointment:", payment.appointmentId);

        await Appointment.findByIdAndUpdate(
          payment.appointmentId,
          { status: "confirmed" }
        );

        console.log("Appointment Confirmed");
      } else {
        console.log("No matching appointment found for payment");
      }
    }

    // PAYMENT FAILED
    if (event.event === "payment.failed") {
      const razorpayOrderId = event.payload.payment.entity.order_id;

      console.log("Payment Failed:", razorpayOrderId);

      await Payment.findOneAndUpdate(
        { razorpayOrderId },
        {
          status: "failed",
        }
      );
    }

    res.json({ status: "ok" });

  } catch (error) {
    console.log("Webhook Error:", error);
    res.status(500).json({ message: error.message });
  }
};
