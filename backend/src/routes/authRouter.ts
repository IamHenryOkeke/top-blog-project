import { Router } from "express";
import { resetPassword, sendOTP, userLogin, userLogout, userSignUp } from "../controllers/authController";
import { isAuthenticated }from "../middlewares/authMiddlewares";

const authRouter = Router();

authRouter.post('/sign-up', userSignUp);
authRouter.post('/login', userLogin);
authRouter.post('/send-otp', sendOTP);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/logout', isAuthenticated, userLogout);

export default authRouter;