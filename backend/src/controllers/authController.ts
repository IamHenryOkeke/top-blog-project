import expressAsyncHandler from "express-async-handler";
import { validate } from "../middlewares/validate";
import { createUserSchema, loginUserSchema } from "../utils/schemas";
import { genPassword } from "../utils/passwordUtils";
import { getUserByEmail, registerUser, updateUser } from "../db/queries";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AppError } from "../error/errorHandler";
import jwt from 'jsonwebtoken'

export const userSignUp = expressAsyncHandler(
  async(req: Request, res: Response): Promise <void> => {
    const response = validate(createUserSchema, req)
    if (!response.success) {
      throw new AppError(
        "Invalid input",
        400,
        response.errors
      );
    }
    
    const { name, email, password} = response.data!;
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
    const response = validate(loginUserSchema, req)
    if (!response.success) {
      throw new AppError(
        "Invalid input",
        400,
        response.errors
      );
    }

    const {email, password} = response.data!;

    const isExistingUser = await getUserByEmail(email);
    if(!isExistingUser) {
      throw new AppError("invalid credentials", 401)
    }

    const isValidPassword = await bcrypt.compare(password, isExistingUser.password)
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