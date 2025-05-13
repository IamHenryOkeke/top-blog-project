"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogQuerySchema = exports.tagQuerySchema = exports.commentParamsSchema = exports.blogParamsSchema = exports.tagParamsSchema = exports.updateTagSchema = exports.createTagSchema = exports.updateCommentSchema = exports.createCommentSchema = exports.updateBlogSchema = exports.createBlogSchema = exports.resetPassswordSchema = exports.sendOTPSchema = exports.loginUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string({ message: "Name is required" }).min(3, { message: "Name must be at least 3 characters long" }),
    email: zod_1.z.string({ message: "Email is required" }).email({ message: "Email must be valid" }),
    password: zod_1.z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
});
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string({ message: "Email is required" }).email({ message: "Email must be valid" }),
    password: zod_1.z.string({ message: "Password is required" }).min(6)
});
exports.sendOTPSchema = exports.loginUserSchema.pick({
    email: true
});
exports.resetPassswordSchema = exports.createUserSchema.omit({ name: true }).merge(zod_1.z.object({
    otp: zod_1.z
        .string()
        .length(6, "OTP must be 6 digits")
        .regex(/^\d{6}$/, "OTP must be numeric"),
}));
exports.createBlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(5, { message: "Title must be at least 5 characters long" }),
    description: zod_1.z.string().min(10, { message: "Description must be at least 10 characters long" }),
    thumbnailImage: zod_1.z.string().url({ message: "Must be a valid url" }),
    content: zod_1.z.string().min(20, { message: "Content must be at least 20 characters long" }),
    tags: zod_1.z.array(zod_1.z.string().cuid()),
});
exports.updateBlogSchema = exports.createBlogSchema.partial().merge(zod_1.z.object({
    isPublished: zod_1.z.boolean().optional(),
}));
exports.createCommentSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, { message: "Name must be at least 3 characters long" }),
    content: zod_1.z.string().min(3, { message: "Comment must be at least 3 characters long" })
});
exports.updateCommentSchema = exports.createCommentSchema.partial();
exports.createTagSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, { message: "Name must be at least 3 characters long" }),
});
exports.updateTagSchema = exports.createTagSchema.partial();
// params schemas
exports.tagParamsSchema = zod_1.z.object({
    tagId: zod_1.z.string().cuid(),
});
exports.blogParamsSchema = zod_1.z.object({
    blogId: zod_1.z.string().cuid()
});
exports.commentParamsSchema = zod_1.z.object({
    blogId: zod_1.z.string().cuid(),
    commentId: zod_1.z.string().cuid()
});
// query schemas
exports.tagQuerySchema = zod_1.z.object({
    searchTerm: zod_1.z.string().min(3, { message: "Search term must be at least 3 characters long" }).default("").optional()
});
exports.blogQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional(),
    searchTerm: zod_1.z.string().min(1, { message: "Search term must be at least 1 characters long" }).default("").optional(),
    tag: zod_1.z.string().min(1, { message: "Tag term must be at least 1 characters long" }).default("").optional(),
    limit: zod_1.z.string().optional(),
});
