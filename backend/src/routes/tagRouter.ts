import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddlewares";
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from "../controllers/tagController";

const tagRouter = Router();

tagRouter.get("/", getAllTags)

tagRouter.post("/", isAuthenticated, isAdmin, createTag)
tagRouter.get("/:tagId", getTagById)
tagRouter.put("/:tagId", isAuthenticated, isAdmin, updateTag)
tagRouter.delete("/:tagId", isAuthenticated, isAdmin, deleteTag)

export default tagRouter;