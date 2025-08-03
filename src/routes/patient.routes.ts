import express from "express";
import { isLoggedIn } from "../middlewares/verify";
import {
  getAllPatients,
  createPatient,
  updatePatientDataById,
  deletePatient,
} from "../controllers/patient.controllers";

const patientRouter = express.Router();

patientRouter.use(isLoggedIn);

import validate from "../middlewares/validate";
import {
  createPatientSchema,
  updatePatientSchema,
} from "../validations/patient.validation";

patientRouter
  .route("/")
  .get(getAllPatients)
  .post(validate(createPatientSchema), createPatient);

patientRouter
  .route("/:id")
  .put(validate(updatePatientSchema), updatePatientDataById)
  .delete(deletePatient);

export default patientRouter;
