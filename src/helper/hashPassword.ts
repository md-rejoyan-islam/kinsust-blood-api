import bcrypt from "bcryptjs";
import createError from "http-errors";

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);
  return passwordHash;
};

export const matchPassword = (password: string, hashPassword?: string) => {
  if (!hashPassword) {
    throw createError(400, "Password not set");
  }
  const isMatch = bcrypt.compareSync(password, hashPassword);

  if (!isMatch) {
    throw createError(400, "Wrong password");
  }
};
