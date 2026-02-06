import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "doctor", "admin"],
    default: "user",
  },
   fees: {
    type: Number,
    default: 0,
  },

  specialization: {
    type: String,
  },

  experience: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
