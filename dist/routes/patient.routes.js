"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verify_1 = require("../middlewares/verify");
const patient_controllers_1 = require("../controllers/patient.controllers");
const patientRouter = express_1.default.Router();
patientRouter.use(verify_1.isLoggedIn);
patientRouter.route("/").get(patient_controllers_1.getAllPatients).post(patient_controllers_1.createPatient);
patientRouter.route("/:id").put(patient_controllers_1.updatePatientDataById).delete(patient_controllers_1.deletePatient);
exports.default = patientRouter;
