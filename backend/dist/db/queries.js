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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.createOTP = createOTP;
exports.getOTP = getOTP;
exports.deleteOTP = deleteOTP;
exports.updateUser = updateUser;
exports.getUserByEmail = getUserByEmail;
exports.getAllBlogPosts = getAllBlogPosts;
exports.createBlogPost = createBlogPost;
exports.getBlogPostById = getBlogPostById;
exports.updateBlogPost = updateBlogPost;
exports.deleteBlogPost = deleteBlogPost;
exports.createComment = createComment;
exports.getCommentOfBlogPost = getCommentOfBlogPost;
exports.getCommentById = getCommentById;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
exports.getAllTags = getAllTags;
exports.getTagById = getTagById;
exports.createTag = createTag;
exports.updateTag = updateTag;
exports.deleteTag = deleteTag;
const errorHandler_1 = require("../error/errorHandler");
const client_1 = require("@prisma/client");
const client_2 = require("../prisma/client");
function registerUser(values) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.user.create({
                data: values
            });
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error inserting new user:", error.message);
            }
            else {
                console.error("Error inserting new user:", error);
            }
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function createOTP(values) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.oTP.create({
                data: values
            });
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error creating new otp:", error.message);
            }
            else {
                console.error("Error creating new otp:", error);
            }
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function getOTP(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.oTP.findFirst({
                where: { email }
            });
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error finding otp:", error.message);
            }
            else {
                console.error("Error finding otp:", error);
            }
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function deleteOTP(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.oTP.deleteMany({
                where: { email }
            });
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error deleting otp:", error.message);
            }
            else {
                console.error("Error deleting otp:", error);
            }
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function updateUser(id, values) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.user.update({
                where: { id },
                data: values
            });
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error updating user:", error.message);
            }
            else {
                console.error("Error updating user:", error);
            }
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.user.findUnique({
                where: { email }
            });
            return data;
        }
        catch (error) {
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function getAllBlogPosts(offset, limit, searchTerm, isPublished, tag) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.blogPost.findMany(Object.assign(Object.assign({ where: Object.assign({ OR: [
                        { title: { contains: searchTerm, mode: 'insensitive' } },
                        { description: { contains: searchTerm, mode: 'insensitive' } },
                    ], isPublished: {
                        equals: isPublished
                    } }, (tag && { tags: {
                        some: {
                            name: tag
                        }
                    } })), include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        }
                    }
                }, orderBy: {
                    publishedAt: 'desc'
                } }, ((limit > 0) && { take: limit })), { skip: offset }));
            return data;
        }
        catch (error) {
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function createBlogPost(values) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.blogPost.create({
                data: values
            });
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error creating new blog post:", error.message);
            }
            else {
                console.error("Error creating new blog post:", error);
            }
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function getBlogPostById(id, isPublished) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.blogPost.findUnique({
                where: {
                    id,
                    isPublished: {
                        equals: isPublished
                    },
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    tags: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error getting blog post by id:", error.message);
            }
            else {
                console.error("Error getting blog post by id:", error);
            }
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function updateBlogPost(id, authorId, values) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedPost = yield client_2.prisma.blogPost.update({
                where: {
                    id,
                    authorId
                },
                data: values,
                include: {
                    tags: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
            return updatedPost;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    throw new errorHandler_1.AppError("Blog post not found", 404);
                }
            }
            console.error("Error updating blog post:", error);
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function deleteBlogPost(id, authorId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedPost = yield client_2.prisma.blogPost.delete({
                where: {
                    id,
                    authorId
                }
            });
            return deletedPost;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    throw new errorHandler_1.AppError("Blog post not found", 404);
                }
            }
            console.error("Error updating blog post:", error);
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function createComment(values) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.comment.create({
                data: values
            });
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error creating new comment", error.message);
            }
            else {
                console.error("Error creating new comment", error);
            }
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function getCommentOfBlogPost(postId, offset, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.comment.findMany(Object.assign(Object.assign({ where: {
                    postId
                } }, ((limit > 0) && { take: limit })), { skip: offset, orderBy: {
                    createdAt: 'desc'
                } }));
            return data;
        }
        catch (error) {
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function getCommentById(id, postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.comment.findUnique({
                where: { id, postId },
                include: {
                    post: {
                        select: {
                            id: true,
                            title: true
                        }
                    }
                }
            });
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error getting comment by id:", error.message);
            }
            else {
                console.error("Error getting comment by id:", error);
            }
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function updateComment(id, postId, values) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedComment = yield client_2.prisma.comment.update({
                where: {
                    id,
                    postId
                },
                data: values
            });
            return updatedComment;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    throw new errorHandler_1.AppError("Comment not found", 404);
                }
            }
            console.error("Error updating Comment:", error);
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function deleteComment(id, postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.comment.delete({
                where: {
                    id,
                    postId
                }
            });
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error deleting comment", error.message);
            }
            else {
                console.error("Error deleting comment", error);
            }
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function getAllTags(searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.tag.findMany({
                where: {
                    name: { contains: searchTerm, mode: 'insensitive' },
                }
            });
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error getting tags", error.message);
            }
            else {
                console.error("Error getting tags", error);
            }
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function getTagById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.tag.findUnique({
                where: { id },
                include: {
                    posts: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            createdAt: true,
                            publishedAt: true
                        }
                    }
                }
            });
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error getting tag by id", error.message);
            }
            else {
                console.error("Error getting tag by id", error);
            }
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function createTag(values) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.tag.create({
                data: values
            });
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error creating new tag", error.message);
            }
            else {
                console.error("Error creating new tag", error);
            }
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function updateTag(id, values) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.tag.update({
                where: { id },
                data: values
            });
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error updating tag", error.message);
            }
            else {
                console.error("Error updating tag", error);
            }
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
function deleteTag(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_2.prisma.tag.delete({
                where: { id }
            });
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error deleting tag", error.message);
            }
            else {
                console.error("Error deleting tag", error);
            }
            throw new errorHandler_1.AppError("Internal server error", 500);
        }
    });
}
