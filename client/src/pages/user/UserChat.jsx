import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const UserChat = () => {

  const { doctorId } = useParams();
  const { socket } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // 🔥 FIX 1 – Fetch old messages on page load
  useEffect(() => {
    fetchMessages();
  }, [doctorId]);

  useEffect(() => {

    if (!socket) return;

    const roomId = `${doctorId}`;

    socket.emit("joinRoom", roomId);

    // Remove old listener first
    socket.off("receiveMessage");

    socket.on("receiveMessage", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };

  }, [doctorId, socket]);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/api/chat/${doctorId}`);
      setMessages(res.data.messages);
    } catch (err) {
      console.log("Error fetching messages");
    }
  };

const sendMessage = () => {

  if (!text.trim()) return;

  const data = {
    room: doctorId,
    message: text,
    senderId: user._id,
    receiverId: doctorId,
  };

  socket.emit("sendMessage", data);

  // 🔥 REMOVE THIS LINE
  // setMessages(prev => [...prev, data]);

  setText("");
};


  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h2 className="text-xl font-bold mb-4">
        Chat with Doctor
      </h2>

      <div className="bg-white h-[70vh] p-4 overflow-y-scroll rounded shadow mb-4">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.senderId === user._id ? "text-right" : "text-left"
            }`}
          >
            <span className="inline-block bg-blue-100 px-3 py-1 rounded">
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
          className="bg-blue-500 text-white px-4 rounded"
        >
          Send
        </button>
      </div>

    </div>
  );
};

export default UserChat;
