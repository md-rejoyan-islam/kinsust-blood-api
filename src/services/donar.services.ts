import crypto from "crypto";
import csv from "csvtojson";
import { Request } from "express";
import { readFileSync } from "fs";
import createError from "http-errors";
import filterQuery from "../helper/filterQuery";
import { checkBDPhoneNumber, isEmail } from "../helper/helper";
import DonarModel from "../models/donar.model";
import HistoryModel from "../models/history.model";

const getAllBloodDonars = async (req: Request) => {
  // filter query
  const { queries, filters } = filterQuery(req);

  // get all bloods
  const { count, rows: donars } = await DonarModel.findAndCountAll({
    where: {
      ...filters,
    },
    order: queries.sortBy,
    attributes: queries.fields,
    limit: queries.limit,
    offset: queries.offset,
  });

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

  return { count, donars, pagination };
};

const getSingleBloodDonarById = async (id: string) => {
  // find blood donar by id
  const donar = await DonarModel.findByPk(id);

  // if donar data not found
  if (!donar) throw createError(400, "Couldn't find any donar data.");

  return donar;
};

const createBloodDonar = async (req: any) => {
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

  return result;
};

const updateBloodDonarById = async (req: any) => {
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
    // check validation for update
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

  return donar;
};

const deleteBloodDonarById = async (id: string) => {
  // find donar by id
  const donar = await DonarModel.findByPk(id);

  // if donar data not found
  if (!donar) throw createError(400, "Couldn't find any donar data.");

  // data  delete from database
  await donar.destroy({
    where: { id },
  } as any);

  return donar;
};

const bulkCreateBloodDonar = async (req: any) => {
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
  req.body.filter((item: any, index: number) => {
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

  // data  delete from database
  await DonarModel.bulkCreate({
    ...req.body,
    lastEditedBy: req?.me?.email,
  } as any);
};

const bulkDeleteBloodDonar = async (ids: string[]) => {
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
  ids.filter((id: any, index: number) => {
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

  return ids;
};

const uploadDonarFile = async (req: any) => {
  const {} = req.me;
  const file = readFileSync(req.file.path, "utf-8");

  // fle type
  const fileType = req.file.mimetype.split("/")[1];

  let fileData: any = null;

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
  fileData.filter((item: any, index: number) => {
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
  fileData = fileData.map((data: any) => {
    return {
      ...data,
      lastEditedBy: req?.me?.email,
    };
  });

  // data  delete from database
  await DonarModel.bulkCreate(fileData as any);

  const result = await DonarModel.findAll();
  const total = result.length;

  return { total, result };
};

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
