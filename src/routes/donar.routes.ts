import express from "express";
import {
  bulkCreateBloodDonar,
  bulkDeleteBloodDonar,
  createBloodDonar,
  deleteBloodDonarById,
  getAllBloodDonars,
  getSingleBloodDonarById,
  updateBloodDonarById,
  uploadDonarFile,
} from "../controllers/donar.controllers";
import fileUpload from "../helper/multer";
import authorization from "../middlewares/authorization";
import validate from "../middlewares/validate";
import { isLoggedIn } from "../middlewares/verify";
import {
  bulkDeleteDonarSchema,
  createDonarSchema,
  updateDonarSchema,
} from "../validations/donar.validation";

const bloodRouter = express.Router();

bloodRouter.use(isLoggedIn);

// get all blood donors and create a new blood donor data
bloodRouter
  .route("/")
  .get(getAllBloodDonars)
  .post(validate(createDonarSchema), createBloodDonar);

// bulk create
bloodRouter.route("/bulk-create").post(bulkCreateBloodDonar);

// bulk delete
bloodRouter
  .route("/bulk-delete")
  .post(validate(bulkDeleteDonarSchema), bulkDeleteBloodDonar);

// get,update and delete a blood donor data
bloodRouter
  .route("/:id")
  .get(
    authorization("admin", "superadmin", "moderator"),
    getSingleBloodDonarById
  )
  .put(validate(updateDonarSchema), updateBloodDonarById)
  .delete(authorization("admin", "superadmin"), deleteBloodDonarById);

bloodRouter.route("/file").post(fileUpload, uploadDonarFile);

export default bloodRouter;
