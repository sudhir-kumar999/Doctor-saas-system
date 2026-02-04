import { useEffect, useState } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";

const ManageDoctors = () => {

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const res = await api.get("/api/admin/doctors");
    setDoctors(res.data.doctors);
  };

  const deleteDoctor = async (id) => {
    await api.delete(`/api/admin/delete/${id}`);
    toast.success("Doctor Deleted");
    fetchDoctors();
  };

  return (
    <div className="p-8">

      <h2 className="text-2xl font-bold mb-4">
        Manage Doctors
      </h2>

      {doctors.map((d) => (
        <div key={d._id} className="bg-white p-4 mb-2 flex justify-between">
          <div>
            {d.name} - {d.email}
          </div>

          <button
            onClick={() => deleteDoctor(d._id)}
            className="bg-red-500 text-white px-3"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageDoctors;
