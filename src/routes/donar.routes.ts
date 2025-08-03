import express from "express";
import {
  bulkCreateBloodDonar,
  createBloodDonar,
  deleteBloodDonarById,
  getAllBloodDonars,
  getSingleBloodDonarById,
  updateBloodDonarById,
  uploadDonarFile,
  bulkDeleteBloodDonar,
} from "../controllers/donar.controllers";
import { isLoggedIn } from "../middlewares/verify";
import authorization from "../middlewares/authorization";
import fileUpload from "../helper/multer";

const bloodRouter = express.Router();

bloodRouter.use(isLoggedIn);

// get all blood donors and create a new blood donor data
import validate from "../middlewares/validate";
import {
  createDonarSchema,
  updateDonarSchema,
  bulkDeleteDonarSchema,
} from "../validations/donar.validation";

bloodRouter
  .route("/")
  .get(getAllBloodDonars)
  .post(
    authorization("admin", "superadmin", "moderator"),
    validate(createDonarSchema),
    createBloodDonar
  );

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
