import { useEffect, useState, useContext, useRef } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Common room id for doctor & patient
  const getRoomId = (patientId) => {
    if (!user || !patientId) return null;
    return [user._id, patientId].sort().join("_");
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Socket listener
  useEffect(() => {

    if (!socket || !selectedPatient) return;

    const roomId = getRoomId(selectedPatient._id);

    socket.emit("joinRoom", roomId);

    const handleReceive = (msg) => {
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
    try {
      const res = await api.get("/api/chat/doctor/list");
      setPatients(res.data.patients);
    } catch (err) {
      console.log("Error fetching patients");
    }
  };

  const openChat = async (patient) => {
    setSelectedPatient(patient);

    try {
      const res = await api.get(`/api/chat/${patient._id}`);
      setMessages(res.data.messages);
      
      const roomId = getRoomId(patient._id);
      if (socket && roomId) {
        socket.emit("joinRoom", roomId);
      }
    } catch (err) {
      console.log("Error loading messages");
    }
  };

  const sendMessage = () => {

    if (!text.trim() || !selectedPatient) return;

    const roomId = getRoomId(selectedPatient._id);

    if (!roomId) return;

    const data = {
      room: roomId,
      message: text,
      senderId: user._id,
      receiverId: selectedPatient._id,
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

  const filteredPatients = patients.filter(patient =>
    patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col lg:flex-row pt-16 lg:pt-0">

      {/* LEFT SIDE – PATIENT LIST */}
      <div className="w-full lg:w-1/3 bg-white border-r border-gray-200 flex flex-col max-h-[40vh] lg:max-h-none">

        {/* Patients Header */}
        <div className="p-4 lg:p-6 border-b border-gray-200 bg-gradient-to-r from-green-500 to-emerald-600">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-3">
            Patient Messages
          </h2>
          
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg border-2 border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 transition-all"
            />
            <svg
              className="w-5 h-5 text-white absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Patient List */}
        <div className="flex-1 overflow-y-auto">
          {filteredPatients.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-gray-600">
                {searchTerm ? "No patients found" : "No patients messaged yet"}
              </p>
            </div>
          ) : (
            <div className="p-2">
              {filteredPatients.map((patient) => (
                <div
                  key={patient._id}
                  onClick={() => openChat(patient)}
                  className={`
                    p-4 mb-2 rounded-xl cursor-pointer transition-all
                    ${selectedPatient?._id === patient._id
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-bold
                      ${selectedPatient?._id === patient._id
                        ? "bg-white text-green-600"
                        : "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                      }
                    `}>
                      {patient.name?.charAt(0).toUpperCase() || "P"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate">{patient.name}</p>
                      <p className={`text-sm truncate ${
                        selectedPatient?._id === patient._id ? "text-green-50" : "text-gray-600"
                      }`}>
                        {patient.email}
                      </p>
                    </div>
                    {selectedPatient?._id === patient._id && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* RIGHT SIDE – CHAT BOX */}
      <div className="flex-1 flex flex-col bg-white lg:bg-gray-50">

        {!selectedPatient ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Chat Selected
            </h3>
            <p className="text-gray-600">
              Select a patient from the list to start chatting
            </p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 lg:p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">
                    {selectedPatient.name?.charAt(0).toUpperCase() || "P"}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {selectedPatient.name}
                  </h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">{selectedPatient.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">

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
                    Start the conversation with {selectedPatient.name}
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
                                {selectedPatient.name?.charAt(0).toUpperCase() || "P"}
                              </span>
                            </div>
                          )}
                          <div className="flex flex-col">
                            <div
                              className={`
                                px-4 py-3 rounded-2xl shadow-md
                                ${isMyMessage
                                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-br-sm"
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
            <div className="bg-white border-t border-gray-200 p-4 lg:p-6">
              <div className="flex items-end space-x-3">
                
                <div className="flex-1 relative">
                  <textarea
                    className="w-full border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl px-4 py-3 pr-12 resize-none transition-all outline-none"
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
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:shadow-xl"
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
                Press Enter to send • End-to-end encrypted
              </p>
            </div>

          </>
        )}

      </div>

    </div>
  );
};

export default DoctorChat;