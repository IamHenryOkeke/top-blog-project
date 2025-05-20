import axios from "axios";

const baseURL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_URL! : process.env.NEXT_PUBLIC_API_URL_DEV!;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
