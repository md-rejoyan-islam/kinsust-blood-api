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
exports.uploadDonarFile = exports.updateBloodDonarById = exports.getSingleBloodDonarById = exports.getAllBloodDonars = exports.deleteBloodDonarById = exports.createBloodDonar = exports.bulkDeleteBloodDonar = exports.bulkCreateBloodDonar = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const responseHandler_1 = require("../helper/responseHandler");
const donarServices = __importStar(require("../services/donar.services"));
/**
 *
 * @method GET
 * @route /api/v1/blood
 * @description Get all bloods
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Array} Array of bloods
 */
const getAllBloodDonars = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { count, donars, pagination } = yield donarServices.getAllBloodDonars(req);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "All Donar data fetched successfully",
        payload: {
            total: count,
            data: donars,
            pagination,
        },
    });
}));
exports.getAllBloodDonars = getAllBloodDonars;
/**
 * @method GET
 * @route /api/v1/blood/:id
 * @description Get a blood donor
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A blood donor
 */
const getSingleBloodDonarById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const donar = yield donarServices.getSingleBloodDonarById(id);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Blood donor data fetched successfully",
        payload: {
            data: donar,
        },
    });
}));
exports.getSingleBloodDonarById = getSingleBloodDonarById;
/**
 * @method POST
 * @route /api/v1/blood
 * @description Create a new blood donor
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} Created blood donor
 */
const createBloodDonar = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield donarServices.createBloodDonar(req);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Blood donor created successfully",
        payload: {
            data: result,
        },
    });
}));
exports.createBloodDonar = createBloodDonar;
/**
 * @method PUT
 * @route /api/v1/blood/:id
 * @description Update a blood donor
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} Updated blood donor
 */
const updateBloodDonarById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const donar = yield donarServices.updateBloodDonarById(req);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Blood donor date updated successfully",
        payload: {
            data: donar,
        },
    });
}));
exports.updateBloodDonarById = updateBloodDonarById;
/**
 * @method DELETE
 * @route /api/v1/blood/:id
 * @description Delete a blood donor data
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} Deleted blood donor
 */
const deleteBloodDonarById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const donar = yield donarServices.deleteBloodDonarById(id);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Blood donor deleted successfully",
        payload: {
            data: donar,
        },
    });
}));
exports.deleteBloodDonarById = deleteBloodDonarById;
/**
 * @method DELETE
 * @route /api/v1/donars/bulk-create
 * @description Bulk create blood donor data
 * @access Private
 * @private superadmin can access this route
 * @returns {Object} Deleted blood donor
 */
const bulkCreateBloodDonar = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield donarServices.bulkCreateBloodDonar(req);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Blood donor created successfully",
    });
}));
exports.bulkCreateBloodDonar = bulkCreateBloodDonar;
/**
 * @method DELETE
 * @route /api/v1/donars/bulk-delete
 * @description Bulk delete blood donor data
 * @access Private
 * @private superadmin or admin can access this route
 * @returns {Object} Deleted blood donor
 */
const bulkDeleteBloodDonar = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    const result = yield donarServices.bulkDeleteBloodDonar(ids);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Delete selected blood donor .",
        payload: {
            data: result,
        },
    });
}));
exports.bulkDeleteBloodDonar = bulkDeleteBloodDonar;
/**
 * @method PATCH
 * @route /api/v1/donars/
 * @description JSON / CSV file upload to create blood donor data
 * @access Private
 * @private superadmin can access this route
 * @returns {Object} Deleted blood donor
 */
const uploadDonarFile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { total, result } = yield donarServices.uploadDonarFile(req);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Blood donor created successfully",
        payload: {
            total,
            data: result,
        },
    });
}));
exports.uploadDonarFile = uploadDonarFile;
