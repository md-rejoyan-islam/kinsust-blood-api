import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "../app/types";
import { errorResponse } from "../helper/responseHandler";
import User from "../models/user.model";

const isLoggedIn = asyncHandler(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    // get cookie from request
    const token =
      req?.cookies?.accessToken || req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      throw createError.Unauthorized(
        "Unauthorized, Access token not found. Please login."
      );
    }

    jwt.verify(
      token,
      process.env.JWT_LOGIN_SECRET_KEY!,
      async (err: any, decode: any) => {
        if (err) {
          // clear cookie
          res?.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          });

          errorResponse(res, {
            statusCode: 401,
            message: "Unauthorized, Invalid access token.Please login again",
          });
        }
        const loginUser = await User.findOne({
          where: { email: decode.email },
        });

        // if have valid cookie but user not found
        if (!loginUser) {
          // clear cookie
          res.clearCookie("accessToken");
          // send response
          return errorResponse(res, {
            statusCode: 401,
            message: "User not found. Please login again.",
          });
        }

        req.me = loginUser;
        next();
      }
    );
  }
);

const isLoggedOut = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get cookie from request
    const token =
      req?.cookies?.accessToken || req?.headers?.authorization?.split(" ")[1];

    if (token) {
      jwt.verify(token, process.env.JWT_LOGIN_SECRET_KEY!, (err: any) => {
        if (err) {
          // delete client cookie
          res?.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          });
          next();
        } else {
          throw createError(400, "User is already logged in");
        }
      });
    }

    next();
  }
);

export { isLoggedIn, isLoggedOut };
