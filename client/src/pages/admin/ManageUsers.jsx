import { useEffect, useState } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";

const ManageUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/api/admin/users");
    setUsers(res.data.users);
  };

  const deleteUser = async (id) => {
    await api.delete(`/api/admin/delete/${id}`);
    toast.success("User Deleted");
    fetchUsers();
  };

  return (
    <div className="p-8">

      <h2 className="text-2xl font-bold mb-4">
        Manage Users
      </h2>

      {users.map((u) => (
        <div key={u._id} className="bg-white p-4 mb-2 flex justify-between">
          <div>
            {u.name} - {u.email}
          </div>

          <button
            onClick={() => deleteUser(u._id)}
            className="bg-red-500 text-white px-3"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;
