import axiosInstance from "./api";

export const authService = {
  login: async (payload: { [key: string]: string | number }) => {
    const response = await axiosInstance.post("/auth/login", payload);
    return response.data;
  },
  sendOTP: async (payload: { [key: string]: string | number }) => {
    const response = await axiosInstance.post("/auth/send-otp", payload);
    return response.data;
  },
  resetPassword: async (payload: { [key: string]: string | number }) => {
    const response = await axiosInstance.post("/auth/reset-password", payload);
    return response.data;
  }
}