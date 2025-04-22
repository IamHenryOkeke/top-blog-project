import { Request } from "express";
import { ZodSchema } from "zod";

export const validate = <T>(schema: ZodSchema<T>, req: Request) => {
  const result = schema.safeParse(req.body);
  
  if (!result.success) {
      return {
          success: false,
          errors: result.error.flatten().fieldErrors, // or `.issues` for a flat array
      };
  }

  return {
      success: true,
      data: result.data,
  };
};
