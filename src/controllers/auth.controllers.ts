import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { RequestWithUser } from "../app/types";
import { successResponse } from "../helper/responseHandler";
import * as authServices from "../services/auth.services";

/**
 *
 * @apiDescription    User login
 * @apiMethod         POST
 *
 * @apiRoute          /api/v1/auth/login
 * @apiAccess         public
 *
 * @apiBody           { email, password }
 *
 * @apiDenied         { isBanned: true }
 *
 * @apiSuccess        { success: true , message: Successfully Login, data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Bad Request 400 )     Invalid syntax / parameters
 * @apiError          ( Not Found: 404 )      Couldn't find any user account!. Please register.
 *
 */
const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, accessToken } = await authServices.userLogin(email, password);

  // response send
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    secure: true, // only https
    sameSite: "none",
  });

  successResponse(res, {
    statusCode: 200,
    message: "Successfully Login to KIN Blood.",
    payload: {
      data: user,
    },
  });
});

/**
 *
 * @apiDescription    User Logout
 * @apiMethod         POST
 *
 * @apiRoute          /api/v1/auth/logout
 * @apiAccess         Only Logged in user
 *
 * @apiCookie         accessToken
 *
 * @apiSuccess        { success: true , message: Successfully Logout }
 * @apiFailed         { success: false , error: { status, message }
 *
 */
const userLogout = (_req: Request, res: Response) => {
  // clear cookie
  res?.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Successfully Logout.",
  });
};

/**
 *
 * @apiDescription    Logged in user data
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/auth/me
 * @apiAccess         Only Logged in user
 *
 * @apiCookie         accessToken
 *
 * @apiSuccess        { success: true , message: Successfully Logout }
 * @apiFailed         { success: false , error: { status, message }
 *
 */
const me = asyncHandler(async (req: RequestWithUser, res: Response) => {
  const user = await authServices.me(req.me);
  successResponse(res, {
    statusCode: 200,
    message: "Login User Data.",
    payload: {
      data: user,
    },
  });
});

export { me, userLogin, userLogout };
