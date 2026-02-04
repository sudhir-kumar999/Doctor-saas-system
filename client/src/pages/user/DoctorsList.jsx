import { useEffect, useState } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const DoctorsList = () => {

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/api/doctors");
      setDoctors(res.data.doctors);
    } catch (err) {
      toast.error("Failed to load doctors");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="text-center mt-10">Loading Doctors...</h2>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold mb-6">
        Available Doctors
      </h2>

      {doctors.length === 0 ? (
        <p>No Doctors Available</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white p-6 rounded shadow"
            >
              <h3 className="text-xl font-bold">
                {doctor.name}
              </h3>

              <p className="text-gray-600">
                {doctor.email}
              </p>

              <div className="mt-4 space-x-2">

                <Link
                  to={`/user/book/${doctor._id}`}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Book Appointment
                </Link>

                <Link
                  to={`/user/chat/${doctor._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Chat
                </Link>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default DoctorsList;
