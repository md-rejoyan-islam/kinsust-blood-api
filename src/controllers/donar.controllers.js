// import { successResponse } from "../helper/responseHandler.js";
// import asyncHandler from "express-async-handler";
// import DonarModel from "../models/donar.model.js";
// import createError from "http-errors";
// import HistoryModel from "../models/history.model.js";
// import filterQuery from "../helper/filterQuery.js";

const { successResponse } = require("../helper/responseHandler");
const asyncHandler = require("express-async-handler");
const DonarModel = require("../../models/donar.model");
const createError = require("http-errors");
const HistoryModel = require("../../models/history.model");
const filterQuery = require("../helper/filterQuery");
const crypto = require("crypto");
const csv = require("csvtojson");

const { readFileSync } = require("fs");
const { checkBDPhoneNumber, isEmail } = require("../helper/helper");

/**
 *
 * @method GET
 * @route /api/v1/blood
 * @description Get all bloods
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Array} Array of bloods
 */

const getAllBloodDonars = asyncHandler(async (req, res, next) => {
  // filter query
  const { queries, filters } = filterQuery(req);

  // get all bloods
  const { count, rows: donars } = await DonarModel.findAndCountAll({
    where: {
      ...filters,
    },
    order: queries.sortBy,
    attributes: queries.fields,
    // limit: queries.limit,
    offset: queries.offset,
  });
  // if no blood found
  if (!count) throw createError(400, "Couldn't find any donar data.");

  // page & limit
  const page = queries.page;
  const limit = queries.limit;

  // pagination object
  const pagination = {
    totalDocuments: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    previousPage: page > 1 ? page - 1 : null,
    nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
  };

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "All Donar data fetched successfully",
    payload: {
      total: count,
      data: donars,
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

const getSingleBloodDonarById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  // find blood donar by id
  const donar = await DonarModel.findByPk(id);

  // if donar data not found
  if (!donar) throw createError(400, "Couldn't find any donar data.");

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Blood donor data fetched successfully",
    payload: {
      data: donar,
    },
  });
});

/**
 * @method POST
 * @route /api/v1/blood
 * @description Create a new blood donor
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} Created blood donor
 */

const createBloodDonar = asyncHandler(async (req, res, next) => {
  const { name, phone, bloodGroup } = req.body;
  // name validation
  if (!name) throw createError.BadRequest("Name is required.");
  // phone validation
  if (!phone) throw createError.BadRequest("Phone number is required.");
  // blood group validation
  if (!bloodGroup) throw createError.BadRequest("Blood group is required.");

  // check donar phone number
  const existingDonar = await DonarModel.findOne({
    where: { phone: req.body.phone },
  });

  //  donar already exists
  if (existingDonar) throw createError(404, "Phone number already exists.");

  // create donar data
  const result = await DonarModel.create({
    ...req.body,
    id: crypto.randomUUID(),
    lastEditedBy: req?.me?.email,
    lastDonationDate: req?.body?.lastDonationDate
      ? req?.body?.lastDonationDate
      : null,
  });

  // response send
  successResponse(res, {
    statusCode: 200,
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

const updateBloodDonarById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  // find donar by id
  const donarData = await DonarModel.findByPk(id);

  // if donar data not found
  if (!donarData) throw createError(400, "Couldn't find any donar data.");

  // update options
  const updateOptions = {
    ...req.body,
    lastEditedBy: req?.me?.email,
  };

  // update donar data
  await DonarModel.update(updateOptions, {
    where: {
      id,
    },
    returning: true,
    // check validation for update
    validate: true,
  });

  // if have donar Last donation date then add it to history

  if (req?.body?.lastDonationDate) {
    // create history data
    await HistoryModel.create({
      name: donarData.name,
      bloodGroup: donarData.bloodGroup,
      lastDonationDate: req.body.lastDonationDate,
      donarId: id,
      id: crypto.randomUUID(),
      phone: donarData.phone,
      editedBy: req?.me?.email,
    });
  }

  // find updated data
  const donar = await DonarModel.findByPk(id);

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Blood donor date updated successfully",
    payload: {
      data: donar,
    },
  });
});

/**
 * @method DELETE
 * @route /api/v1/blood/:id
 * @description Delete a blood donor data
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} Deleted blood donor
 */

const deleteBloodDonarById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  // find donar by id
  const donar = await DonarModel.findByPk(id);

  // if donar data not found
  if (!donar) throw createError(400, "Couldn't find any donar data.");

  // data  delete from database
  await donar.destroy({
    where: { id },
  });

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Blood donor deleted successfully",
    payload: {
      data: donar,
    },
  });
});

/**
 * @method DELETE
 * @route /api/v1/donars/bulk-create
 * @description Bulk create blood donor data
 * @access Private
 * @private superadmin can access this route
 * @returns {Object} Deleted blood donor
 */

