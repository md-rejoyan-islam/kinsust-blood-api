import createError from "http-errors";
import HistoryModel from "../models/history.model";
import DonarModel from "../models/donar.model";
import crypto from "crypto";

const getAllHistory = async () => {
  // get all history
  const { count, rows: history } = await HistoryModel.findAndCountAll({});
  // if no history found
  if (!count) throw createError(400, "Couldn't find any history data.");

  return { count, history };
};

const getSingleHistoryById = async (id: string) => {
  // find history by id
  const history = await HistoryModel.findByPk(id);

  // if history data not found
  if (!history) throw createError(400, "Couldn't find any history data.");

  return history;
};

const createHistory = async (req: any) => {
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
    lastDonationDate: donar.lastDonationDate!,
    phone: donar.phone,
    editedBy: req?.me?.email,
  });

  return history;
};

const updateHistory = async (req: any) => {
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

  return history;
};

const deleteHistory = async (id: string) => {
  // find history by id
  const history = await HistoryModel.findByPk(id);

  // if history data not found
  if (!history) throw createError(400, "Couldn't find any history data.");

  // delete history
  await history.destroy();

  return history;
};

const deleteAllHistory = async () => {
  // delete history
  await HistoryModel.destroy({
    where: {},
    truncate: true,
  });
};

export {
  getAllHistory,
  getSingleHistoryById,
  createHistory,
  updateHistory,
  deleteHistory,
  deleteAllHistory,
};
