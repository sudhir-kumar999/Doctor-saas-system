import { createContext, useState, useEffect } from "react";
import api from "../api/api";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Check login status on page reload
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await api.get("/api/auth/me");
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Login Function
  const login = async (data) => {
    try {
      const res = await api.post("/api/auth/login", data);
      setUser(res.data.user);
      // Save token for Authorization header (helps when cookies are blocked)
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
      }
      toast.success("Login Successful");
      return res.data.user;
    } catch (err) {
      toast.error(err.message || "Login Failed");
      throw err;
    }
  };

  // 🔹 Logout Function
  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      localStorage.removeItem("authToken");
      toast.success("Logged Out Successfully");
    } catch (err) {
      toast.error("Logout Failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
