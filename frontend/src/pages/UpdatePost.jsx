import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPen, FaUpload, FaImages, FaTag } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { FaLocationDot } from "react-icons/fa6";
const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("lost");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axiosInstance.get(`/post/${id}`);
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setLocation(data.location);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("location", location);
    if (image) formData.append("image", image);

    try {
      await axiosInstance.put(`/post/${id}`, formData);
      toast.success("Post updated!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update post.");
    }
  };

  return (
  <section className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-[#1f1f1f]">
  <div className="max-w-xl w-full bg-[#fff7f7] dark:bg-[#2a2a2a] p-6 rounded-2xl shadow-xl">
    <h2 className="text-2xl font-bold mb-6 text-center text-[#800000] dark:text-yellow-400">
      ✏️ Update Post
    </h2>
    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
      
      {/* Title */}
      <div className="flex items-center gap-2">
        <FaTag className="text-[#800000] dark:text-yellow-400 text-lg" />
        <input
          type="text"
          className="input input-bordered w-full bg-white dark:bg-[#3a3a3a] text-black dark:text-white"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="flex items-center gap-2">
        <FaPen className="text-[#800000] dark:text-yellow-400 text-lg" />
        <textarea
          className="textarea textarea-bordered w-full bg-white dark:bg-[#3a3a3a] text-black dark:text-white"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      {/* Category */}
      <div className="flex items-center gap-2">
        <FaTag className="text-[#800000] dark:text-yellow-400 text-lg" />
        <select
          className="select select-bordered w-full bg-white dark:bg-[#3a3a3a] text-black dark:text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2">
          <FaLocationDot  className="text-[#800000] dark:text-yellow-400 text-lg" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="input input-bordered w-full bg-white dark:bg-[#3a3a3a] text-black dark:text-white"
        />
      </div>

      {/* Image Upload */}
      <div className="flex items-center gap-2">
        <FaImages className="text-[#800000] dark:text-yellow-400 text-lg" />
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full bg-white dark:bg-[#3a3a3a] text-black dark:text-white"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn w-full bg-[#800000] text-white hover:bg-[#a00000] 
                     dark:text-black font-semibold"
      >

        Update Post
      </button>
    </form>
  </div>
</section>

  );
};

export default UpdatePost;
