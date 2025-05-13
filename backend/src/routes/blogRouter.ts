import { Router } from "express";
const { upload } = require("../config/multer");
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
import { blogParamsSchema, blogQuerySchema, commentParamsSchema, createBlogSchema, createCommentSchema, updateBlogSchema, updateCommentSchema } from "../utils/schemas";
import { addFilePathToBody } from "../middlewares/addFilePathToBody";

const blogRouter = Router();

blogRouter.get("/", optionalAuth, validate({query: blogQuerySchema}), getAllBlogPosts)
blogRouter.get("/latest", optionalAuth, getLatestBlogPosts)
blogRouter.post("/", isAuthenticated, isAdmin, upload.single('thumbnailImage'), addFilePathToBody, validate({body: createBlogSchema}), createBlogPost)

blogRouter.get("/:blogId", validate({params: blogParamsSchema}), optionalAuth,  getBlogPostById)
blogRouter.put("/:blogId", isAuthenticated, isAdmin, upload.single('thumbnailImage'), addFilePathToBody, validate({body: updateBlogSchema, params: blogParamsSchema}), updateBlogPost)
blogRouter.delete("/:blogId", isAuthenticated, isAdmin,validate({params: blogParamsSchema}), deleteBlogPost)

blogRouter.get("/:blogId/comments", validate({params: blogParamsSchema}), optionalAuth, getBlogPostComments)
blogRouter.post("/:blogId/comments", validate({body: createCommentSchema, params: blogParamsSchema}), createBlogComment)

blogRouter.get("/:blogId/comments/:commentId", validate({params: commentParamsSchema}), optionalAuth, getBlogPostCommentById)

blogRouter.put("/:blogId/comments/:commentId", isAuthenticated, isAdmin, validate({body: updateCommentSchema, params: commentParamsSchema}), updateBlogComment)
blogRouter.delete("/:blogId/comments/:commentId", isAuthenticated, isAdmin, validate({params: commentParamsSchema}), deleteBlogPostComment)

export default blogRouter;