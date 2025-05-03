import { Router } from "express";

export const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.json({
    message: "Welcome to my api",
    status: 200
  });
});

export default indexRouter;