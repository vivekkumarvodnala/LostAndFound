import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaTag, FaPen, FaImages } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom"; 
const CreateItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "lost",
    location: "",
    image: null,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("location", formData.location);
      data.append("image", formData.image);

      const res = await axios.post("/post", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setFormData({
        title: "",
        description: "",  
        category: "lost",
        location: "",
        image: null,
      });
      toast.success("Post created successfully!");
      navigate("/");
      
    },
    onError: () => {
      toast.error("Error posting item.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.image) {
      toast.error("Please fill all required fields.");
      return;
    }
    mutation.mutate();
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 px-4 py-10">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-semibold text-center mb-8 text-[#800000] dark:text-yellow-400">
          🧾 Create Lost/Found Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          {/* Title */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-[#800000] dark:text-yellow-400">
              <FaTag /> Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter item title"
              className="w-full bg-gray-100 dark:bg-slate-700 text-black dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#800000] dark:focus:ring-yellow-400 transition"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-[#800000] dark:text-yellow-400">
              <FaPen /> Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the item..."
              className="w-full bg-gray-100 dark:bg-slate-700 text-black dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#800000] dark:focus:ring-yellow-400 transition resize-none"
              rows={4}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-[#800000] dark:text-yellow-400">
              <FaTag /> Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full bg-gray-100 dark:bg-slate-700 text-black dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#800000] dark:focus:ring-yellow-400 transition"
              required
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>
          <div>
  <label className="flex items-center gap-2 text-sm font-medium text-[#800000] dark:text-yellow-400"><FaLocationDot />Location</label>
  <input
    type="text"
    name="location"
    placeholder="Enter item location"
    value={formData.location}
    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
    className="w-full bg-gray-100 dark:bg-slate-700 text-black dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#800000] dark:focus:ring-yellow-400 transition"
    required
  />
</div>


      <input
  type="file"
  name="image"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }));
    } else {
      toast.error("Only image files are allowed (JPG, PNG, etc.)");
      e.target.value = ""; // reset the file input
    }
  }}
  className="file-input w-full bg-gray-100 dark:bg-slate-700 text-black dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#800000] dark:focus:ring-yellow-400 transition"
  required
/>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#800000] hover:bg-[#a00000] text-white dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-black rounded-xl font-semibold text-lg transition"
          >
            Submit Post
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateItem;
