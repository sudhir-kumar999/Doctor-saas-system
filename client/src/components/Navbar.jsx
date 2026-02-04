import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4 flex justify-between text-white">

      <Link to="/" className="font-bold text-xl">
        Doctor App
      </Link>

      <div>
        {user ? (
          <>
            <span className="mr-4">
              Welcome, {user.name}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
