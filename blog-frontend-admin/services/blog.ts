import { paramsObjectToQueryString } from "@/utils/helpers";
import axiosInstance from "./api";

export const BlogService = {
    getAllBlogs: async (payload: { [key: string]: string | number }) => {
      const response = await axiosInstance.get(`/blogs${paramsObjectToQueryString(payload)}`);
      return response 
    },
    getBlogById: async (id: string) => {
      const response = await axiosInstance.get(`/blogs/${id}`);
      return response 
    },
    getBlogComments: async (id: string) => {
      const response = await axiosInstance.get(`/blogs/${id}/comments`);
      return response 
    },
    getAllTags: async () => {
      const response = await axiosInstance.get('/tags');
      return response 
    },
    addCommentToBlog: async (id: string, payload: { [key: string]: string | number }) => {
      const response = await axiosInstance.post(`/blogs/${id}/comments`, payload);
      return response 
    }
}