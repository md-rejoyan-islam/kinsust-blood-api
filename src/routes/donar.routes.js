// import express from "express";
// import {
//   bulkCreateBloodDonar,
//   createBloodDonar,
//   deleteBloodDonarById,
//   getAllBloodDonars,
//   getSingleBloodDonarById,
//   updateBloodDonarById,
// } from "../controllers/donar.controllers.js";
// import { isLoggedIn } from "../middlewares/verify.js";
// import authorization from "../middlewares/authorization.js";

const express = require("express");
const {
  bulkCreateBloodDonar,
  createBloodDonar,
  deleteBloodDonarById,
  getAllBloodDonars,
  getSingleBloodDonarById,
  updateBloodDonarById,
  uploadDonarFile,
  bulkDeleteBloodDonar,
} = require("../controllers/donar.controllers");
const { isLoggedIn } = require("../middlewares/verify");
const authorization = require("../middlewares/authorization");
const fileUpload = require("../helper/multer");

const bloodRouter = express.Router();

bloodRouter.use(isLoggedIn);

// get all blood donors and create a new blood donor data
bloodRouter
  .route("/")
  .get(getAllBloodDonars)
  .post(authorization("admin", "superadmin", "moderator"), createBloodDonar);

// bulk create
bloodRouter.route("/bulk-create").post(bulkCreateBloodDonar);

// bulk delete
bloodRouter.route("/bulk-delete").post(bulkDeleteBloodDonar);

// get,update and delete a blood donor data
bloodRouter
  .route("/:id")
  .get(
    authorization("admin", "superadmin", "moderator"),
    getSingleBloodDonarById
  )
  .put(updateBloodDonarById)
  .delete(authorization("admin", "superadmin"), deleteBloodDonarById);

bloodRouter.route("/file").post(fileUpload, uploadDonarFile);

// export router
// export default bloodRouter;
module.exports = bloodRouter;
