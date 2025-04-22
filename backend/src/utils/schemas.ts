import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email({message: "Email must be valid"}),
  password: z.string().min(6),
});

export const loginUserSchema = z.object({
  email: z.string().email({message: "Email must be valid"}),
  password: z.string().min(6)
});
