import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { FiMail, FiUser, FiClock, FiSend } from "react-icons/fi";

const PostDetails = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/post/${id}`);
      return data;
    },
  });

  const handleContact = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axiosInstance.post("/contact", {
        toEmail: post.user.email,
        subject: `Regarding your Lost/Found post: ${post.title}`,
        message,
      });
      setSuccess(true);
      setMessage("");
    } catch (err) {
      console.error("❌ Error sending email:", err);
    } finally {
      setSending(false);
    }
  };

  if (isLoading)
    return <p className="text-center text-lg text-gray-600 dark:text-gray-300">Loading post details...</p>;

  if (isError || !post)
    return <p className="text-center text-red-600 font-semibold">Post not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-md mt-10 space-y-6 border border-gray-200 dark:border-slate-700">
      <h2 className="text-3xl font-bold text-[#800000] dark:text-yellow-400">{post.title}</h2>

      {post.image && (
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}${post.image}`}
          alt={post.title}
          className="w-full h-104 object-cover rounded-lg shadow-sm"
        />
      )}

      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <p>
          <strong className="text-gray-800 dark:text-gray-200">Category:</strong>{" "}
          {post.category}
        </p>
        <p>
          <strong className="text-gray-800 dark:text-gray-200">Description:</strong>{" "}
          {post.description}
        </p>
        <p className="flex items-center gap-2">
          <FiUser />
          <span>
            <strong>Posted by:</strong> {post.user.name} ({post.user.email})
          </span>
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <FiClock />
          <span>Posted on {new Date(post.createdAt).toLocaleString()}</span>
        </p>
      </div>

      <hr className="border-gray-300 dark:border-gray-700" />

      <form onSubmit={handleContact} className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-yellow-300 flex items-center gap-2">
          <FiMail /> Contact the Owner
        </h3>
        <textarea
          className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#800000] dark:focus:ring-yellow-400 text-gray-800 dark:text-gray-200"
          placeholder="Write your message here..."
          rows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <button
          type="submit"
          disabled={sending}
          className="flex items-center gap-2 bg-[#800000] dark:bg-yellow-400 text-white dark:text-black hover:bg-[#a30000] dark:hover:bg-yellow-300 px-5 py-2 rounded-lg text-sm font-medium transition-all"
        >
          <FiSend /> {sending ? "Sending..." : "Send Message"}
        </button>

        {success && <p className="text-green-600 dark:text-green-400">Message sent successfully!</p>}
      </form>
    </div>
  );
};

export default PostDetails;
