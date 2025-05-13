import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string({message: "Name is required"}).min(3, {message: "Name must be at least 3 characters long"}),
  email: z.string({message: "Email is required"}).email({message: "Email must be valid"}),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
});

export const loginUserSchema = z.object({
  email: z.string({message: "Email is required"}).email({message: "Email must be valid"}),
  password: z.string({message: "Password is required"}).min(6)
});

export const sendOTPSchema = loginUserSchema.pick({
  email: true
})

export const resetPassswordSchema = createUserSchema.omit({name: true}).merge(z.object({
  otp: z
      .string()
      .length(6, "OTP must be 6 digits")
      .regex(/^\d{6}$/, "OTP must be numeric"),
}));

export const createBlogSchema = z.object({
  title: z.string().min(5, {message: "Title must be at least 5 characters long"}),
  description: z.string().min(10, {message: "Description must be at least 10 characters long"}),
  thumbnailImage: z.string().url({message: "Must be a valid url"}),
  content: z.string().min(20, {message: "Content must be at least 20 characters long"}),
  tags: z.array(z.string().cuid()),
});

export const updateBlogSchema = createBlogSchema.partial().merge(z.object({
  isPublished: z.boolean().optional(),
}));

export const createCommentSchema = z.object({
  name: z.string().min(3, {message: "Name must be at least 3 characters long"}),
  content: z.string().min(3, {message: "Comment must be at least 3 characters long"})
});

export const updateCommentSchema = createCommentSchema.partial()

export const createTagSchema = z.object({
  name: z.string().min(3, {message: "Name must be at least 3 characters long"}),
});

export const updateTagSchema = createTagSchema.partial()

// params schemas

export const tagParamsSchema = z.object({
  tagId: z.string().cuid(),
});

export const blogParamsSchema = z.object({
  blogId: z.string().cuid()
});

export const commentParamsSchema = z.object({
  blogId: z.string().cuid(),
  commentId: z.string().cuid()
});

// query schemas

export const tagQuerySchema = z.object({
  searchTerm: z.string().min(3, {message: "Search term must be at least 3 characters long"}).default("").optional()
});

export const blogQuerySchema = z.object({
  page: z.string().optional(),
  searchTerm: z.string().min(1, {message: "Search term must be at least 1 characters long"}).default("").optional(),
  tag: z.string().min(1, {message: "Tag term must be at least 1 characters long"}).default("").optional(),
  limit: z.string().optional(),
});
