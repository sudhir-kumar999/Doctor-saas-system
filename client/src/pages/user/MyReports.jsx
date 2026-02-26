import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { AuthContext } from "../../context/AuthContext";

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user._id;

  useEffect(() => {
    const fetchReports = async () => {
      const res = await api.get(`/api/report/allreport/${userId}`);
      setReports(res.data);
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen mt-15 bg-gray-50 px-4 sm:px-8 py-10">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          My Medical Reports
        </h1>
        <p className="text-gray-500 mt-2">
          View and manage your previous AI generated reports
        </p>
      </div>

      {/* Reports Grid */}
      <div className="max-w-6xl mx-auto">
        {reports.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <p className="text-gray-500 text-lg">
              No reports found. Generate your first report.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <div
                key={report._id}
                onClick={() => navigate(`/report/${report._id}`)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 cursor-pointer border border-gray-100 hover:-translate-y-1"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg text-gray-800 truncate">
                    {report.name}
                  </h2>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      report.severity === "Severe"
                        ? "bg-red-100 text-red-600"
                        : report.severity === "Moderate"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {report.severity}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-2">
                  📅 {new Date(report.createdAt).toLocaleDateString()}
                </p>

                <p className="text-sm text-gray-400 line-clamp-2">
                  Click to view full medical report details
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
