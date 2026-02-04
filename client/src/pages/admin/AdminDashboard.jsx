import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h2 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-3 gap-6">

        <Link to="/admin/users" className="bg-white p-6 rounded shadow">
          Manage Users
        </Link>

        <Link to="/admin/doctors" className="bg-white p-6 rounded shadow">
          Manage Doctors
        </Link>

        <Link to="/admin/appointments" className="bg-white p-6 rounded shadow">
          View All Appointments
        </Link>

      </div>
    </div>
  );
};

export default AdminDashboard;
