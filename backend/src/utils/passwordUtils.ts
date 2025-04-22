import bcrypt from "bcryptjs"

export async function validPassword(password: string, hashedPassword: string) {
  const res = await bcrypt.compare(password, hashedPassword);
  return res;
}

export async function genPassword(password: string) {
  const res = await bcrypt.hash(password, 10);
  return res;
}