const bulkCreateBloodDonar = asyncHandler(async (req, res, next) => {
  // data will be array
  if (!Array.isArray(req.body))
    throw createError(400, "Data must be an array of object.");

  // before all data
  const beforeAllData = await DonarModel.findAll({
    attributes: ["phone"],
  });
  // all phone numbers
  const allPhoneNumbers = beforeAllData.map((data) => data.phone);

  // data validation
  req.body.filter((item, index) => {
    // id generate
    item.id = crypto.randomUUID();

    // name, phone number and blood group is required
    if (!item.name || !item.phone || !item.bloodGroup) {
      throw createError.BadRequest(
        `Name, phone number and blood group is required for index : ${index}`
      );
    }
    // phone number check for duplicate
    else if (allPhoneNumbers.includes(item.phone)) {
      throw createError.BadRequest(
        `Phone number already exists for index : ${index}`
      );
    }
  });

  // before all data delete
  // await DonarModel.destroy({
  //   where: {},
  //   truncate: true,
  // });

  // data  delete from database
  await DonarModel.bulkCreate({
    ...req.body,
    lastEditedBy: req?.me?.email,
  });

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Blood donor created successfully",
  });
});

/**
 * @method DELETE
 * @route /api/v1/donars/bulk-delete
 * @description Bulk delete blood donor data
 * @access Private
 * @private superadmin or admin can access this route
 * @returns {Object} Deleted blood donor
 */

const bulkDeleteBloodDonar = asyncHandler(async (req, res, next) => {
  const { ids } = req.body;

  if (!ids) throw createError(400, "Ids are required.");

  // data will be array
  if (!Array.isArray(ids))
    throw createError(400, "Ids must be an object of array.");

  const allDonars = await DonarModel.findAll({
    attributes: ["id"],
  });

  if (!allDonars) throw createError(400, "Couldn't find any donar data.");

  // convert in array
  const allDonarIds = allDonars.map((data) => data.id);

  // check all ids are exists
  ids.filter((id, index) => {
    if (!allDonarIds.includes(id))
      throw createError(
        400,
        `Donar id ${id} not found.Index number : ${index}`
      );
  });

  // delete multiple data
  await DonarModel.destroy({
    where: {
      id: ids,
    },
  });

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Delete selected blood donor .",
    payload: {
      data: ids,
    },
  });
});

/**
 * @method PATCH
 * @route /api/v1/donars/
 * @description JSON / CSV file upload to create blood donor data
 * @access Private
 * @private superadmin can access this route
 * @returns {Object} Deleted blood donor
 */

const uploadDonarFile = asyncHandler(async (req, res, next) => {
  const {} = req.me;
  const file = readFileSync(req.file.path, "utf-8");

  // fle type
  const fileType = req.file.mimetype.split("/")[1];

  let fileData = null;

  if (fileType === "json") {
    // convert json to array
    fileData = JSON.parse(file);
  } else if (fileType === "csv") {
    // csv file convert to json
    const jsonData = await csv().fromFile(req.file.path);
    fileData = jsonData.map((data) => {
      return {
        name: data.name,
        phone: data.phone,
        department: data.department,
        homeDistrict: data.homeDistrict,
        bloodGroup: data.bloodGroup,
        lastDonationDate: data.lastDonationDate ?? null,
        email: data.email ?? null,
        age: data.age ?? null,
        session: data.session ?? null,
        totalDonation: data.totalDonation ?? null,
        comment: data.comment ?? null,
      };
    });
  }

  // data will be array
  if (!Array.isArray(fileData))
    throw createError(400, "Data must be an array of object.");

  // before all data
  const beforeAllData = await DonarModel.findAll({
    attributes: ["phone"],
  });
  // all phone numbers
  const allPhoneNumbers = beforeAllData.map((data) => data.phone);

  // data validation
  fileData.filter((item, index) => {
    // id generate
    item.id = crypto.randomUUID();

    // name, phone number and blood group is required
    if (!item.name || !item.phone || !item.bloodGroup) {
      throw createError.BadRequest(
        `Name, phone number and blood group is required for index : ${index}`
      );
    }
    // phone number check for duplicate
    else if (allPhoneNumbers.includes(item.phone)) {
      throw createError.BadRequest(
        `Phone number already exists for index : ${index}`
      );
    }

    // phone number validation
    if (!checkBDPhoneNumber(item?.phone)) {
      throw createError.BadRequest(
        `Phone number is not valid for index : ${index}`
      );
    }

    // email validation

    if (item?.email && !isEmail(item?.email)) {
      throw createError.BadRequest(`Email is not valid for index : ${index}`);
    }
  });

  // add edited by
  fileData = fileData.map((data) => {
    return {
      ...data,
      lastEditedBy: req?.me?.email,
    };
  });

  // data  delete from database
  await DonarModel.bulkCreate(fileData);

  const result = await DonarModel.findAll();
  const total = result.length;

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Blood donor created successfully",
    total,
    payload: {
      data: result,
    },
  });
});

// export {
//   getAllBloodDonars,
//   getSingleBloodDonarById,
//   createBloodDonar,
//   updateBloodDonarById,
//   deleteBloodDonarById,
//   bulkCreateBloodDonar,
// };
module.exports = {
  getAllBloodDonars,
  getSingleBloodDonarById,
  createBloodDonar,
  updateBloodDonarById,
  deleteBloodDonarById,
  bulkCreateBloodDonar,
  uploadDonarFile,
  bulkDeleteBloodDonar,
};
