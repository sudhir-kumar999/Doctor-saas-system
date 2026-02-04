import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {

  const { user, loading } = useContext(AuthContext);

  // 🔄 Loading state handle
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-bold">Loading...</h2>
      </div>
    );
  }

  // ❌ Agar user login nahi hai
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 🔐 Agar role match nahi ho raha
  if (role && user.role !== role) {

    // 🔥 Smart Redirect based on role
    if (user.role === "user") {
      return <Navigate to="/user/dashboard" />;
    }

    if (user.role === "doctor") {
      return <Navigate to="/doctor/dashboard" />;
    }

    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }
  }

  // ✅ Sab sahi hai – allowed
  return children;
};

export default ProtectedRoute;
