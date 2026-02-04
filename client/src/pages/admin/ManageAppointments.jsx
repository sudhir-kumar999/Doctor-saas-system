import { useEffect, useState } from "react";
import api from "../../api/api";

const ManageAppointments = () => {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const res = await api.get("/api/admin/appointments");
    setAppointments(res.data.appointments);
  };

  return (
    <div className="p-8">

      <h2 className="text-2xl font-bold mb-4">
        All Appointments
      </h2>

      {appointments.map((a) => (
        <div key={a._id} className="bg-white p-4 mb-2">
          <p>User: {a.userId?.name}</p>
          <p>Doctor: {a.doctorId?.name}</p>
          <p>Date: {a.date}</p>
          <p>Time: {a.time}</p>
        </div>
      ))}
    </div>
  );
};

export default ManageAppointments;
