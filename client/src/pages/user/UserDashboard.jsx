import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const UserDashboard = () => {

  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      {/* <div className="bg-blue-600 text-white p-4 flex justify-between">
        <h2 className="text-xl font-bold">User Dashboard</h2>

        <div>
          <span className="mr-4">
            Welcome, {user?.name}
          </span>

          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div> */}

      {/* Main Layout */}
      <div className="flex">

        {/* Sidebar */}
        <div className="w-1/4 bg-white h-screen p-6 shadow">

          <h3 className="text-lg font-bold mb-4">
            Menu
          </h3>

          <ul className="space-y-4">

            <li>
              <Link
                to="/user/dashboard"
                className="text-blue-600 font-semibold"
              >
                Dashboard Home
              </Link>
            </li>

            <li>
              <Link
                to="/user/doctors"
                className="text-gray-700"
              >
                Doctors List
              </Link>
            </li>

            <li>
              <Link
                to="/user/appointments"
                className="text-gray-700"
              >
                My Appointments
              </Link>
            </li>

            <li>
              <Link
                to="/user/chat"
                className="text-gray-700"
              >
                Chat With Doctor
              </Link>
            </li>

          </ul>

        </div>

        {/* Content Area */}
        <div className="w-3/4 p-8">

          <h2 className="text-2xl font-bold mb-6">
            Dashboard Overview
          </h2>

          {/* User Info Card */}
          <div className="bg-white p-6 rounded shadow mb-6">

            <h3 className="text-xl font-bold mb-2">
              Your Profile
            </h3>

            <p><b>Name:</b> {user?.name}</p>
            <p><b>Email:</b> {user?.email}</p>
            <p><b>Role:</b> {user?.role}</p>

          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-6">

            <Link
              to="/user/doctors"
              className="bg-blue-500 text-white p-6 rounded text-center"
            >
              Find Doctors
            </Link>

            <Link
              to="/user/appointments"
              className="bg-green-500 text-white p-6 rounded text-center"
            >
              View Appointments
            </Link>

            <Link
              to="/user/chat"
              className="bg-purple-500 text-white p-6 rounded text-center"
            >
              Start Chat
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 text-white p-6 rounded"
            >
              Logout
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
