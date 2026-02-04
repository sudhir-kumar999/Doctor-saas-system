import { useEffect, useState, useContext } from "react";
import api from "../../api/api";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const DoctorChat = () => {

  const { socket } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  // 🔥 SINGLE PLACE FOR SOCKET LISTENER
 useEffect(() => {

  if (!socket || !selectedPatient) return;

  const roomId = selectedPatient._id;

  socket.emit("joinRoom", roomId);

  const handleReceive = (msg) => {

    // Only add message if it belongs to current patient
    if (
      msg.senderId === selectedPatient._id ||
      msg.receiverId === selectedPatient._id
    ) {
      setMessages(prev => [...prev, msg]);
    }
  };

  socket.off("receiveMessage");
  socket.on("receiveMessage", handleReceive);

  return () => {
    socket.off("receiveMessage", handleReceive);
  };

}, [socket, selectedPatient]);


  const fetchPatients = async () => {
    const res = await api.get("/api/chat/doctor/list");
    setPatients(res.data.patients);
  };

  const openChat = async (patient) => {

    setSelectedPatient(patient);

    const res = await api.get(`/api/chat/${patient._id}`);
    setMessages(res.data.messages);

    socket.emit("joinRoom", patient._id);
  };

const sendMessage = () => {

  if (!text.trim() || !selectedPatient) return;

  const data = {
    room: selectedPatient._id,
    message: text,
    senderId: user._id,
    receiverId: selectedPatient._id,
  };

  socket.emit("sendMessage", data);

  setText("");
};

  return (
    <div className="flex h-screen">

      {/* LEFT SIDE – PATIENT LIST */}
      <div className="w-1/3 bg-gray-100 p-4 border-r">

        <h2 className="text-xl font-bold mb-4">
          Patients
        </h2>

        {patients.length === 0 && (
          <p>No patients messaged yet</p>
        )}

        {patients.map((patient) => (
          <div
            key={patient._id}
            className="p-3 bg-white mb-2 rounded cursor-pointer"
            onClick={() => openChat(patient)}
          >
            <p className="font-bold">{patient.name}</p>
            <p className="text-sm text-gray-600">
              {patient.email}
            </p>
          </div>
        ))}

      </div>

      {/* RIGHT SIDE – CHAT BOX */}
      <div className="w-2/3 p-6">

        {!selectedPatient ? (
          <h3>Select a patient to start chat</h3>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">
              Chat with {selectedPatient.name}
            </h2>

            <div className="bg-white h-80 p-4 overflow-y-scroll mb-4 rounded">

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    msg.senderId === user._id
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  <span className="bg-green-100 px-3 py-1 rounded">
                    {msg.message}
                  </span>
                </div>
              ))}

            </div>

            <div className="flex gap-2">
              <input
                className="border p-2 flex-1 rounded"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <button
                onClick={sendMessage}
                className="bg-green-500 text-white px-4 rounded"
              >
                Send
              </button>
            </div>
          </>
        )}

      </div>

    </div>
  );
};

export default DoctorChat;
