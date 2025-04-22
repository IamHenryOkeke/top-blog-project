import { AppError } from "../error/errorHandler";
import { prisma } from "../prisma";

export async function registerUser(values: { name: string; email: string; password: string; }) {
  try {
    const data = await prisma.user.create({
      data: values
    })
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error inserting new user:", error.message);
    } else {
      console.error("Error inserting new user:", error);
    }
    throw new AppError("Internal server error", 500)
  }
}

export async function updateUser(id: string, values: any) {
  console.log(values);
  try {
    const data = await prisma.user.update({
      where: {id},
      data: values
    })
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error inserting new user:", error.message);
    } else {
      console.error("Error inserting new user:", error);
    }
    throw new AppError("Internal server error", 500)
  }
}

export async function getUserByEmail(email: string) {
  try {
    const data = await prisma.user.findUnique({
      where: { email }
    })
    return data;
  } catch (error) {
    throw new AppError("Internal server error", 500)
  }
}
