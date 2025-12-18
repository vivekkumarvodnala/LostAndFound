import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut, LogIn, PlusCircle } from "lucide-react";
import { FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: true,
  });

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      queryClient.clear();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleCreatePostClick = () => {
    navigate(user ? "/create" : "/login");
  };

  return (
    <nav className="bg-[#910000] text-white border-b border-gray-300 px-4 py-3 fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-bold tracking-tight hover:text-rose-300"
        >
          Lost<span className="text-rose-300">&</span>Found
        </Link>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden text-white text-xl focus:outline-none"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        {/* Links - Desktop */}
        <div className="hidden sm:flex items-center gap-6 text-sm sm:text-base">
          {user && (
            <Link
              to="/dashboard"
              className="flex items-center gap-1 hover:text-rose-200 transition"
            >
              <CgProfile className="w-4 h-4" />
              Profile
            </Link>
          )}

          <button
            onClick={handleCreatePostClick}
            className="flex items-center gap-2 bg-rose-200 text-black font-semibold py-1.5 px-4 rounded-full shadow hover:bg-rose-300 transition"
          >
            <PlusCircle className="w-4 h-4" />
            Create
          </button>

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 hover:text-red-300 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 hover:text-rose-200 transition"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Links - Mobile */}
      {open && (
        <div className="sm:hidden mt-3 flex flex-col gap-3 bg-[#800000] p-4 rounded-lg text-sm">
          {user && (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 hover:text-rose-200"
              onClick={() => setOpen(false)}
            >
              <CgProfile className="w-4 h-4" />
              Profile
            </Link>
          )}
          <button
            onClick={() => {
              handleCreatePostClick();
              setOpen(false);
            }}
            className="flex items-center gap-2 bg-rose-200 text-black font-semibold py-2 px-3 rounded-md hover:bg-rose-300"
          >
            <PlusCircle className="w-4 h-4" />
            Create
          </button>
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="flex items-center gap-2 hover:text-red-300"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 hover:text-rose-200"
              onClick={() => setOpen(false)}
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
