import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { validate } from "../middlewares/validate";
import { AppError } from "../error/errorHandler";
import { 
  getAllTags as getTags,
  getTagById as getTag,
  createTag as insertTag,
  updateTag as updateTagById,
  deleteTag as deleteTagById
} from "../db/queries";
import { createTagSchema, updateTagSchema } from "../utils/schemas";

export const getAllTags = expressAsyncHandler(
  async(req: Request, res: Response) => {
    const { searchTerm = "" } = req.query;
    
    const tags = await getTags(String(searchTerm));

    res.status(200).json({
      message: "Tags fetched successfully",
      data: tags,
    });
  }
)

export const getTagById = expressAsyncHandler(
  async(req: Request, res: Response) => {
    const { tagId } = req.params;

    if(!tagId) {
      throw new AppError("Tag ID is required", 400)
    }
    
    const tag = await getTag(tagId);

    if (!tag) {
      throw new AppError("Tag not found", 404)
    }

    res.status(200).json({
      message: "Tags fetched successfully",
      data: tag,
    });
  }
)

export const createTag = expressAsyncHandler(
  async(req: Request, res: Response) => {
    const response = validate(createTagSchema, req)
    if (!response.success) {
      throw new AppError(
        "Invalid input",
        400,
        response.errors
      );
    }
    
    const { name } = response.data!;

    const values = {
      name: name.toLowerCase()
    }

    const data = await insertTag(values)

    if (data) {
      res.status(201).json({
        message: "Tag created successfully",
        data
      })
      return
    }
  }
)

export const updateTag = expressAsyncHandler(
  async(req: Request, res: Response) => {
    const { tagId } = req.params;

    if (!tagId) {
      throw new AppError("Tag ID is required", 400)
    }

    const tag = await getTag(tagId);

    if (!tag) {
      throw new AppError("Tag not found", 404)
    }

    const response = validate(updateTagSchema, req)
    if (!response.success) {
      throw new AppError(
        "Invalid input",
        400,
        response.errors
      );
    }
    
    const { name } = response.data!;

    const values = {
      name: name?.toLowerCase()
    }

    const data = await updateTagById(tagId, values)

    if (data) {
      res.status(201).json({
        message: "Tag updated successfully",
        data
      })
      return
    }
  }
)

export const deleteTag = expressAsyncHandler(
  async(req: Request, res: Response) => {
    const { tagId } = req.params;

    if (!tagId) {
      throw new AppError("Tag ID is required", 400)
    }

    const tag = await getTag(tagId);

    if (!tag) {
      throw new AppError("Tag not found", 404)
    }

    const data = await deleteTagById(tagId)

    if (data) {
      res.status(201).json({
        message: "Tag deleted successfully",
        data
      })
      return
    }
  }
)





