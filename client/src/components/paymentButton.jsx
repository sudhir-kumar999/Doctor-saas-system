import {
  createOrderAPI,
  getPaymentStatusAPI,
} from "../services/paymentService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentButton = ({ appointmentId, amount }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Check if Razorpay script is loaded
      if (!window.Razorpay) {
        toast.error("Payment gateway not loaded. Please refresh page.");
        return;
      }

      // 1. Create order from backend
      const { data } = await createOrderAPI({
        amount,
        appointmentId,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_SCgmKKnCQEB7eM",
        amount: data.order.amount,
        currency: "INR",
        name: "Doctor SaaS",
        description: "Appointment Booking",
        order_id: data.order.id,

        handler: async function () {
          toast.success("Payment Successful 🎉");

          // Wait for webhook to update DB
          setTimeout(async () => {
            try {
              const res = await getPaymentStatusAPI(data.paymentId);

              if (res.data.payment.status === "success") {
                toast.success("Appointment Confirmed ✅");

                // Redirect after success
                setTimeout(() => {
                  navigate("/user/appointments");
                }, 1500);
              } else {
                toast.info("Payment Pending ⏳ Please wait...");
              }
            } catch (err) {
              toast.error("Unable to verify payment status");
            }
          }, 3000);
        },

        modal: {
          ondismiss: function () {
            toast.warn("Payment window closed");
          },
        },

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Payment Initialization Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`px-6 py-3 rounded-lg font-semibold transition-all
        ${
          loading
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg"
        }
      `}
    >
      {loading ? "Processing..." : `Pay ₹${amount}`}
    </button>
  );
};

export default PaymentButton;
