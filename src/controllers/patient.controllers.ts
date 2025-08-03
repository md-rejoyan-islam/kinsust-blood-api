import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { successResponse } from "../helper/responseHandler";
import * as patientServices from "../services/patient.services";

/**
 * @method GET
 * @route /api/v1/patient
 * @description Get all patient
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Array} Array of users
 */

const getAllPatients = asyncHandler(async (req: Request, res: Response) => {
  const { count, patients } = await patientServices.getAllPatients();

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "All Patient data fetched successfully",
    payload: {
      totalData: count,
      data: patients,
    },
  });
});

/**
 * @method POST
 * @route /api/v1/patient
 * @description Create a pateint
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A patient
 */

const createPatient = asyncHandler(async (req: any, res: Response) => {
  const result = await patientServices.createPatient(req);

  // response send
  successResponse(res, {
    statusCode: 201,
    message: "Patient data created successfully",
    payload: {
      data: result,
    },
  });
});

/**
 * @method PUT
 * @route /api/v1/patient/:id
 * @description Update a patient
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A patient
 */

const updatePatientDataById = asyncHandler(async (req: any, res: Response) => {
  const result = await patientServices.updatePatientDataById(req);

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Patient data updated successfully",
    payload: {
      data: result,
    },
  });
});

/**
 * @method DELETE
 * @route /api/v1/patient/:id
 * @description Delete a patient
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A patient
 */

const deletePatient = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const patient = await patientServices.deletePatient(id);

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "patient data deleted successfully",
    payload: {
      data: patient,
    },
  });
});

export { createPatient, deletePatient, getAllPatients, updatePatientDataById };
