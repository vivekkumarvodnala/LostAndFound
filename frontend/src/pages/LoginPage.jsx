import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const LoginPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        await queryClient.invalidateQueries(["me"]);
        navigate("/");
      } else {
        setMessage(data.message || "Invalid credentials");
      }
    } catch (err) {
      setMessage("Something went wrong. Try again.");
      console.error("❌ Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#1c1c1c] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#2c2c2c] p-8 rounded-2xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-[#800000] dark:text-[#FFD700]">
          Login
        </h2>

        {/* Email */}
        <div className="flex items-center border rounded-lg p-3 bg-gray-50 dark:bg-[#3a3a3a]">
          <FaEnvelope className="text-[#800000] dark:text-[#FFD700] mr-3" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
            className="w-full bg-transparent outline-none text-black dark:text-black placeholder-gray-500 dark:placeholder-gray-400"
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="flex items-center border rounded-lg p-3 bg-gray-50 dark:bg-[#3a3a3a]">
          <FaLock className="text-[#800000] dark:text-[#FFD700] mr-3" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            className="w-full bg-transparent outline-none text-black dark:text-black placeholder-gray-500 dark:placeholder-gray-400"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#800000] hover:bg-[#9e1c1c] dark:bg-[#FFD700] dark:hover:bg-yellow-400 text-black dark:text-black font-semibold py-2 rounded-md transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#800000] dark:text-[#FFD700] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>

        {message && (
          <p className="text-center text-sm text-red-600 dark:text-red-400">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
