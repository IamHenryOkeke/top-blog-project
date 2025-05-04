import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddlewares";
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from "../controllers/tagController";
import { validate } from "../middlewares/validation";
import { createTagSchema, tagParamsSchema, tagQuerySchema, updateTagSchema } from "../utils/schemas";

const tagRouter = Router();

tagRouter.get("/", validate({query: tagQuerySchema}), getAllTags)

tagRouter.post("/", isAuthenticated, isAdmin, validate({body: createTagSchema}), createTag)
tagRouter.get("/:tagId", validate({params: tagParamsSchema}), getTagById)
tagRouter.put("/:tagId", isAuthenticated, isAdmin, validate({body: updateTagSchema, params: tagParamsSchema}), updateTag)
tagRouter.delete("/:tagId", isAuthenticated, isAdmin, validate({params: tagParamsSchema}), deleteTag)

export default tagRouter;