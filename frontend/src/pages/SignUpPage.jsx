import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaImage } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    profilePic: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  if (e.target.name === "profilePic") {
    const file = e.target.files[0];

    // ✅ Strict check: only allow image files
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, profilePic: file });
      setPreview(URL.createObjectURL(file));
    } else {
    toast.error("Only image files are allowed (JPG, PNG, etc.)");
      e.target.value = ""; // reset the file input
    }
  } else {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) payload.append(key, value);
    });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, {
  method: "POST",
  body: payload,
});


      const data = await res.json();
      if (res.ok) {
        navigate("/login");
      } else {
        setMessage(data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-rose-100 to-rose-300 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg space-y-6 border border-gray-100"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-extrabold text-center text-[#800000] tracking-tight">
          Create an Account
        </h2>

        {/* Name */}
        <label className="block">
          <div className="flex items-center border border-gray-300 rounded-md p-3 bg-gray-50 shadow-sm">
            <FaUser className="text-[#800000] mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              autoComplete="name"
              required
              className="w-full bg-transparent outline-none text-gray-800"
              onChange={handleChange}
            />
          </div>
        </label>

        {/* Email */}
        <label className="block">
          <div className="flex items-center border border-gray-300 rounded-md p-3 bg-gray-50 shadow-sm">
            <FaEnvelope className="text-[#800000] mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              required
              className="w-full bg-transparent outline-none text-gray-800"
              onChange={handleChange}
            />
          </div>
        </label>

        {/* Phone */}
        <label className="block">
          <div className="flex items-center border border-gray-300 rounded-md p-3 bg-gray-50 shadow-sm">
            <FaPhone className="text-[#800000] mr-3" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              maxLength={10}
              autoComplete="tel"
              className="w-full bg-transparent outline-none text-gray-800"
              onChange={handleChange}
            />
          </div>
        </label>

        {/* Password */}
        <label className="block">
          <div className="flex items-center border border-gray-300 rounded-md p-3 bg-gray-50 shadow-sm">
            <FaLock className="text-[#800000] mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              required
              className="w-full bg-transparent outline-none text-gray-800"
              onChange={handleChange}
            />
          </div>
        </label>

        {/* Profile Pic */}
        <label className="block">
          <div className="flex items-center border border-gray-300 rounded-md p-3 bg-gray-50 shadow-sm">
            <FaImage className="text-[#800000] mr-3" />
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              className="w-full  text-sm text-gray-600"
              onChange={handleChange}
            />
          </div>
        </label>

        {/* Image Preview */}
        {preview && (
          <div className="flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#800000] shadow-md"
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#800000] text-white font-semibold py-3 rounded-lg hover:bg-[#990000] transition duration-300"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Link to Login */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#800000] font-medium hover:underline">
            Login
          </Link>
        </p>

        {message && <p className="text-center text-sm text-red-600">{message}</p>}
      </form>
    </div>
  );
};

export default Signup;
