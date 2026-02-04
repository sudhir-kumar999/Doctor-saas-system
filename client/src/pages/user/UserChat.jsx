import { useEffect, useState, useContext, useRef } from "react";
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
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Common room id for doctor & patient
  const getRoomId = () => {
    if (!user || !doctorId) return null;
    return [user._id, doctorId].sort().join("_");
  };

  // Fetch old messages on page load
  useEffect(() => {
    fetchMessages();
    fetchDoctorInfo();
  }, [doctorId]);

  useEffect(() => {

    const roomId = getRoomId();

    if (!socket || !roomId) return;

    socket.emit("joinRoom", roomId);

    // Remove old listener first
    socket.off("receiveMessage");

    socket.on("receiveMessage", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };

  }, [doctorId, socket, user]);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/api/chat/${doctorId}`);
      setMessages(res.data.messages);
    } catch (err) {
      console.log("Error fetching messages");
    }
  };

  const fetchDoctorInfo = async () => {
    try {
      const res = await api.get(`/api/doctors`);
      const doctor = res.data.doctors.find(d => d._id === doctorId);
      setDoctorInfo(doctor);
    } catch (err) {
      console.log("Error fetching doctor info");
    }
  };

  const sendMessage = () => {

    const roomId = getRoomId();

    if (!text.trim() || !roomId) return;

    const data = {
      room: roomId,
      message: text,
      senderId: user._id,
      receiverId: doctorId,
    };

    socket.emit("sendMessage", data);
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 lg:pt-8">
      
      <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] lg:h-[calc(100vh-4rem)] flex flex-col">

        {/* Chat Header */}
        <div className="bg-white rounded-t-2xl lg:rounded-2xl shadow-lg p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">
                {doctorInfo?.name?.charAt(0).toUpperCase() || "D"}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                Dr. {doctorInfo?.name || "Doctor"}
              </h2>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Online</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium text-blue-600">Secure Chat</span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 bg-white lg:bg-gray-50 overflow-y-auto p-4 lg:p-6 space-y-4">

          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No messages yet
              </h3>
              <p className="text-gray-600">
                Start the conversation with Dr. {doctorInfo?.name}
              </p>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => {
                const isMyMessage = msg.senderId === user._id;
                return (
                  <div
                    key={index}
                    className={`flex ${isMyMessage ? "justify-end" : "justify-start"} animate-fade-in`}
                  >
                    <div className={`flex items-end space-x-2 max-w-[85%] lg:max-w-[70%]`}>
                      {!isMyMessage && (
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                          <span className="text-white text-xs font-bold">
                            {doctorInfo?.name?.charAt(0).toUpperCase() || "D"}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <div
                          className={`
                            px-4 py-3 rounded-2xl shadow-md
                            ${isMyMessage
                              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-sm"
                              : "bg-white text-gray-800 rounded-bl-sm border border-gray-200"
                            }
                          `}
                        >
                          <p className="text-sm lg:text-base break-words whitespace-pre-wrap">
                            {msg.message}
                          </p>
                        </div>
                        <span
                          className={`text-xs text-gray-500 mt-1 ${
                            isMyMessage ? "text-right" : "text-left"
                          }`}
                        >
                          {formatTime(msg.timestamp || msg.createdAt)}
                        </span>
                      </div>
                      {isMyMessage && (
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                          <span className="text-white text-xs font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </>
          )}

        </div>

        {/* Input Area */}
        <div className="bg-white rounded-b-2xl lg:rounded-2xl shadow-lg p-4 lg:p-6 border-t border-gray-200">
          <div className="flex items-end space-x-3">
            
            <div className="flex-1 relative">
              <textarea
                className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 pr-12 resize-none transition-all outline-none"
                placeholder="Type your message..."
                rows="1"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  minHeight: '48px',
                  maxHeight: '120px',
                  overflowY: text.length > 100 ? 'auto' : 'hidden'
                }}
              />
              <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                {text.length > 0 && `${text.length}`}
              </div>
            </div>

            <button
              onClick={sendMessage}
              disabled={!text.trim()}
              className={`
                p-3 lg:p-4 rounded-xl font-semibold transition-all shadow-lg
                flex items-center justify-center
                ${text.trim()
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white hover:shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>

          </div>

          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send • Your messages are end-to-end encrypted
          </p>
        </div>

      </div>

    </div>
  );
};

export default UserChat;