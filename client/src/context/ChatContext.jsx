import { createContext, useRef } from "react";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

  const socketRef = useRef(null);

  if (!socketRef.current) {
    socketRef.current = io("http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket"],
    });
  }

  return (
    <ChatContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </ChatContext.Provider>
  );
};
