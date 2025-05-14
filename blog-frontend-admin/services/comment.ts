import axiosInstance from "./api";

export const CommentService = {
    deleteComment: async (blogId: string, commentId: string) => {
      const response = await axiosInstance.delete(`/blogs/${blogId}/comments/${commentId}`);
      return response
    }
}