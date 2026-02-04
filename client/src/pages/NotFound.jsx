import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NotFound = () => {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {

    // 🔥 Agar user logged in hai
    if (user) {

      if (user.role === "user") {
        navigate("/user/dashboard");
      }
      else if (user.role === "doctor") {
        navigate("/doctor/dashboard");
      }
      else if (user.role === "admin") {
        navigate("/admin/dashboard");
      }

    } 
    // 🔥 Agar login nahi hai
    else {
      navigate("/signup");
    }

  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-2xl font-bold">
        Redirecting...
      </h2>
    </div>
  );
};

export default NotFound;
