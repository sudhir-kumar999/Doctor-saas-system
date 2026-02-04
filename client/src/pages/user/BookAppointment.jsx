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
  const [fetchingDoctor, setFetchingDoctor] = useState(true);

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
    } finally {
      setFetchingDoctor(false);
    }
  };

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

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (!doctorId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Doctor Selected
          </h2>
          <p className="text-gray-600 mb-6">
            Please select a doctor first to book an appointment
          </p>
          <button
            onClick={() => navigate("/user/doctors")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Browse Doctors
          </button>
        </div>
      </div>
    );
  }

  if (fetchingDoctor) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-700">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8 pt-20 lg:pt-8">

      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Book Appointment
          </h1>
          <p className="text-gray-600">
            Schedule your consultation with ease
          </p>
        </div>

        {/* Doctor Info Card */}
        {doctor && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {doctor.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">
                  Dr. {doctor.name}
                </h3>
                <div className="flex items-center mt-1">
                  <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">Verified Doctor</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100">
          
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Date Input */}
            <div>
              <label className="flex items-center text-gray-700 font-semibold mb-3">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Select Date
              </label>
              <input
                type="date"
                min={getTodayDate()}
                className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 transition-all outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* Time Input */}
            <div>
              <label className="flex items-center text-gray-700 font-semibold mb-3">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Select Time
              </label>
              <input
                type="time"
                className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 transition-all outline-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            {/* Reason Input */}
            <div>
              <label className="flex items-center text-gray-700 font-semibold mb-3">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Reason for Visit
                <span className="ml-2 text-sm font-normal text-gray-500">(Optional)</span>
              </label>
              <textarea
                className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 transition-all outline-none resize-none"
                placeholder="Briefly describe your health concerns..."
                rows="4"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            {/* Summary Box */}
            {date && time && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Appointment Summary</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <p>📅 <strong>Date:</strong> {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p>🕐 <strong>Time:</strong> {time}</p>
                  <p>👨‍⚕️ <strong>Doctor:</strong> Dr. {doctor?.name}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/user/doctors")}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !date || !time}
                className={`
                  flex-1 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg
                  flex items-center justify-center
                  ${loading || !date || !time
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-xl"
                  }
                `}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Booking...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Confirm Booking
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

        {/* Info Note */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <div className="flex">
            <svg className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Please Note:</p>
              <p>Your appointment request will be sent to the doctor for approval. You will be notified once it's confirmed.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default BookAppointment;