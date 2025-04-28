import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { validate } from "../middlewares/validate";
import { AppError } from "../error/errorHandler";
import { createBlogSchema, createCommentSchema, updateBlogSchema, updateCommentSchema } from "../utils/schemas";
import { 
  createBlogPost as createBlog,
  getBlogPostById as getBlog,
  updateBlogPost as updateBlog,
  deleteBlogPost as deleteBlog,
  getAllBlogPosts as getBlogs,
  getCommentOfBlogPost as getComments,
  getCommentById as getComment,
  createComment,
  deleteComment,
  updateComment
} from "../db/queries";

export const getAllBlogPosts = expressAsyncHandler(
  async(req: Request, res: Response) => {
    const user = req.user as { id: string, role: string };

    const { page = 1, limit = 10, searchTerm = "" } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (pageNumber < 1 || limitNumber < 1 || isNaN(pageNumber) || isNaN(limitNumber)) {
      throw new AppError("Page and limit must be a number greater than 0", 400)
    }

    if (limitNumber > 50) {
      throw new AppError("Limit must be less than or equal to 50", 400)
    }

    const offset = (pageNumber - 1) * limitNumber;
    
    const isPublished = user?.role === "ADMIN" ? undefined : true;
    const blogs = await getBlogs(offset, limitNumber, String(searchTerm).trim(), isPublished);
    const totalBlogs = await getBlogs(0, 0, String(searchTerm).trim(), isPublished);
    const totalPages = Math.ceil(totalBlogs.length / limitNumber);

    res.status(200).json({
      message: "Blogs fetched successfully",
      data: blogs,
      pagination: {
        total: totalBlogs.length,
        page: pageNumber,
        limit: limitNumber,
        totalPages
      }
    });
  }
)

export const getLatestBlogPosts = expressAsyncHandler(
  async(req: Request, res: Response) => {
    const user = req.user as { id: string, role: string };

    const isPublished = user?.role === "ADMIN" ? undefined : true;
    const blogs = await getBlogs(0, 0, "", isPublished);
    const latestBlogs = blogs.slice(0, 4);

    res.status(200).json({
      message: "Latest Blogs fetched successfully",
      data: latestBlogs
    });
  }
)

export const getBlogPostById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { blogId: id } = req.params;

    if (!id) {
      throw new AppError("Blog ID is required", 400)
    }

    const blog = await getBlog(id);

    if (!blog) {
      throw new AppError("Blog not found", 404)
    }

    res.status(200).json({
      message: "Blog fetched successfully",
      data: blog,
    });
  }
);

export const createBlogPost = expressAsyncHandler(
  async(req: Request, res: Response) => {
    const response = validate(createBlogSchema, req)
    if (!response.success) {
      throw new AppError(
        "Invalid input",
        400,
        response.errors
      );
    }
    
    const { title, description, content, thumbnailImage, tags } = response.data!;

    const user = req.user as { id: string };

    const values = {
      title,
      description,
      thumbnailImage,
      content,
      user: {
        connect: {
          id: user.id
        }
      },
      tags: {
        connect: tags.map((tag) => ({
          id: tag
        }))
      } 
    }

    const data = await createBlog(values)

    if (data) {
      res.status(201).json({
        message: "Blog created successfully",
        data
      })
      return
    }
  }
)

export const updateBlogPost = expressAsyncHandler(
  async(req: Request, res: Response) => {
    const { blogId: id } = req.params;

    if (!id) {
      throw new AppError("Blog ID is required", 400)
    }

    const blog = await getBlog(id);

    if (!blog) {
      throw new AppError("Blog not found", 404)
    }

    const response = validate(updateBlogSchema, req)
    if (!response.success) {
      throw new AppError(
        "Invalid input",
        400,
        response.errors
      );
    }
    
    const { title, description, content, thumbnailImage, tags, isPublished } = response.data!;

    const user = req.user as { id: string };

    const values = {
      title,
      description,
      thumbnailImage,
      content,
      isPublished,
      ...(tags && {
        tags: {
          set: [],
          connect: tags?.map((tag) => ({
            id: tag
          }))
        }
      })
    }

    const data = await updateBlog(id, user.id, values)

    if (data) {
      res.status(201).json({
        message: "Blog updated successfully",
        data
      })
      return
    }
  }
)

