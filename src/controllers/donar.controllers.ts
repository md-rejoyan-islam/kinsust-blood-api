import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { RequestWithUser } from "../app/types";
import { successResponse } from "../helper/responseHandler";
import * as donarServices from "../services/donar.services";

/**
 *
 * @method GET
 * @route /api/v1/blood
 * @description Get all bloods
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Array} Array of bloods
 */

const getAllBloodDonars = asyncHandler(async (req: Request, res: Response) => {
  const { donars, pagination } = await donarServices.getAllBloodDonars(req);

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "All Donar data fetched successfully",
    payload: {
      data: donars,
      pagination,
    },
  });
});

/**
 * @method GET
 * @route /api/v1/blood/:id
 * @description Get a blood donor
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A blood donor
 */

const getSingleBloodDonarById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const donar = await donarServices.getSingleBloodDonarById(id);

    // response send
    successResponse(res, {
      statusCode: 200,
      message: "Blood donor data fetched successfully",
      payload: {
        data: donar,
      },
    });
  }
);

/**
 * @method POST
 * @route /api/v1/blood
 * @description Create a new blood donor
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} Created blood donor
 */

const createBloodDonar = asyncHandler(async (req: any, res: Response) => {
  const { name, phone, bloodGroup } = req.body;

  const result = await donarServices.createBloodDonar({
    name,
    phone,
    bloodGroup,
  });

  // response send
  successResponse(res, {
    statusCode: 201,
    message: "Blood donor created successfully",
    payload: {
      data: result,
    },
  });
});

/**
 * @method PUT
 * @route /api/v1/blood/:id
 * @description Update a blood donor
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} Updated blood donor
 */

const updateBloodDonarById = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const id = req.params.id;
    const lastEditedBy = req?.me?.email;
    const donar = await donarServices.updateBloodDonarById(
      id,
      req.body,
      lastEditedBy
    );

    // response send
    successResponse(res, {
      statusCode: 200,
      message: "Blood donor date updated successfully",
      payload: {
        data: donar,
      },
    });
  }
);

/**
 * @method DELETE
 * @route /api/v1/blood/:id
 * @description Delete a blood donor data
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} Deleted blood donor
 */

const deleteBloodDonarById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const donar = await donarServices.deleteBloodDonarById(id);

    // response send
    successResponse(res, {
      statusCode: 200,
      message: "Blood donor deleted successfully",
      payload: {
        data: donar,
      },
    });
  }
);

/**
 * @method DELETE
 * @route /api/v1/donars/bulk-create
 * @description Bulk create blood donor data
 * @access Private
 * @private superadmin can access this route
 * @returns {Object} Deleted blood donor
 */

const bulkCreateBloodDonar = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    // data will be array
    if (!Array.isArray(req.body))
      throw createError(400, "Data must be an array of object.");

    // const lastEditedBy = req?.me?.email;

    await donarServices.bulkCreateBloodDonar(req.body);

    // response send
    successResponse(res, {
      statusCode: 200,
      message: "Blood donor created successfully",
    });
  }
);

/**
 * @method DELETE
 * @route /api/v1/donars/bulk-delete
 * @description Bulk delete blood donor data
 * @access Private
 * @private superadmin or admin can access this route
 * @returns {Object} Deleted blood donor
 */

const bulkDeleteBloodDonar = asyncHandler(
  async (req: Request, res: Response) => {
    const { ids } = req.body;
    const result = await donarServices.bulkDeleteBloodDonar(ids);

    // response send
    successResponse(res, {
      statusCode: 200,
      message: "Delete selected blood donor .",
      payload: {
        data: result,
      },
    });
  }
);

/**
 * @method PATCH
 * @route /api/v1/donars/
 * @description JSON / CSV file upload to create blood donor data
 * @access Private
 * @private superadmin can access this route
 * @returns {Object} Deleted blood donor
 */

const uploadDonarFile = asyncHandler(async (req: any, res: Response) => {
  const { total, result } = await donarServices.uploadDonarFile(req);

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Blood donor created successfully",
    payload: {
      total,
      data: result,
    },
  });
});

export {
  bulkCreateBloodDonar,
  bulkDeleteBloodDonar,
  createBloodDonar,
  deleteBloodDonarById,
  getAllBloodDonars,
  getSingleBloodDonarById,
  updateBloodDonarById,
  uploadDonarFile,
};
