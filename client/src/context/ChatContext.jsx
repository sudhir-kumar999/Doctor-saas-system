import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

  const [socket, setSocket] = useState(null);

  useEffect(() => {

    const newSocket = io("https://doctor-saas-system.onrender.com", {
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
