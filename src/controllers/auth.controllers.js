// import createError from "http-errors";
// import asyncHandler from "express-async-handler";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import User from "../models/user.model.js";
// import matchPassword from "../helper/matchPassword.js";
// import { successResponse } from "../helper/responseHandler.js";
// import createJWT from "../helper/createJWT.js";
// import hashPassword from "../helper/hashPassword.js";
const createError = require("http-errors");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/user.model");
const matchPassword = require("../helper/matchPassword");
const { successResponse } = require("../helper/responseHandler");
const createJWT = require("../helper/createJWT");
const hashPassword = require("../helper/hashPassword");
const crypto = require("crypto");

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
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) throw createError(400, "Please provide email");
  if (!password) throw createError(400, "Please provide password");

  // get user by emaill
  const user = await User.findOne({
    where: { email },
  });

  // user check
  if (!user)
    throw createError(
      400,
      "Couldn't find any user account!. Please contact us."
    );

  //  password match
  matchPassword(password, user.password);

  // create  access token
  const accessToken = createJWT(
    { email },
    process.env.JWT_LOGIN_SECRET_KEY,
    process.env.JWT_LOGIN_EXPIRE
  );

  // response send
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 1, // 1 days
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
const userLogout = (req, res) => {
  res?.clearCookie("accessToken", {
    httpOnly: true,
    secure: true, // only https
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
const me = asyncHandler(async (req, res) => {
  if (!req?.me) {
    throw createError.Unauthorized(
      "Couldn't find any user account!. Please register."
    );
  }
  successResponse(res, {
    statusCode: 200,
    message: "Login User Data.",
    payload: {
      data: req.me,
    },
  });
});

module.exports = { userLogin, userLogout, me };
