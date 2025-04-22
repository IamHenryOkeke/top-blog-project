import { Router } from "express";
import { userLogin, userLogout, userSignUp } from "../controllers/authController";
import isAuthenticated from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post('/sign-up', userSignUp);
authRouter.post('/login', userLogin);
authRouter.post('/logout', isAuthenticated, userLogout);

export default authRouter;