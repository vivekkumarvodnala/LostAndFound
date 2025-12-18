import User from "../models/User.js";
import bcrypt from "bcryptjs";

import generateToken from "../utils/generateTokenAndCookie.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndCookie.js";


export const register = async (req, res) => {
  try {
    console.log("BODY:", JSON.stringify(req.body, null, 2));
console.log("FILE:", req.file);


const { name, email, phone, password } = req.body;


const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({
  name,
  email,
  phone,
  password: hashedPassword,
  profilePic: req.file? `/uploads/${req.file.filename}`:"",
});

await newUser.save();
    console.log("User registered:", newUser);

    res.status(201).json({ message: "User registered", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Login User
export const login = async (req, res, next) => {
  try {
    console.log("Login request body:", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Logout User
export const logout = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true,secure: true,sameSite: "None",expires: new Date(0), });
  res.status(200).json({ message: "Logged out" });
};

// Get Current User
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};