export const deleteBlogPost = expressAsyncHandler(
  async(req: Request, res: Response) => {
    const { blogId: id } = req.params;

    if (!id) {
      throw new AppError("Blog ID is required", 400)
    }

    const blog = await getBlog(id);

    if (!blog) {
      throw new AppError("Blog not found", 404)
    }

    const user = req.user as { id: string };

    const data = await deleteBlog(id, user.id)

    if (data) {
      res.status(201).json({
        message: "Blog deleted successfully",
        data
      })
      return
    }
  }
)

export const getBlogPostComments = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { blogId: id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    
    if (!id) {
      throw new AppError("Blog ID is required", 400)
    }

    if (pageNumber < 1 || limitNumber < 1) {
      throw new AppError("Page and limit must be greater than 0", 400)
    }
    if (limitNumber > 100) {
      throw new AppError("Limit must be less than or equal to 100", 400)
    }


    const blog = await getBlog(id);

    if (!blog) {
      throw new AppError("Blog not found", 404)
    }

    const offset = (pageNumber - 1) * limitNumber;
    const comments = await getComments(id, offset, limitNumber);

    res.status(200).json({
      message: "Comments fetched successfully",
      data: comments,
    });
  }
);

export const getBlogPostCommentById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { commentId: id } = req.params;

    if (!id) {
      throw new AppError("Comment ID is required", 400)
    }

    const comment = await getComment(id);

    if (!comment) {
      throw new AppError("Comment not found", 404)
    }

    res.status(200).json({
      message: "Comment fetched successfully",
      data: comment,
    });
  }
);

export const createBlogComment = expressAsyncHandler(
  async(req: Request, res: Response) => {
    const { blogId: id } = req.params;

    if (!id) {
      throw new AppError("Blog ID is required", 400)
    }

    const blog = await getBlog(id);

    if (!blog) {
      throw new AppError("Blog not found", 404)
    }

    const response = validate(createCommentSchema, req)
    if (!response.success) {
      throw new AppError(
        "Invalid input",
        400,
        response.errors
      );
    }
    
    const { name, content } = response.data!;

    const values = {
      content,
      name,
      post: {
        connect: {
          id
        }
      } 
    }

    const data = await createComment(values)

    if (data) {
      res.status(201).json({
        message: "Comment created successfully",
        data
      })
      return
    }
  }
)

export const updateBlogComment = expressAsyncHandler(
  async(req: Request, res: Response) => {
    const { blogId, commentId } = req.params;

    if (!blogId || !commentId) {
      throw new AppError("Blog ID and Comment ID is required", 400)
    }

    const blog = await getBlog(blogId);
    const comment = await getComment(commentId);

    if (!blog || !comment) {
      throw new AppError("Blog or Comment not found", 404)
    }

    const response = validate(updateCommentSchema, req)
    if (!response.success) {
      throw new AppError(
        "Invalid input",
        400,
        response.errors
      );
    }
    
    const { name, content } = response.data!;

    const values = {
      name,
      content
    }

    const data = await updateComment(commentId, blogId, values)

    if (data) {
      res.status(201).json({
        message: "Comment updated successfully",
        data
      })
      return
    }
  }
)

export const deleteBlogPostComment = expressAsyncHandler(
  async(req: Request, res: Response) => {
    const { blogId, commentId } = req.params;

    if (!blogId || !commentId) {
      throw new AppError("Blog ID and Comment ID is required", 400)
    }

    const blog = await getBlog(blogId);
    const comment = await getComment(commentId);

    if (!blog || !comment) {
      throw new AppError("Blog or Comment not found", 404)
    }

    const data = await deleteComment(commentId, blogId)

    if (data) {
      res.status(201).json({
        message: "Comment deleted successfully",
        data
      })
      return
    }
  }
)