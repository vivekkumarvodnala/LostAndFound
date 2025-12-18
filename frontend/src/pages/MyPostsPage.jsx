import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import ItemCard from "../components/ItemCard";

const MyPostsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userPosts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/post/user");
      return res.data;
    },
  });

  if (isLoading)
    return <p className="pt-20 px-6 text-center">Loading your posts...</p>;
  if (isError)
    return (
      <p className="pt-20 px-6 text-center text-red-500">
        Failed to load posts.
      </p>
    );

  return (
    <div className="min-h-screen pt-20 px-6 bg-[#fdf9f9] dark:bg-[#0f0f0f] transition-colors duration-300">
      <h2 className="text-2xl font-semibold mb-6">My Posts</h2>

      {data.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 text-center">
          You haven't created any posts yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((post) => (
            <ItemCard key={post._id} post={post} showActions={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostsPage;
