import User from "../models/User.js";
import path from "path";

// @desc    Update profile
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const { name, phone } = req.body;
    user.name = name || user.name;
    user.phone = phone || user.phone;

    // If a file was uploaded, update the profilePic field
    if (req.file) {
      const fileName = req.file.filename;
      // Assuming you're serving static files from 'uploads' folder
      user.profilePic = `/uploads/${fileName}`;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      message: "Profile updated",
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        profilePic: updatedUser.profilePic,
      },
    });
  } catch (err) {
    next(err);
  }
};


// @desc    Get user by ID
export const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
