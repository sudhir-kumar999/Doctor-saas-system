import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";

const BookAppointment = () => {

  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  const fetchDoctor = async () => {
    try {
      const res = await api.get(`/api/doctors`);
      const found = res.data.doctors.find(d => d._id === doctorId);
      setDoctor(found);
    } catch (err) {
      toast.error("Failed to load doctor info");
      console.log(err)
    }
  };

  if (!doctorId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl text-red-600">
          Please select a doctor first
        </h2>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time) {
      toast.error("Please select date and time");
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/appointment/book", {
        doctorId,
        date,
        time,
        reason
      });

      toast.success("Appointment Booked Successfully");

      setTimeout(() => {
        navigate("/user/appointments");
      }, 1000);

    } catch (err) {
      toast.error(err.message || "Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">

        <h2 className="text-2xl font-bold mb-2 text-center">
          Book Appointment
        </h2>

        {doctor && (
          <p className="text-center text-gray-600 mb-4">
            Doctor: <b>{doctor.name}</b>
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <label className="block mb-2 font-semibold">
            Select Date
          </label>

          <input
            type="date"
            className="border p-2 w-full mb-3 rounded"
            onChange={(e) => setDate(e.target.value)}
          />

          <label className="block mb-2 font-semibold">
            Select Time
          </label>

          <input
            type="time"
            className="border p-2 w-full mb-3 rounded"
            onChange={(e) => setTime(e.target.value)}
          />

          <label className="block mb-2 font-semibold">
            Reason (Optional)
          </label>

          <textarea
            className="border p-2 w-full mb-3 rounded"
            placeholder="Reason for appointment"
            onChange={(e) => setReason(e.target.value)}
          />

          <button
            disabled={loading}
            className="bg-blue-600 text-white p-2 w-full rounded"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default BookAppointment;
