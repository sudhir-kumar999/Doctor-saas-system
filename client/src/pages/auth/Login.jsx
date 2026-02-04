import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login({ email, password, role });

      // Role based redirect
      if (user.role === "user") {
        navigate("/user/dashboard");
      } else {
        navigate("/doctor/dashboard");
      }

    } catch (err) {
      // toast already handled in context
      console.log(err)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

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

        <button className="bg-green-500 text-white p-2 w-full rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
