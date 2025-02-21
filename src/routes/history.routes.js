// import express from "express";
// import {
//   createHistory,
//   deleteAllHistory,
//   deleteHistory,
//   getAllHistory,
//   getSingleHistoryById,
//   updateHistory,
// } from "../controllers/history.controllers.js";
// import { isLoggedIn } from "../middlewares/verify.js";
// import authorization from "../middlewares/authorization.js";
const express = require("express");
const {
  createHistory,
  deleteAllHistory,
  deleteHistory,
  getAllHistory,
  getSingleHistoryById,
  updateHistory,
} = require("../controllers/history.controllers");
const { isLoggedIn } = require("../middlewares/verify");
const authorization = require("../middlewares/authorization");

const historyRouter = express.Router();

historyRouter.use(isLoggedIn);

historyRouter
  .route("/")
  .get(getAllHistory)
  .post(authorization("superadmin"), createHistory);
historyRouter
  .route("/all-delete")
  .delete(authorization("superadmin"), deleteAllHistory);
historyRouter
  .route("/:id")
  .get(getSingleHistoryById)
  .put(authorization("superadmin", "admin"), updateHistory)
  .delete(authorization("superadmin"), deleteHistory);

// export default historyRouter;
module.exports = historyRouter;
