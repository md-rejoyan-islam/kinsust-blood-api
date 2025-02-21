// import express from "express";
// import { isLoggedIn, isLoggedOut } from "../middlewares/verify.js";
// import {
//   me,
//   userLogin,
//   userLogout,
// } from "../controllers/auth.controllers.js";
// import authorization from "../middlewares/authorization.js";
const express = require("express");
const { isLoggedIn, isLoggedOut } = require("../middlewares/verify");
const {
  me,
  userLogin,
  userLogout,
} = require("../controllers/auth.controllers");
const authRouter = express.Router();

// user login
authRouter.route("/login").post(isLoggedOut, userLogin);

// user logout
authRouter.route("/logout").post(isLoggedIn, userLogout);

// logged in user
authRouter.route("/me").get(isLoggedIn, me);

// export default authRouter;
module.exports = authRouter;
