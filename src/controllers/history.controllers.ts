import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { successResponse } from "../helper/responseHandler";
import * as historyServices from "../services/history.services";

/**
 * @method GET
 * @route /api/v1/history
 * @description Get all history
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Array} Array of users
 */

const getAllHistory = asyncHandler(async (req: Request, res: Response) => {
  const { count, history } = await historyServices.getAllHistory();

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "All history data fetched successfully",
    payload: {
      totalData: count,
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

const getSingleHistoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const history = await historyServices.getSingleHistoryById(id);

    // response send
    successResponse(res, {
      statusCode: 200,
      message: "History data fetched successfully",
      payload: {
        data: history,
      },
    });
  }
);

/**
 * @method POST
 * @route /api/v1/history
 * @description Create a history
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A history
 */

const createHistory = asyncHandler(async (req: any, res: Response) => {
  const history = await historyServices.createHistory(req);

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

const updateHistory = asyncHandler(async (req: any, res: Response) => {
  const history = await historyServices.updateHistory(req);

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

const deleteHistory = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const history = await historyServices.deleteHistory(id);

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

const deleteAllHistory = asyncHandler(async (req: Request, res: Response) => {
  await historyServices.deleteAllHistory();

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "All history data deleted successfully",
  });
});

export {
  createHistory,
  deleteAllHistory,
  deleteHistory,
  getAllHistory,
  getSingleHistoryById,
  updateHistory,
};
