import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

const PrivateRoute = ({ children }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data?._id) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
