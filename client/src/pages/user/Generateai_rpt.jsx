import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api";

const Generateai_rpt=()=> {

    const {user}=useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    symptoms: [],
    duration: "",
    severity: "",
    description: "",
  });

//   const [availableSymptoms, setAvailableSymptoms] = useState([]);
  const [customSymptom, setCustomSymptom] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");

  // 🔹 Fetch symptoms from backend
//   useEffect(() => {
//     const fetchSymptoms = async () => {
//       try {
//         const res = await fetch("http://localhost:8080/api/symptoms");
//         const data = await res.json();
//         setAvailableSymptoms(data);
//       } catch (err) {
//         console.log("Error fetching symptoms");
//       }
//     };

//     fetchSymptoms();
//   }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
//   console.log(user._id)

 


  // 🔥 Add Custom Symptom
  const addCustomSymptom = () => {
    if (
      customSymptom.trim() !== "" &&
      !formData.symptoms.includes(customSymptom)
    ) {
      setFormData({
        ...formData,
        symptoms: [...formData.symptoms, customSymptom],
      });
      setCustomSymptom("");
    }
  };

  const removeSymptom = (symptom) => {
    setFormData({
      ...formData,
      symptoms: formData.symptoms.filter((s) => s !== symptom),
    });
  };

  const dataToSend = {
    ...formData,
    userId: user._id, // 🔥 yaha se bhej rahe ho
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     console.log(dataToSend)
//     const response = await api.post("/api/report/generate-report",dataToSend)
        

// console.log(response)
//     // const data = await response.json();
//     // setReport(response.data.message);
//     setLoading(false);
//   };

    import toast from "react-hot-toast";

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    console.log("Sending Data:", dataToSend);

    const response = await api.post(
      "/api/report/generate-report",
      dataToSend
    );

    console.log("Server Response:", response);

    toast.success("Report generated successfully 🎉");

    // agar redirect karna ho
    // navigate("/my-reports");

  } catch (error) {
    console.error("Error generating report:", error);

    toast.error(
      error?.response?.data?.message || "Failed to generate report ❌"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          🏥 AI Medical Report Generator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          {/* 🔥 Dynamic Symptoms */}
          <div>
            <h3 className="font-semibold mb-2">Select Symptoms:</h3>

            {/* <div className="grid grid-cols-2 gap-2">
              {availableSymptoms.map((symptom) => (
                <label key={symptom} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.symptoms.includes(symptom)}
                    onChange={() => handleSymptomToggle(symptom)}
                  />
                  {symptom}
                </label>
              ))}
            </div> */}

            {/* 🔥 Custom Symptom Input */}
            <div className="flex mt-4 gap-2">
              <input
                type="text"
                placeholder="Add custom symptom..."
                className="flex-1 p-2 border rounded-lg"
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
              />
              <button
                type="button"
                onClick={addCustomSymptom}
                className="bg-green-500 text-white px-4 rounded-lg"
              >
                Add
              </button>
            </div>

            {/* 🔥 Selected Symptoms */}
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.symptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="bg-blue-100 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {symptom}
                  <button
                    type="button"
                    onClick={() => removeSymptom(symptom)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 3 days)"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            required
          />

          <select
            name="severity"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            required
          >
            <option value="">Select Severity</option>
            <option>Mild</option>
            <option>Moderate</option>
            <option>Severe</option>
          </select>

          <textarea
            name="description"
            placeholder="Additional Description..."
            className="w-full p-3 border rounded-lg"
            rows="4"
            onChange={handleChange}
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            {loading ? "Generating..." : "Generate AI Report"}
          </button>
        </form>

        {report && (
          <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
            <h2 className="font-bold mb-2">AI Generated Report:</h2>
            <p>{report}</p>
          </div>
        )}
      </div>
    </div>
  );
}


export default Generateai_rpt