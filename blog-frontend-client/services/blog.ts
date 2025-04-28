import { paramsObjectToQueryString } from "@/utils/helpers";
import axiosInstance from "./api";

export const BlogService = {
    getAllBlogs: async (payload: { [key: string]: string | number }) => {
      const response = await axiosInstance.get(`/blogs${paramsObjectToQueryString(payload)}`);
      return response 
    },
    getLatestBlogs: async () => {
      const response = await axiosInstance.get('/blogs/latest');
      return response 
    }
}