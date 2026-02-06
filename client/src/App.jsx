import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import UserDashboard from "./pages/user/UserDashboard";
import DoctorsList from "./pages/user/DoctorsList";
import BookAppointment from "./pages/user/BookAppointment";
import UserChat from "./pages/user/UserChat";
import MyAppointments from "./pages/user/MyAppointments";

import ProtectedRoute from "./components/ProtectedRoute";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import Appointments from "./pages/doctor/Appointments";
import DoctorChat from "./pages/doctor/DoctorChat";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageDoctors from "./pages/admin/ManageDoctors";
import ManageAppointments from "./pages/admin/ManageAppointments";
import NotFound from "./pages/NotFound";
import DoctorProfile from "./pages/doctor/DoctorProfile";

function App() {
  return (
    <div>
      <ToastContainer position="top-right" />
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected User Routes */}

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/doctors"
          element={
            <ProtectedRoute role="user">
              <DoctorsList />
            </ProtectedRoute>
          }
        />

        {/* Book Appointment for specific doctor */}
        <Route
          path="/user/book/:doctorId"
          element={
            <ProtectedRoute role="user">
              <BookAppointment />
            </ProtectedRoute>
          }
        />

        {/* My Appointments List */}
        <Route
          path="/user/appointments"
          element={
            <ProtectedRoute role="user">
              <MyAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/chat/:doctorId"
          element={
            <ProtectedRoute role="user">
              <UserChat />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/user/chat"
          element={
            <ProtectedRoute role="user">
              <UserChat />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute role="doctor">
              <Appointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/profile"
          element={
            <ProtectedRoute role="doctor">
              <DoctorProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/chat"
          element={
            <ProtectedRoute role="doctor">
              <DoctorChat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute role="admin">
              <ManageDoctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute role="admin">
              <ManageAppointments />
            </ProtectedRoute>
          }
        />
        {/* 🔥 MOST IMPORTANT – CATCH ALL ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
