import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email({message: "Email must be valid"}),
  password: z.string().min(6),
});

export const loginUserSchema = z.object({
  email: z.string({message: "Email is required"}).email({message: "Email must be valid"}),
  password: z.string({message: "Password is required"}).min(6)
});

export const sendOTPSchema = loginUserSchema.pick({
  email: true
})

export const resetPassswordSchema = loginUserSchema.merge(z.object({
  otp: z
      .string()
      .length(6, "OTP must be 6 digits")
      .regex(/^\d{6}$/, "OTP must be numeric"),
}));

export const createBlogSchema = z.object({
  title: z.string().min(5, {message: "Title must be at least 5 characters long"}),
  description: z.string().min(10, {message: "Description must be at least 10 characters long"}),
  thumbnailImage: z.string().url({message: "Thumbnail image must be a valid URL"}),
  content: z.string().min(20, {message: "Content must be at least 20 characters long"}),
  tags: z.array(z.string().min(3, {message: "Title must be at least 3 characters long"})),
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