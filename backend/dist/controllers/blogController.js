"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogPostComment = exports.updateBlogComment = exports.createBlogComment = exports.getBlogPostCommentById = exports.getBlogPostComments = exports.deleteBlogPost = exports.updateBlogPost = exports.createBlogPost = exports.getBlogPostById = exports.getLatestBlogPosts = exports.getAllBlogPosts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const errorHandler_1 = require("../error/errorHandler");
const queries_1 = require("../db/queries");
exports.getAllBlogPosts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { page = 1, limit = 10, searchTerm = "", tag = "" } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    if (pageNumber < 1 || limitNumber < 1 || isNaN(pageNumber) || isNaN(limitNumber)) {
        throw new errorHandler_1.AppError("Page and limit must be a number greater than 0", 400);
    }
    if (limitNumber > 50) {
        throw new errorHandler_1.AppError("Limit must be less than or equal to 50", 400);
    }
    const offset = (pageNumber - 1) * limitNumber;
    const isPublished = (user === null || user === void 0 ? void 0 : user.role) === "ADMIN" ? undefined : true;
    const blogs = yield (0, queries_1.getAllBlogPosts)(offset, limitNumber, String(searchTerm).trim(), isPublished, String(tag).trim());
    const totalBlogs = yield (0, queries_1.getAllBlogPosts)(0, 0, String(searchTerm).trim(), isPublished, String(tag).trim());
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
}));
exports.getLatestBlogPosts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const isPublished = (user === null || user === void 0 ? void 0 : user.role) === "ADMIN" ? undefined : true;
    const blogs = yield (0, queries_1.getAllBlogPosts)(0, 0, "", isPublished, "");
    const latestBlogs = blogs.slice(0, 4);
    res.status(200).json({
        message: "Latest Blogs fetched successfully",
        data: latestBlogs
    });
}));
exports.getBlogPostById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId: id } = req.params;
    const user = req.user;
    if (!id) {
        throw new errorHandler_1.AppError("Blog ID is required", 400);
    }
    const isPublished = (user === null || user === void 0 ? void 0 : user.role) === "ADMIN" ? undefined : true;
    const blog = yield (0, queries_1.getBlogPostById)(id, isPublished);
    if (!blog) {
        throw new errorHandler_1.AppError("Blog not found", 404);
    }
    res.status(200).json({
        message: "Blog fetched successfully",
        data: blog,
    });
}));
exports.createBlogPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, content, tags, thumbnailImage } = req.body;
    const user = req.user;
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
    };
    const data = yield (0, queries_1.createBlogPost)(values);
    if (data) {
        res.status(201).json({
            message: "Blog created successfully",
            data
        });
        return;
    }
}));
exports.updateBlogPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId: id } = req.params;
    const user = req.user;
    if (!id) {
        throw new errorHandler_1.AppError("Blog ID is required", 400);
    }
    const blog = yield (0, queries_1.getBlogPostById)(id);
    if (!blog) {
        throw new errorHandler_1.AppError("Blog not found", 404);
    }
    const { title, description, content, thumbnailImage, tags, isPublished } = req.body;
    const values = Object.assign(Object.assign({ title: title.trim(), description: description.trim(), thumbnailImage,
        content,
        isPublished }, ((blog.isPublished && isPublished) ? ({ publishedAt: blog.publishedAt }) : isPublished ? ({ publishedAt: new Date() }) : ({ publishedAt: blog.createdAt }))), (tags && {
        tags: {
            set: [],
            connect: tags === null || tags === void 0 ? void 0 : tags.map((tag) => ({
                id: tag
            }))
        }
    }));
    const data = yield (0, queries_1.updateBlogPost)(id, user.id, values);
    if (data) {
        res.status(201).json({
            message: "Blog updated successfully",
            data
        });
        return;
    }
}));
exports.deleteBlogPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId: id } = req.params;
    const user = req.user;
    if (!id) {
        throw new errorHandler_1.AppError("Blog ID is required", 400);
    }
    const blog = yield (0, queries_1.getBlogPostById)(id);
    if (!blog) {
        throw new errorHandler_1.AppError("Blog not found", 404);
    }
    const data = yield (0, queries_1.deleteBlogPost)(id, user.id);
    if (data) {
        res.status(201).json({
            message: "Blog deleted successfully",
            data
        });
        return;
    }
}));
exports.getBlogPostComments = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId: id } = req.params;
    const user = req.user;
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    if (!id) {
        throw new errorHandler_1.AppError("Blog ID is required", 400);
    }
    if (pageNumber < 1 || limitNumber < 1) {
        throw new errorHandler_1.AppError("Page and limit must be greater than 0", 400);
    }
    if (limitNumber > 100) {
        throw new errorHandler_1.AppError("Limit must be less than or equal to 100", 400);
    }
    const isPublished = (user === null || user === void 0 ? void 0 : user.role) === "ADMIN" ? undefined : true;
    const blog = yield (0, queries_1.getBlogPostById)(id, isPublished);
    if (!blog) {
        throw new errorHandler_1.AppError("Associated comments of blog not found", 404);
    }
    const offset = (pageNumber - 1) * limitNumber;
    const comments = yield (0, queries_1.getCommentOfBlogPost)(id, offset, limitNumber);
    res.status(200).json({
        message: "Comments fetched successfully",
        data: comments,
    });
}));
exports.getBlogPostCommentById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId: id, blogId } = req.params;
    const user = req.user;
    if (!id) {
        throw new errorHandler_1.AppError("Comment ID is required", 400);
    }
    const isPublished = (user === null || user === void 0 ? void 0 : user.role) === "ADMIN" ? undefined : true;
    const blog = yield (0, queries_1.getBlogPostById)(blogId, isPublished);
    if (!blog) {
        throw new errorHandler_1.AppError("Associated blog not found", 404);
    }
    const comment = yield (0, queries_1.getCommentById)(id, blogId);
    if (!comment) {
        throw new errorHandler_1.AppError("Comment not found", 404);
    }
    res.status(200).json({
        message: "Comment fetched successfully",
        data: comment,
    });
}));
exports.createBlogComment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId: id } = req.params;
    if (!id) {
        throw new errorHandler_1.AppError("Blog ID is required", 400);
    }
    const blog = yield (0, queries_1.getBlogPostById)(id);
    if (!blog) {
        throw new errorHandler_1.AppError("Blog not found", 404);
    }
    const { name, content } = req.body;
    const values = {
        content,
        name,
        post: {
            connect: {
                id
            }
        }
    };
    const data = yield (0, queries_1.createComment)(values);
    if (data) {
        res.status(201).json({
            message: "Comment created successfully",
            data
        });
        return;
    }
}));
exports.updateBlogComment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId, commentId } = req.params;
    if (!blogId || !commentId) {
        throw new errorHandler_1.AppError("Blog ID and Comment ID is required", 400);
    }
    const blog = yield (0, queries_1.getBlogPostById)(blogId);
    const comment = yield (0, queries_1.getCommentById)(commentId, blogId);
    if (!blog || !comment) {
        throw new errorHandler_1.AppError("Blog or Comment not found", 404);
    }
    const { name, content } = req.body;
    const values = {
        name,
        content
    };
    const data = yield (0, queries_1.updateComment)(commentId, blogId, values);
    if (data) {
        res.status(201).json({
            message: "Comment updated successfully",
            data
        });
        return;
    }
}));
exports.deleteBlogPostComment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId, commentId } = req.params;
    if (!blogId || !commentId) {
        throw new errorHandler_1.AppError("Blog ID and Comment ID is required", 400);
    }
    const blog = yield (0, queries_1.getBlogPostById)(blogId);
    const comment = yield (0, queries_1.getCommentById)(commentId, blogId);
    if (!blog) {
        throw new errorHandler_1.AppError("Associated Blog not found", 404);
    }
    if (!comment) {
        throw new errorHandler_1.AppError("Comment not found", 404);
    }
    const data = yield (0, queries_1.deleteComment)(commentId, blogId);
    if (data) {
        res.status(201).json({
            message: "Comment deleted successfully",
            data
        });
        return;
    }
}));
