import useAuthStore from "@/store/auth";
import axios from "axios";

const baseURL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL_DEV;

const axiosInstance = axios.create({
  baseURL, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add Authorization token if available
    const token = useAuthStore.getState().token;  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server returned a response
      if (error.response.status === 401) {
        if(error.request.responseURL.includes("auth")) {
          return Promise.reject(error);
        }
        useAuthStore.getState().logout(window.location.pathname);
      }
    } else if (error.request) {
      // No response was received
      console.error("No response received from the server.");
    } else {
      // Error in setting up the request
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
