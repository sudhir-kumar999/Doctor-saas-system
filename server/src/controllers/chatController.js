import Chat from "../models/Chat.js";

// Save message to DB
export const saveMessage = async (data) => {
  await Chat.create({
    senderId: data.senderId,
    receiverId: data.receiverId,
    message: data.message,
  });
};

// Get previous messages
export const getMessages = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const messages = await Chat.find({
      $or: [
        { senderId: req.user.id, receiverId: doctorId },
        { senderId: doctorId, receiverId: req.user.id },
      ],
    }).sort({ createdAt: 1 });

    res.json({ messages });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Get list of patients who chatted with doctor
export const getDoctorChatList = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const chats = await Chat.find({
      receiverId: doctorId
    }).populate("senderId", "name email");

    // Unique patients extract karo
    const uniquePatients = [];

    chats.forEach((chat) => {
      const exists = uniquePatients.find(
        (p) => p._id.toString() === chat.senderId._id.toString()
      );

      if (!exists) {
        uniquePatients.push(chat.senderId);
      }
    });

    res.json({
      patients: uniquePatients,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
