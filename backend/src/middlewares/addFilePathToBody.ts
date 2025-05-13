// middleware/addFilePath.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../error/errorHandler';

export const addFilePathToBody = (req: Request, res: Response, next: NextFunction) => {
  if (req.file && req.file.path) {
    req.body.thumbnailImage = req.file.path;
  }
  if (!req.file) {
    delete req.body.thumbnailImage
  }
  if (typeof req.body.tags === 'string') {
    try {
      req.body.tags = JSON.parse(req.body.tags);
    } catch (error) {
      throw new AppError('Invalid tags format', 400);
    }
  } 
  if (typeof req.body.isPublished === 'string') {
    try {
      req.body.isPublished = (req.body.isPublished === true || req.body.isPublished === "true")
    } catch (error) {
      throw new AppError('Invalid tags format', 400);
    }
  } 
  next();
};
