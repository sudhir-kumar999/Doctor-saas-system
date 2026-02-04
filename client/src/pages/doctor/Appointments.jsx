import { useEffect, useState } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";

const Appointments = () => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/api/appointment/doctor");
      setAppointments(res.data.appointments);
    } catch (err) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold mb-6">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p>No Appointments Found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {appointments.map((item) => (
            <div key={item._id} className="bg-white p-6 rounded shadow">
              <h3 className="font-bold">
                Patient: {item.userId?.name}
              </h3>

              <p>Date: {item.date}</p>
              <p>Time: {item.time}</p>
              <p>Status: {item.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
