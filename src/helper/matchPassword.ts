import bcrypt from "bcryptjs";
import createError from "http-errors";

const matchPassword = (password: string, hashPassword?: string) => {
  if (!hashPassword) {
    throw createError(400, "Password not set");
  }
  const isMatch = bcrypt.compareSync(password, hashPassword);

  if (!isMatch) {
    throw createError(400, "Wrong password");
  }
};

export default matchPassword;
