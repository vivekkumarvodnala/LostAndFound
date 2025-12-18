import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import ItemCard from "../components/ItemCard";
import { Search } from "lucide-react";

const Home = () => {
  const [activeTab, setActiveTab] = useState("lost");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLost = async () => {
    const { data } = await axiosInstance.get(`/post/lost?search=${searchTerm}`);
    return data;
  };

  const fetchFound = async () => {
    const { data } = await axiosInstance.get(`/post/found?search=${searchTerm}`);
    return data;
  };

  const {
    data: lostPosts,
    isLoading: loadingLost,
    isError: errorLost,
    isSuccess: successLost,
  } = useQuery({
    queryKey: ["lostPosts", searchTerm],
    queryFn: fetchLost,
  });

  const {
    data: foundPosts,
    isLoading: loadingFound,
    isError: errorFound,
    isSuccess: successFound,
  } = useQuery({
    queryKey: ["foundPosts", searchTerm],
    queryFn: fetchFound,
  });

  const filteredLostPosts = lostPosts?.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFoundPosts = foundPosts?.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const postsToRender = activeTab === "lost" ? filteredLostPosts : filteredFoundPosts;
  const loading = activeTab === "lost" ? loadingLost : loadingFound;
  const error = activeTab === "lost" ? errorLost : errorFound;
  const success = activeTab === "lost" ? successLost : successFound;

  return (
    <div className="pt-24 px-4 sm:px-6 min-h-screen bg-[#fdf9f9] dark:bg-[#0f0f0f] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-[#800000] dark:text-yellow-400 mb-10">
          Lost & Found Items
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search items by title or description..."
              className="pl-12 pr-4 py-3 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#800000] dark:focus:ring-yellow-400 focus:border-transparent transition-all duration-200 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("lost")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 border
              ${activeTab === "lost"
                ? "bg-[#800000] text-white shadow-md dark:bg-yellow-400 dark:text-white"
                : "bg-white text-[#800000] border-[#800000] hover:bg-[#faeaea] dark:bg-slate-800 dark:text-yellow-400 dark:border-yellow-400 dark:hover:bg-slate-700"}
            `}
          >
            Lost Items
          </button>
          <button
            onClick={() => setActiveTab("found")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 border
              ${activeTab === "found"
                ? "bg-green-600 text-white shadow-md dark:bg-yellow-400 dark:text-white"
                : "bg-white text-green-600 border-green-600 hover:bg-green-50 dark:bg-slate-800 dark:text-yellow-400 dark:border-yellow-400 dark:hover:bg-slate-700"}
            `}
          >
            Found Items
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg mt-10">
            Loading {activeTab} items...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-600 dark:text-red-400 text-lg mt-10">
            Failed to load {activeTab} items. Please try again.
          </p>
        )}

        {/* Items Grid */}
        {success && postsToRender?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {postsToRender.map((post) => (
              <ItemCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* No Results */}
        {success && postsToRender?.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-10">
            No {activeTab} items match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
