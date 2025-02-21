const express = require("express");

const { isLoggedIn } = require("../middlewares/verify");
const authorization = require("../middlewares/authorization");
const {
  getAllPatients,
  createPatient,
  updatePatientDataById,
  deletePatient,
} = require("../controllers/patient.controllers");

const patientRouter = express.Router();

patientRouter.use(isLoggedIn);

patientRouter.route("/").get(getAllPatients).post(createPatient);

patientRouter.route("/:id").put(updatePatientDataById).delete(deletePatient);

// export default patientRouter;
module.exports = patientRouter;
