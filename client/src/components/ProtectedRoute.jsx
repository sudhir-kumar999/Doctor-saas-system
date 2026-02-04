import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {

  const { user, loading } = useContext(AuthContext);

  if (loading) return <h1>Loading...</h1>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <h1>Unauthorized Access</h1>;
  }

  return children;
};

export default ProtectedRoute;
