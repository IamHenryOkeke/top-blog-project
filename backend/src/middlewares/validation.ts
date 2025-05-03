import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../error/errorHandler';

export const validate =
  (schema: ZodSchema<any>, source: 'body' | 'query' | 'params' = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const errorDetails = result.error.flatten().fieldErrors;
      throw new AppError('Validation failed', 400, errorDetails)
    }
    req[source] = result.data;
    next();
  };
