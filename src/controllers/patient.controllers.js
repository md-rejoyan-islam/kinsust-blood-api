const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { successResponse } = require("../helper/responseHandler");
const crypto = require("crypto");
const PatientModel = require("../../models/patient.model");

/**
 * @method GET
 * @route /api/v1/patient
 * @description Get all patient
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Array} Array of users
 */

const getAllPatients = asyncHandler(async (req, res, next) => {
  // get all patient
  const { count, rows: patients } = await PatientModel.findAndCountAll();

  // if no patient found
  if (!count) throw createError(400, "Couldn't find any patient data.");

  // response send
  successResponse(res, {
    statusCode: 200,
    totalData: count,
    message: "All Patient data fetched successfully",
    payload: {
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

const createPatient = asyncHandler(async (req, res, next) => {
  const { phone, bloodGroup, location } = req.body;

  if (!phone) throw createError(400, "Phone number is required");
  if (!bloodGroup) throw createError(400, "Blood Group is required");
  if (!location) throw createError(400, "Location is required");

  // check phone number
  const patient = await PatientModel.findOne({ where: { phone } });

  if (patient) throw createError(400, "Phone number already exists");

  // create patient
  const result = await PatientModel.create({
    id: crypto.randomUUID(),
    ...req.body,
    editedBy: req?.me?.email,
  });

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

const updatePatientDataById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  // find patient by id
  const patient = await PatientModel.findByPk(id);

  // if patient data not found
  if (!patient) throw createError(400, "Couldn't find any patient data.");

  // update patient
  await PatientModel.update(
    {
      ...req.body,
      editedBy: req?.me?.email,
    },
    {
      where: { id },
    }
  );

  // updated data
  const result = await PatientModel.findByPk(id);

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

const deletePatient = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  // find patient by id
  const patient = await PatientModel.findByPk(id);

  // if patient data not found
  if (!patient) throw createError(400, "Couldn't find any patient data.");

  // delete patient
  await PatientModel.destroy({ where: { id } });

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "patient data deleted successfully",
    payload: {
      data: patient,
    },
  });
});

module.exports = {
  getAllPatients,
  createPatient,
  updatePatientDataById,
  deletePatient,
};
