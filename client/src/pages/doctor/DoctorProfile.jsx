import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";
import { updateFeesAPI } from "../../services/userServices"

const DoctorProfile = () => {
  const [fees, setFees] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/auth/me"); // ya jo bhi tumhara profile API hai
      setFees(res.data.user.fees || "");
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!fees || fees <= 0) {
      toast.error("Please enter valid fees");
      return;
    }

    try {
      setLoading(true);

      await updateFeesAPI(fees);

      toast.success("Fees updated successfully");

    } catch (error) {
      toast.error(error.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Update Consultation Fees</h2>

      <form onSubmit={handleUpdate}>
        <label className="block mb-2">Your Fees (₹)</label>

        <input
          type="number"
          value={fees}
          onChange={(e) => setFees(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter consultation fees"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Updating..." : "Update Fees"}
        </button>
      </form>
    </div>
  );
};

export default DoctorProfile;
