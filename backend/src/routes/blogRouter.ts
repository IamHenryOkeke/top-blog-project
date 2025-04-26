import { Router } from "express";
import { 
  createBlogPost, 
  deleteBlogPost, 
  getAllBlogPosts, 
  getBlogPostById, 
  getBlogPostComments,
  getBlogPostCommentById,
  updateBlogPost, 
  createBlogComment, 
  updateBlogComment,
  deleteBlogPostComment
} from "../controllers/blogController";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddlewares";

const blogRouter = Router();

blogRouter.get("/", getAllBlogPosts)
blogRouter.post("/", isAuthenticated, isAdmin, createBlogPost)

blogRouter.get("/:blogId", getBlogPostById)
blogRouter.put("/:blogId", isAuthenticated, isAdmin, updateBlogPost)
blogRouter.delete("/:blogId", isAuthenticated, isAdmin, deleteBlogPost)

blogRouter.get("/:blogId/comments", getBlogPostComments)
blogRouter.post("/:blogId/comments", createBlogComment)

blogRouter.get("/:blogId/comments/:commentId", getBlogPostCommentById)

blogRouter.put("/:blogId/comments/:commentId", isAuthenticated, isAdmin, updateBlogComment)
blogRouter.delete("/:blogId/comments/:commentId", isAuthenticated, isAdmin, deleteBlogPostComment)

export default blogRouter;