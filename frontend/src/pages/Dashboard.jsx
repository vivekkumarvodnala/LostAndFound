import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center mt-10 text-gray-600 ">Loading...</div>;
  if (isError || !user)
    return <div className="text-center mt-10 text-red-600">Failed to load user data</div>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-12 bg-white rounded-2xl shadow-md border border-gray-200  text-center space-y-6">
      
      {/* Profile Picture */}
      <img
        src={`${import.meta.env.VITE_API_BASE_URL}${user.profilePic}`}
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[#800000] "
      />

      {/* User Info */}
      <div className="space-y-1 text-gray-700 ">
        <h2 className="text-2xl font-bold text-[#800000]  flex justify-center items-center gap-2">
          <FiUser /> {user.name}
        </h2>
        <p className="flex items-center justify-center gap-2">
          <FiMail /> {user.email}
        </p>
        <p className="flex items-center justify-center gap-2">
          <FiPhone /> {user.phone}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        <button
          onClick={() => navigate("/dashboard/myposts")}
          className="bg-[#800000]  text-white  hover:bg-[#a00000] font-medium px-5 py-2 rounded-lg transition"
        >
          📄 See My Posts
        </button>
        <button
          onClick={() => navigate("/dashboard/update-profile")}
          className="bg-gray-800 dark:bg-yellow-500 text-white hover:bg-black  font-medium px-5 py-2 rounded-lg transition"
        >
          ✏️ Update Profile
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
