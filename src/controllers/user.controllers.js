// import UserModel from "../models/user.model.js";
// import createError from "http-errors";
// import asyncHandler from "express-async-handler";
// import { successResponse } from "../helper/responseHandler.js";
// import hashPassword from "../helper/hashPassword.js";

const UserModel = require("../../models/user.model");
const createError = require("http-errors");
const asyncHandler = require("express-async-handler");
const { successResponse } = require("../helper/responseHandler");
const hashPassword = require("../helper/hashPassword");
const crypto = require("crypto");

/**
 * @method GET
 * @route /api/v1/user
 * @description Get all users
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Array} Array of users
 */

const getAllUsers = asyncHandler(async (req, res, next) => {
  // get all users
  const { count, rows: users } = await UserModel.findAndCountAll({});
  // if no user found
  if (!count) throw createError(400, "Couldn't find any user data.");

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "All user data fetched successfully",
    payload: {
      total: count,
      data: users,
    },
  });
});

/**
 * @method GET
 * @route /api/v1/user/:id
 * @description Get a user
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A user
 */

const getSingleUserById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  // find user by id
  const user = await UserModel.findByPk(id);

  // if user data not found
  if (!user) throw createError(400, "Couldn't find any user data.");

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "User data fetched successfully",
    payload: {
      data: user,
    },
  });
});

/**
 * @method POST
 * @route /api/v1/user
 * @description Create a user
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A user
 */

const createUser = asyncHandler(async (req, res, next) => {
  // email is required
  if (!req.body.email) throw createError(400, "Email is required.");

  // user check
  const user = await UserModel.findOne({
    where: { email: req.body.email },
  });
  if (user) throw createError.BadRequest("Email already exists.");

  // create user
  const result = await UserModel.create({
    ...req.body,
    id: crypto.randomUUID(),
  });

  // response send
  successResponse(res, {
    statusCode: 201,
    message: "User created successfully",
    payload: {
      data: result,
    },
  });
});

/**
 * @method PUT
 * @route /api/v1/user/:id
 * @description Update a user
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A user
 */

const updateUserById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  // find user by id
  const user = await UserModel.findByPk(id);

  // if user data not found
  if (!user) throw createError(400, "Couldn't find any user data.");

  // if email changed
  let userByEmail = null;

  if (req?.body?.email) {
    userByEmail = await UserModel.findOne({
      where: { email: req.body.email },
    });
  }

  // if email already exists
  if (userByEmail && userByEmail.id !== id)
    throw createError.BadRequest("Email already exists.");

  // if role changed to superAdmin
  if (req.body.role === "superAdmin")
    throw createError(400, "You can't update role to superAdmin.");

  console.log(userByEmail);
  // update user data
  await UserModel.update({ ...req.body }, { where: { id } });

  const result = await UserModel.findByPk(id);

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "User updated successfully",
    payload: {
      data: result,
    },
  });
});

/**
 * @method DELETE
 * @route /api/v1/user/:id
 * @description Delete a user
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A user
 */

const deleteUserById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  // find user by id
  const user = await UserModel.findByPk(id);

  // if user data not found
  if (!user) throw createError(400, "Couldn't find any user data.");

  // if user is superAdmin
  if (user.role === "superAdmin")
    throw createError(400, "You can't delete superAdmin.");

  // delete user data
  await user.destroy();

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "User deleted successfully",
    payload: {
      data: user,
    },
  });
});

/**
 *
 * @apiDescription    Password reset
 * @apiMethod         PUT
 *
 * @apiRoute          /api/v1/auth/password-reset
 * @apiAccess         registered user
 *
 * @apiBody           { email,password,code}
 *
 * @apiSuccess        { success: true , message: Successfully password updated., data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 */

const passwordChange = asyncHandler(async (req, res) => {
  // get password , code , email
  const { password } = req.body;
  const { id } = req.params;

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
      returning: true,
      plain: true,
    }
  );

  // updated data
  const result = await UserModel.findByPk(id, {
    // attributes: { exclude: ["password"] },
  });

  // success response send
  successResponse(res, {
    statusCode: 200,
    message: "Successfully password updated.",
    payload: {
      data: result,
    },
  });
});

// export the functions
// export {
//   getAllUsers,
//   getSingleUserById,
//   createUser,
//   updateUserById,
//   deleteUserById,
//   passwordChange,
// };
module.exports = {
  getAllUsers,
  getSingleUserById,
  createUser,
  updateUserById,
  deleteUserById,
  passwordChange,
};
