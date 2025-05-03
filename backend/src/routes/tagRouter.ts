import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddlewares";
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from "../controllers/tagController";
import { validate } from "../middlewares/validation";
import { createTagSchema, updateTagSchema } from "../utils/schemas";

const tagRouter = Router();

tagRouter.get("/", getAllTags)

tagRouter.post("/", isAuthenticated, isAdmin, validate({body: createTagSchema}), createTag)
tagRouter.get("/:tagId", getTagById)
tagRouter.put("/:tagId", isAuthenticated, isAdmin, validate({body: updateTagSchema}), updateTag)
tagRouter.delete("/:tagId", isAuthenticated, isAdmin, deleteTag)

export default tagRouter;