import { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import ReactMarkdown from "react-markdown";

export default function SingleReport() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchReport = async () => {
      const res = await api.get(`/api/report/single/${id}`);
      setReport(res.data);
    };

    fetchReport();
  }, [id]);

  if (!report) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Full Medical Report</h1>

      <div className="border p-4 whitespace-pre-line">
        <ReactMarkdown>
    {report.aiReport}
  </ReactMarkdown>
      </div>
      <div className="flex justify-center mt-10 border rounded-xl bg-blue-500 text-white font-bold p-3 ">
      <button onClick={()=>navigate("/user/doctors")}>Book Appointment</button>
      </div>
    </div>
  );
}
