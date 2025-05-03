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
  deleteBlogPostComment,
  getLatestBlogPosts
} from "../controllers/blogController";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddlewares";
import { optionalAuth } from "../middlewares/optionalAuthMiddleware";
import { validate } from "../middlewares/validation";
import { createBlogSchema, createCommentSchema, updateBlogSchema, updateCommentSchema } from "../utils/schemas";

const blogRouter = Router();

blogRouter.get("/", optionalAuth, getAllBlogPosts)
blogRouter.get("/latest", optionalAuth, getLatestBlogPosts)
blogRouter.post("/", isAuthenticated, isAdmin, validate(createBlogSchema), createBlogPost)

blogRouter.get("/:blogId", getBlogPostById)
blogRouter.put("/:blogId", isAuthenticated, isAdmin, validate(updateBlogSchema), updateBlogPost)
blogRouter.delete("/:blogId", isAuthenticated, isAdmin, deleteBlogPost)

blogRouter.get("/:blogId/comments", getBlogPostComments)
blogRouter.post("/:blogId/comments", validate(createCommentSchema), createBlogComment)

blogRouter.get("/:blogId/comments/:commentId", getBlogPostCommentById)

blogRouter.put("/:blogId/comments/:commentId", isAuthenticated, isAdmin, validate(updateCommentSchema), updateBlogComment)
blogRouter.delete("/:blogId/comments/:commentId", isAuthenticated, isAdmin, deleteBlogPostComment)

export default blogRouter;