import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { RequestWithUser } from "../app/types";
import { successResponse } from "../helper/responseHandler";
import * as userServices from "../services/user.services";

/**
 * @method GET
 * @route /api/v1/user
 * @description Get all users
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Array} Array of users
 */

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const { count, users } = await userServices.getAllUsers();

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

const getSingleUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await userServices.getSingleUserById(id);

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

const createUser = asyncHandler(async (req: RequestWithUser, res: Response) => {
  const userRole = req.me?.role;

  const result = await userServices.createUser(req.body, userRole);

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

const updateUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await userServices.updateUserById(id, req.body);

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

const deleteUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await userServices.deleteUserById(id);

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

const passwordChange = asyncHandler(async (req: Request, res: Response) => {
  const { password } = req.body;
  const { id } = req.params;
  const result = await userServices.passwordChange(id, password);

  // success response send
  successResponse(res, {
    statusCode: 200,
    message: "Successfully password updated.",
    payload: {
      data: result,
    },
  });
});

export {
  createUser,
  deleteUserById,
  getAllUsers,
  getSingleUserById,
  passwordChange,
  updateUserById,
};
