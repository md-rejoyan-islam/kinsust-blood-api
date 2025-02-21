// import asyncHandler from "express-async-handler";
// import createError from "http-errors";
// import { successResponse } from "../helper/responseHandler.js";
// import HistoryModel from "../models/history.model.js";
// import DonarModel from "../models/donar.model.js";

const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { successResponse } = require("../helper/responseHandler");
const HistoryModel = require("../../models/history.model");
const DonarModel = require("../../models/donar.model");
const crypto = require("crypto");

/**
 * @method GET
 * @route /api/v1/history
 * @description Get all history
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Array} Array of users
 */

const getAllHistory = asyncHandler(async (req, res, next) => {
  // get all history
  const { count, rows: history } = await HistoryModel.findAndCountAll({});
  // if no history found
  if (!count) throw createError(400, "Couldn't find any history data.");

  // response send
  successResponse(res, {
    statusCode: 200,
    totalData: count,
    message: "All history data fetched successfully",
    payload: {
      data: history,
    },
  });
});

/**
 * @method GET
 * @route /api/v1/history/:id
 * @description Get a history
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A history
 */

const getSingleHistoryById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  // find history by id
  const history = await HistoryModel.findByPk(id);

  // if history data not found
  if (!history) throw createError(400, "Couldn't find any history data.");

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "History data fetched successfully",
    payload: {
      data: history,
    },
  });
});

/**
 * @method POST
 * @route /api/v1/history
 * @description Create a history
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A history
 */

const createHistory = asyncHandler(async (req, res, next) => {
  const { donarId } = req.body;

  if (!donarId) throw createError.BadRequest("Donar id is required!");

  // donar id check
  const donar = await DonarModel.findByPk(donarId);

  // if donar data not found
  if (!donar) throw createError.BadRequest("Donar id not found.");

  // create history
  const history = await HistoryModel.create({
    id: crypto.randomUUID(),
    name: donar.name,
    bloodGroup: donar.bloodGroup,
    donarId: donar.id,
    lastDonationDate: donar.lastDonationDate,
    phone: donar.phone,
    editedBy: req?.me?.email,
  });

  // response send
  successResponse(res, {
    statusCode: 201,
    message: "History data created successfully",
    payload: {
      data: history,
    },
  });
});

/**
 * @method PUT
 * @route /api/v1/history/:id
 * @description Update a history
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A history
 */

const updateHistory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  // find history by id
  const history = await HistoryModel.findByPk(id);

  // if history data not found
  if (!history) throw createError(400, "Couldn't find any history data.");

  // update history
  await history.update({
    ...req.body,
    editedBy: req?.me?.email,
  });

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "History data updated successfully",
    payload: {
      data: history,
    },
  });
});

/**
 * @method DELETE
 * @route /api/v1/history/:id
 * @description Delete a history
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A history
 */

const deleteHistory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  // find history by id
  const history = await HistoryModel.findByPk(id);

  // if history data not found
  if (!history) throw createError(400, "Couldn't find any history data.");

  // delete history
  await history.destroy();

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "History data deleted successfully",
    payload: {
      data: history,
    },
  });
});

/**
 * @method DELETE
 * @route /api/v1/history
 * @description Delete all history
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A history
 */

const deleteAllHistory = asyncHandler(async (req, res, next) => {
  // delete history
  await HistoryModel.destroy({
    where: {},
    truncate: true,
  });

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "All history data deleted successfully",
  });
});

module.exports = {
  getAllHistory,
  getSingleHistoryById,
  createHistory,
  updateHistory,
  deleteHistory,
  deleteAllHistory,
};
