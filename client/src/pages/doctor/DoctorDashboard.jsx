import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-green-600 text-white p-4 flex justify-between">
        <h2 className="text-xl font-bold">Doctor Dashboard</h2>

        <div>
          <span className="mr-4">Welcome, Dr. {user?.name}</span>
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white h-screen p-6 shadow">
          <h3 className="text-lg font-bold mb-4">Menu</h3>

          <ul className="space-y-4">
            <li>
              <Link to="/doctor/dashboard" className="text-green-600">
                Dashboard Home
              </Link>
            </li>

            <li>
              <Link to="/doctor/appointments" className="text-gray-700">
                My Appointments
              </Link>
            </li>

            <li>
              <Link to="/doctor/chat" className="text-gray-700">
                Chat with Patients
              </Link>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="w-3/4 p-8">
          <h2 className="text-2xl font-bold mb-6">Welcome Doctor Panel</h2>

          <div className="bg-white p-6 rounded shadow">
            <p>
              <b>Name:</b> {user?.name}
            </p>
            <p>
              <b>Email:</b> {user?.email}
            </p>
            <p>
              <b>Role:</b> {user?.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
