import User from "../models/User.js";
import jwt from "jsonwebtoken";

// 🔵 SIGNUP FUNCTION
export const signup = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    // 🔥 IMPORTANT – Email ko lowercase me convert
    email = email.toLowerCase().trim();

    // Check existing user
    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Create user with lowercase email
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.json({
      message: "Signup Successful",
      user,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔵 LOGIN FUNCTION
export const login = async (req, res) => {
  try {
    let { email, password, role } = req.body;

    // 🔥 IMPORTANT – Email ko lowercase me convert
    email = email.toLowerCase().trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    // Password check
    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // Role check
    if (user.role !== role) {
      return res.status(400).json({
        message: `You are registered as ${user.role}`,
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login Success",
      user,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔵 LOGOUT FUNCTION
export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({ message: "Logout Success" });
};

// 🔵 GET CURRENT USER
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      user,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
