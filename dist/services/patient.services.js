"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatient = exports.updatePatientDataById = exports.createPatient = exports.getAllPatients = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const crypto_1 = __importDefault(require("crypto"));
const patient_model_1 = __importDefault(require("../models/patient.model"));
const getAllPatients = () => __awaiter(void 0, void 0, void 0, function* () {
    // get all patient
    const { count, rows: patients } = yield patient_model_1.default.findAndCountAll();
    // if no patient found
    if (!count)
        throw (0, http_errors_1.default)(400, "Couldn't find any patient data.");
    return { count, patients };
});
exports.getAllPatients = getAllPatients;
const createPatient = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { phone, bloodGroup, location } = req.body;
    if (!phone)
        throw (0, http_errors_1.default)(400, "Phone number is required");
    if (!bloodGroup)
        throw (0, http_errors_1.default)(400, "Blood Group is required");
    if (!location)
        throw (0, http_errors_1.default)(400, "Location is required");
    // check phone number
    const patient = yield patient_model_1.default.findOne({ where: { phone } });
    if (patient)
        throw (0, http_errors_1.default)(400, "Phone number already exists");
    // create patient
    const result = yield patient_model_1.default.create(Object.assign(Object.assign({ id: crypto_1.default.randomUUID() }, req.body), { editedBy: (_a = req === null || req === void 0 ? void 0 : req.me) === null || _a === void 0 ? void 0 : _a.email }));
    return result;
});
exports.createPatient = createPatient;
const updatePatientDataById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    // find patient by id
    const patient = yield patient_model_1.default.findByPk(id);
    // if patient data not found
    if (!patient)
        throw (0, http_errors_1.default)(400, "Couldn't find any patient data.");
    // update patient
    yield patient_model_1.default.update(Object.assign(Object.assign({}, req.body), { editedBy: (_a = req === null || req === void 0 ? void 0 : req.me) === null || _a === void 0 ? void 0 : _a.email }), {
        where: { id },
    });
    // updated data
    const result = yield patient_model_1.default.findByPk(id);
    return result;
});
exports.updatePatientDataById = updatePatientDataById;
const deletePatient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // find patient by id
    const patient = yield patient_model_1.default.findByPk(id);
    // if patient data not found
    if (!patient)
        throw (0, http_errors_1.default)(400, "Couldn't find any patient data.");
    // delete patient
    yield patient_model_1.default.destroy({ where: { id } });
    return patient;
});
exports.deletePatient = deletePatient;
