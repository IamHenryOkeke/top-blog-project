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
    addBlog: async (payload: FormData) => {
      const response = await axiosInstance.post("/blogs", payload, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response 
    },
    updateBlog: async (id: string, payload: FormData) => {
      const response = await axiosInstance.put(`/blogs/${id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response 
    },
    deleteteBlog: async (id: string) => {
      const response = await axiosInstance.delete(`/blogs/${id}`);
      return response 
    },
    addCommentToBlog: async (id: string, payload: { [key: string]: string | number }) => {
      const response = await axiosInstance.post(`/blogs/${id}/comments`, payload);
      return response 
    }
}