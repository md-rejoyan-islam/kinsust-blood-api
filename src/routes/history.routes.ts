import express from "express";
import {
  createHistory,
  deleteAllHistory,
  deleteHistory,
  getAllHistory,
  getSingleHistoryById,
  updateHistory,
} from "../controllers/history.controllers";
import { isLoggedIn } from "../middlewares/verify";
import authorization from "../middlewares/authorization";

const historyRouter = express.Router();

historyRouter.use(isLoggedIn);

import validate from "../middlewares/validate";
import {
  createHistorySchema,
  updateHistorySchema,
} from "../validations/history.validation";

historyRouter
  .route("/")
  .get(getAllHistory)
  .post(
    authorization("superadmin"),
    validate(createHistorySchema),
    createHistory
  );
historyRouter
  .route("/all-delete")
  .delete(authorization("superadmin"), deleteAllHistory);
historyRouter
  .route("/:id")
  .get(getSingleHistoryById)
  .put(
    authorization("superadmin", "admin"),
    validate(updateHistorySchema),
    updateHistory
  )
  .delete(authorization("superadmin"), deleteHistory);

export default historyRouter;
