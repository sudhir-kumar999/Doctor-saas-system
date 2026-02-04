import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      {/* <nav className="bg-blue-600 p-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">
          Doctor Appointment System
        </h1>

        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded font-semibold"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-green-500 text-white px-4 py-2 rounded font-semibold"
          >
            Signup
          </Link>
        </div>
      </nav> */}

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center mt-16 px-4">

        <h2 className="text-4xl font-bold text-center mb-4">
          Welcome to Online Doctor Consultation
        </h2>

        <p className="text-gray-600 text-center max-w-2xl mb-8">
          This platform allows users to connect with doctors, chat in real-time,
          and book appointments easily. Doctors can manage their patients and
          appointments from their personal dashboard.
        </p>

        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-6 py-3 rounded"
          >
            Get Started
          </Link>

          <Link
            to="/signup"
            className="bg-gray-800 text-white px-6 py-3 rounded"
          >
            Create Account
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 px-8 grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-2">User Dashboard</h3>
          <p className="text-gray-600">
            Users can search doctors, chat with them and book appointments
            easily from their dashboard.
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Doctor Panel</h3>
          <p className="text-gray-600">
            Doctors can manage appointments, view patient details and chat
            with users in real-time.
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Secure System</h3>
          <p className="text-gray-600">
            Authentication and role-based access ensure a secure and smooth
            experience for everyone.
          </p>
        </div>

      </div>

      

    </div>
  );
};

export default Home;
