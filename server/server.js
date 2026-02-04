import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "../server/src/config/db.js";
import dotenv from "dotenv";
import Chat from "./src/models/Chat.js";

dotenv.config();
connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://doctor-saas-system.onrender.com",
    credentials: true,
  },
});

io.on("connection", (socket) => {

  console.log("User Connected:", socket.id);

  socket.on("joinRoom", (room) => {
    if (!room) return;

    socket.join(room);
    console.log(`Socket ${socket.id} joined room: ${room}`);
  });

  socket.on("sendMessage", async (data) => {

    try {
      // Basic validation
      if (!data.room || !data.senderId || !data.receiverId || !data.message) {
        return;
      }

      // Save in database
      await Chat.create({
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message,
      });

      console.log(
        `Message from ${data.senderId} to ${data.receiverId} in room ${data.room}`
      );

      // Emit to specific room only
      io.to(data.room).emit("receiveMessage", data);

    } catch (err) {
      console.log("Chat Save Error:", err.message);
    }

  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });

});

server.listen(5000, () => {
  console.log("Server running with Socket.io on port 5000");
});
