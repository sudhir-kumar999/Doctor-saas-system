import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api.js";

const Signup = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/auth/signup", {
        name,
        email,
        password,
        role
      });

      toast.success("Signup Successful!");

      // Redirect to Login page after 1 second
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      toast.error(err.message || "Signup Failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >

        <h2 className="text-2xl font-bold mb-4 text-center">
          Signup
        </h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="doctor">Doctor</option>
        </select>

        <button className="bg-blue-500 text-white p-2 w-full rounded">
          Signup
        </button>

      </form>
    </div>
  );
};

export default Signup;
