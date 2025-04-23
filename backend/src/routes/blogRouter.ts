import { Router } from "express";
import { createBlogPost, deleteBlogPost, getAllBlogPosts, getBlogPostById, getCommentsOfBlogPost, updateBlogPost } from "../controllers/blogController";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddlewares";

const blogRouter = Router();

blogRouter.get("/", getAllBlogPosts)
blogRouter.post("/", isAuthenticated, isAdmin, createBlogPost)

blogRouter.get("/:blogId", getBlogPostById)
blogRouter.put("/:blogId", isAuthenticated, isAdmin, updateBlogPost)
blogRouter.delete("/:blogId", isAuthenticated, isAdmin, deleteBlogPost)

blogRouter.get("/:blogId/comments", getCommentsOfBlogPost)

export default blogRouter;