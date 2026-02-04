import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Use same backend base URL as API, with fallback for local dev
    const SOCKET_URL =
      import.meta.env.VITE_API_URL || "http://localhost:5000";

    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <ChatContext.Provider value={{ socket }}>
      {children}
    </ChatContext.Provider>
  );
};
