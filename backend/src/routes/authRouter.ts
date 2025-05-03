import { Router } from "express";
import { resetPassword, sendOTP, userLogin, userLogout, userSignUp } from "../controllers/authController";
import { isAuthenticated }from "../middlewares/authMiddlewares";
import { validate } from "../middlewares/validation";
import { createUserSchema, loginUserSchema, resetPassswordSchema, sendOTPSchema } from "../utils/schemas";

const authRouter = Router();

authRouter.post('/sign-up', validate({body: createUserSchema}), userSignUp);
authRouter.post('/login', validate({body: loginUserSchema}), userLogin);
authRouter.post('/send-otp', validate({body: sendOTPSchema}), sendOTP);
authRouter.post('/reset-password', validate({body: resetPassswordSchema}), resetPassword);
authRouter.post('/logout', isAuthenticated, userLogout);

export default authRouter;