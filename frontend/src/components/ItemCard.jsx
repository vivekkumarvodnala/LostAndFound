import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { FiEdit, FiTrash, FiUser, FiClock } from "react-icons/fi";
import { toast } from "react-hot-toast";
const ItemCard = ({ post, showActions = false }) => {
  const queryClient = useQueryClient();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axiosInstance.delete(`/post/${post._id}`);
      queryClient.invalidateQueries(["userPosts"]);
      toast.success("Post deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post.");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-slate-700 overflow-hidden">
      <Link to={`/post/${post._id}`}>
        {post.image && (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}${post.image}`}
            alt={post.title}
            className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
          />
        )}
      </Link>

      <div className="p-4 md:p-5">
        <Link to={`/post/${post._id}`}>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-[#800000] dark:hover:text-yellow-400 mb-2 line-clamp-2">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
          {post.description}
        </p>

        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 mb-3">
          <p className="flex items-center gap-2">
            <FiUser className="text-base" />
            <span>
              <span className="font-medium">Posted by:</span>{" "}
              {post.user?.name || "Unknown"}
            </span>
          </p>
          <p className="text-sm text-gray-500">
  📍 {post.location}
</p>
          <p className="flex items-center gap-2">
            <FiClock className="text-base" />
            <span>
              <span className="font-medium">On:</span>{" "}
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </p>
        </div>

        {showActions && (
          <div className="flex gap-3 pt-2">
            <Link
              to={`/edit-post/${post._id}`}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#800000] text-white hover:bg-[#a30000] transition-all text-sm font-medium"
            >
              <FiEdit /> Edit
            </Link>
            <button
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all text-sm font-medium"
            >
              <FiTrash /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
