import crypto from "crypto";
import type { Request } from "express";
import createError from "http-errors";
import { userRoleEnum } from "../app/types";
import filterQuery from "../helper/filterQuery";
import UserModel from "../models/user.model";

const getAllUsers = async (req: Request) => {
  // filter query
  const { queries, filters } = filterQuery(req);

  // get all users
  const { count, rows: users } = await UserModel.findAndCountAll({
    where: {
      ...filters,
    },
    order: queries.sortBy,
    attributes: queries.fields,
    limit: queries.limit,
    offset: queries.offset,
  });

  // page & limit
  const page = queries.page;
  const limit = queries.limit;

  // pagination object
  const pagination = {
    totalDocuments: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    previousPage: page > 1 ? page - 1 : null,
    nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
  };

  return { users, pagination };
};

const getSingleUserById = async (id: string) => {
  // find user by id
  const user = await UserModel.findByPk(id, {
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });

  // if user data not found
  if (!user) throw createError.NotFound("Couldn't find any user data.");

  return user;
};

const createUser = async (
  body: {
    email: string;
    password: string;
    name: string;
    role: string;
  },
  role: string
) => {
  // user check
  const user = await UserModel.findOne({
    where: { email: body.email },
  });

  // can't create superadmin user
  if (body.role === "superadmin")
    throw createError(400, "You can't create superadmin user.");

  // admin can't create superadmin user
  if (body.role === "admin" && role !== "superadmin")
    throw createError(
      400,
      "You can't create admin user.Only superadmin can create admin user."
    );

  if (user) throw createError.Conflict("Email already exists.");

  console.log({
    ...body,
    role: body.role as keyof typeof userRoleEnum,
    id: crypto.randomUUID(),
  });

  // create user
  const result = await UserModel.create({
    ...body,
    role: body.role as keyof typeof userRoleEnum,
    id: crypto.randomUUID(),
  });

  return result;
};

const updateUserById = async (
  id: string,
  body: {
    email?: string;
    name?: string;
    password?: string;
    role?: string;
  }
) => {
  // find user by id
  const user = await UserModel.findByPk(id);

  // if user data not found
  if (!user) throw createError(400, "Couldn't find any user data.");

  // can't update superadmin user
  if (body.role === "superadmin" && user.id !== id) {
    throw createError(400, "You can't update superadmin user.");
  }

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

  // if role changed to superadmin
  if (body.role === "superadmin")
    throw createError(400, "You can't update role to superadmin.");

  // update user data
  await UserModel.update(
    {
      ...body,
      role: body.role as keyof typeof userRoleEnum,
    },
    { where: { id } }
  );

  const result = await UserModel.findByPk(id);

  return result;
};

const deleteUserById = async (id: string, role: string) => {
  // find user by id
  const user = await UserModel.findByPk(id);

  // if user data not found
  if (!user) throw createError.NotFound("Couldn't find any user data.");

  // if user is admin and trying to delete other admin
  if (user.role.toString() === "admin" && role === "admin" && user.id !== id)
    throw createError(400, "You can't delete admin user.");

  // if user is superadmin
  if (user.role?.toString() === "superadmin")
    throw createError(400, "You can't delete superadmin.");

  // delete user data
  await user.destroy();

  return user;
};

const passwordChange = async (id: string, password?: string) => {
  // user check
  const user = await UserModel.findByPk(id);
  if (!user)
    throw createError(400, "Couldn't find any user account with this id");

  // if user is superadmin
  if (user.role?.toString() === "superadmin" && id !== user.id)
    throw createError(400, "You can't change superadmin password.");

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
    attributes: { exclude: ["password"] },
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
