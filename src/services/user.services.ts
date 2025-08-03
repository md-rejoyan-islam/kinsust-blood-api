import crypto from "crypto";
import createError from "http-errors";
import UserModel from "../models/user.model";

const getAllUsers = async () => {
  // get all users
  const { count, rows: users } = await UserModel.findAndCountAll({});
  // if no user found
  if (!count) throw createError(400, "Couldn't find any user data.");

  return { count, users };
};

const getSingleUserById = async (id: string) => {
  // find user by id
  const user = await UserModel.findByPk(id);

  // if user data not found
  if (!user) throw createError(400, "Couldn't find any user data.");

  return user;
};

const createUser = async (body: any, role: string) => {
  // email is required
  if (!body.email) throw createError(400, "Email is required.");

  // user check
  const user = await UserModel.findOne({
    where: { email: body.email },
  });

  // can't create superAdmin user
  if (body.role === "superAdmin")
    throw createError(400, "You can't create superAdmin user.");

  // admin can't create superAdmin user
  if (body.role === "admin" && role !== "superAdmin")
    throw createError(
      400,
      "You can't create admin user.Only superAdmin can create admin user."
    );

  if (user) throw createError.BadRequest("Email already exists.");

  // create user
  const result = await UserModel.create({
    ...body,
    id: crypto.randomUUID(),
  });

  return result;
};

const updateUserById = async (id: string, body: any) => {
  // find user by id
  const user = await UserModel.findByPk(id);

  // if user data not found
  if (!user) throw createError(400, "Couldn't find any user data.");

  // if email changed
  let userByEmail = null;

  if (body?.email) {
    userByEmail = await UserModel.findOne({
      where: { email: body.email },
    });
  }

  // if email already exists
  if (userByEmail && userByEmail.id !== id)
    throw createError.BadRequest("Email already exists.");

  // if role changed to superAdmin
  if (body.role === "superAdmin")
    throw createError(400, "You can't update role to superAdmin.");

  // update user data
  await UserModel.update({ ...body }, { where: { id } });

  const result = await UserModel.findByPk(id);

  return result;
};

const deleteUserById = async (id: string) => {
  // find user by id
  const user = await UserModel.findByPk(id);

  // if user data not found
  if (!user) throw createError(400, "Couldn't find any user data.");

  // if user is superAdmin
  if (user.role === "superadmin")
    throw createError(400, "You can't delete superAdmin.");

  // delete user data
  await user.destroy();

  return user;
};

const passwordChange = async (id: string, password?: string) => {
  // user check
  const user = await UserModel.findByPk(id);
  if (!user)
    throw createError(400, "Couldn't find any user account with this id");

  // if password not found
  if (!password) throw createError(400, "Please provide password");

  // update user data
  await UserModel.update(
    {
      password,
    },
    {
      where: { id },
    }
  );

  // updated data
  const result = await UserModel.findByPk(id, {
    // attributes: { exclude: ["password"] },
  });

  return result;
};

export {
  createUser,
  deleteUserById,
  getAllUsers,
  getSingleUserById,
  passwordChange,
  updateUserById,
};
