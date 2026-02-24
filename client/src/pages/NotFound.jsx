import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NotFound = () => {

  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {

    // ✅ wait until auth check completes
    if (loading) return;

    // 🔥 Logged in user
    if (user) {
      if (user.role === "user") {
        navigate("/user/dashboard", { replace: true });
      } 
      else if (user.role === "doctor") {
        navigate("/doctor/dashboard", { replace: true });
      } 
      else if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      }
    } 
    // 🔥 Not logged in → Home page
    else {
      navigate("/", { replace: true });
    }

  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-2xl font-bold">
        Redirecting...
      </h2>
    </div>
  );
};

export default NotFound;