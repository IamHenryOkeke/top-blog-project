import axiosInstance from "./api";
import { paramsObjectToQueryString } from "@/utils/helpers";

export const TagService = {
    getAllTags: async (payload: { [key: string]: string | number }) => {
      const response = await axiosInstance.get(`/tags${paramsObjectToQueryString(payload)}`);
      return response 
    },
    getTagById: async (id: string) => {
      const response = await axiosInstance.get(`/tags/${id}`)
      return response 
    },
    addTag: async (payload: { [key: string]: string | number }) => {
      const response = await axiosInstance.post('/tags', payload);
      return response 
    },
    updateTag: async (id: string, payload: { [key: string]: string | number }) => {
      const response = await axiosInstance.put(`/tags/${id}`, payload);
      return response 
    },
    deleteTag: async (id: string) => {
      const response = await axiosInstance.delete(`/tags/${id}`)
      return response 
    }
}