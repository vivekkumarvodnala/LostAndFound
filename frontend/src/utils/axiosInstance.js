import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`, // 👈 only /api, rest is handled by the proxy
  withCredentials: true, // 🔐 send cookies like JWT
});

export default axiosInstance;
 