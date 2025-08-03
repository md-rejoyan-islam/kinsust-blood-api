"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.updatePatientDataById = exports.getAllPatients = exports.deletePatient = exports.createPatient = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const responseHandler_1 = require("../helper/responseHandler");
const patientServices = __importStar(require("../services/patient.services"));
/**
 * @method GET
 * @route /api/v1/patient
 * @description Get all patient
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Array} Array of users
 */
const getAllPatients = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { count, patients } = yield patientServices.getAllPatients();
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "All Patient data fetched successfully",
        payload: {
            totalData: count,
            data: patients,
        },
    });
}));
exports.getAllPatients = getAllPatients;
/**
 * @method POST
 * @route /api/v1/patient
 * @description Create a pateint
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A patient
 */
const createPatient = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield patientServices.createPatient(req);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 201,
        message: "Patient data created successfully",
        payload: {
            data: result,
        },
    });
}));
exports.createPatient = createPatient;
/**
 * @method PUT
 * @route /api/v1/patient/:id
 * @description Update a patient
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A patient
 */
const updatePatientDataById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield patientServices.updatePatientDataById(req);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Patient data updated successfully",
        payload: {
            data: result,
        },
    });
}));
exports.updatePatientDataById = updatePatientDataById;
/**
 * @method DELETE
 * @route /api/v1/patient/:id
 * @description Delete a patient
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A patient
 */
const deletePatient = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const patient = yield patientServices.deletePatient(id);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "patient data deleted successfully",
        payload: {
            data: patient,
        },
    });
}));
exports.deletePatient = deletePatient;
