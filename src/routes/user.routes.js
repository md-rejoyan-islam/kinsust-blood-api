// import express from "express";
// import {
//   createUser,
//   deleteUserById,
//   getAllUsers,
//   getSingleUserById,
//   passwordChange,
//   updateUserById,
// } from "../controllers/user.controllers.js";
// import { isLoggedIn } from "../middlewares/verify.js";
// import authorization from "../middlewares/authorization.js";

const express = require("express");
const {
  createUser,
  deleteUserById,
  getAllUsers,
  getSingleUserById,
  passwordChange,
  updateUserById,
} = require("../controllers/user.controllers");
const { isLoggedIn } = require("../middlewares/verify");
const authorization = require("../middlewares/authorization");

const userRouter = express.Router();

userRouter.use(isLoggedIn);

// get all users and create a new user data
userRouter
  .route("/")
  .get(getAllUsers)
  .post(authorization("admin", "superadmin"), createUser);

// password change
userRouter
  .route("/password-change/:id")
  .put(authorization("superadmin", "admmin", "moderator"), passwordChange);

// get,update and delete a user data
userRouter
  .route("/:id")
  .get(authorization("admin", "superadmin", "moderator"), getSingleUserById)
  .put(authorization("admin", "superadmin", "moderator"), updateUserById)
  .delete(authorization("admin", "superadmin"), deleteUserById);

// export router
// export default userRouter;
module.exports = userRouter;
