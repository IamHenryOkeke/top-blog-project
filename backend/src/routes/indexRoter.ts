import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddlewares";

export const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.json({
    message: "Welcome to my api",
    status: 200
  });
});

indexRouter.get( '/dashboard', isAuthenticated, (req, res) => {
    res.json({ message: 'Welcome to your dashboard', user: req.user });
  }
);

export default indexRouter;