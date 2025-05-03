import expressAsyncHandler from "express-async-handler";
import { genPassword, validPassword } from "../utils/passwordUtils";
import { createOTP, deleteOTP, getOTP, getUserByEmail, registerUser, updateUser } from "../db/queries";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AppError } from "../error/errorHandler";
import jwt from 'jsonwebtoken'
import generateOTP from "../utils/otp";
import { sendMail } from "../utils/nodemailer";

export const userSignUp = expressAsyncHandler(
  async(req: Request, res: Response): Promise <void> => {
    const { name, email, password} = req.body;
    const existingUser = await getUserByEmail(email.toLowerCase());

    if (existingUser) {
      throw new AppError(
        "Email already used. Please use another email.",
        409
      );
    }

    const hashedPassword = await genPassword(password);

    const values = {
      name,
      email: email.toLowerCase(), 
      password: hashedPassword
    };

    const result = await registerUser(values);
    res.status(201).json({
      message: "Registration successful",
      user: {
        id: result.id,
        name: result.name,
        email: result.email,
      }
    });    
  }
) 

export const userLogin = expressAsyncHandler(
  async(req: Request, res: Response): Promise <void> => {
    const {email, password} = req.body;

    const isExistingUser = await getUserByEmail(email);
    if(!isExistingUser) {
      throw new AppError("invalid credentials", 401)
    }

    const isValidPassword = await validPassword(password, isExistingUser.password)
    if(!isValidPassword) {
      throw new AppError("invalid credentials", 401)
    }

    const user =  {
      id: isExistingUser.id,
      name: isExistingUser.name,
      email: isExistingUser.email,
      role: isExistingUser.role
    };

    const token = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: 1200 });

    const data = { accessToken: token };
    await updateUser(isExistingUser.id, data);

    res.status(200).json({
      message: "Login successful",
      token,
      user
    })
  }
)

export const sendOTP = expressAsyncHandler(
  async(req: Request, res: Response): Promise <void> => {
    const {email} = req.body;

    const isExistingUser = await getUserByEmail(email);

    if(!isExistingUser) {
      throw new AppError("Invalid credentials", 401)
    }
    
    const isExistingOTPEmail = await getOTP(email);

    if(isExistingOTPEmail) {
      await deleteOTP(isExistingOTPEmail.email);
    }

    const otp = generateOTP();

    const hashedOTP = await bcrypt.hash(otp, 10);

    const data = {
      email,
      code: hashedOTP,
      expires: new Date(Date.now() + 10 * 60 * 1000)
    }

    await sendMail("Password Reset OTP", isExistingUser.name, email, `Your OTP is ${otp}. It will expire in 10 minutes.`)

    await createOTP(data);

    res.status(200).json({
      message: `OTP sent successfully to ${email}`,
    })
  }
)

export const resetPassword = expressAsyncHandler(
  async(req: Request, res: Response): Promise <void> => {
    const {email, password, otp} = req.body;

    const isExistingOTP = await getOTP(email);

    if(!isExistingOTP) {
      throw new AppError("Invalid OTP", 401)
    }

    const isExpired = new Date() > isExistingOTP.expires;

    if(isExpired) {
      throw new AppError("OTP expired", 401)
    }

    const isExistingUser = await getUserByEmail(email);
    if(!isExistingUser) {
      throw new AppError("Invalid credentials or OTP", 401);
    }

    const isValidOTP = await bcrypt.compare(otp, isExistingOTP.code);
    if(!isValidOTP) {
      throw new AppError("Invalid OTP", 401)
    }
    
    const hashedPassword = await genPassword(password);
    const data = {
      password: hashedPassword
    }
    await updateUser(isExistingUser.id, data);

    await deleteOTP(isExistingOTP.email);

    res.status(200).json({
      message: `Password reset successfully for ${email}`
    })
  }
)

export const userLogout = expressAsyncHandler(
  async(req: Request, res: Response) => {
  const data = { accessToken: null };

  if (!req.user) {
    throw new AppError("User not authenticated", 401);
  }

  const user = req.user as { id: string };

  await updateUser(user.id, data);
  
  res.status(200).json({
    message: "Logout successful"
  });
})