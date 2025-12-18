import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { User, Phone, Upload } from "lucide-react";
import toast from "react-hot-toast";
const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (phone) formData.append("phone", phone);
    if (profilePic) formData.append("profilePic", profilePic);

    try {
      await axiosInstance.put("/user/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd] dark:bg-[#111] px-4 py-8">
      <div className="w-full max-w-md bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#800000] dark:text-yellow-400">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] px-3 py-2">
              <User className="w-5 h-5 text-[#800000] dark:text-yellow-400" />
              <input
                type="text"
                className="w-full bg-transparent focus:outline-none text-black dark:text-white"
                placeholder="Enter new name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] px-3 py-2">
              <Phone className="w-5 h-5 text-[#800000] dark:text-yellow-400" />
              <input
                type="tel"
                className="w-full bg-transparent focus:outline-none text-black dark:text-white"
                placeholder="Enter new phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Profile Picture
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] px-3 py-2">
              <Upload className="w-5 h-5 text-[#800000] dark:text-yellow-400" />
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-500 dark:text-gray-300 bg-transparent"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-2 rounded-lg bg-[#800000] hover:bg-[#660000] text-white dark:bg-yellow-400 dark:hover:bg-yellow-300 dark:text-black font-semibold transition duration-200"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
