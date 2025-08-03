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
exports.updateHistory = exports.getSingleHistoryById = exports.getAllHistory = exports.deleteHistory = exports.deleteAllHistory = exports.createHistory = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const responseHandler_1 = require("../helper/responseHandler");
const historyServices = __importStar(require("../services/history.services"));
/**
 * @method GET
 * @route /api/v1/history
 * @description Get all history
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Array} Array of users
 */
const getAllHistory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { count, history } = yield historyServices.getAllHistory();
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "All history data fetched successfully",
        payload: {
            totalData: count,
            data: history,
        },
    });
}));
exports.getAllHistory = getAllHistory;
/**
 * @method GET
 * @route /api/v1/history/:id
 * @description Get a history
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A history
 */
const getSingleHistoryById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const history = yield historyServices.getSingleHistoryById(id);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "History data fetched successfully",
        payload: {
            data: history,
        },
    });
}));
exports.getSingleHistoryById = getSingleHistoryById;
/**
 * @method POST
 * @route /api/v1/history
 * @description Create a history
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A history
 */
const createHistory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const history = yield historyServices.createHistory(req);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 201,
        message: "History data created successfully",
        payload: {
            data: history,
        },
    });
}));
exports.createHistory = createHistory;
/**
 * @method PUT
 * @route /api/v1/history/:id
 * @description Update a history
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A history
 */
const updateHistory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const history = yield historyServices.updateHistory(req);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "History data updated successfully",
        payload: {
            data: history,
        },
    });
}));
exports.updateHistory = updateHistory;
/**
 * @method DELETE
 * @route /api/v1/history/:id
 * @description Delete a history
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A history
 */
const deleteHistory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const history = yield historyServices.deleteHistory(id);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "History data deleted successfully",
        payload: {
            data: history,
        },
    });
}));
exports.deleteHistory = deleteHistory;
/**
 * @method DELETE
 * @route /api/v1/history
 * @description Delete all history
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A history
 */
const deleteAllHistory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield historyServices.deleteAllHistory();
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "All history data deleted successfully",
    });
}));
exports.deleteAllHistory = deleteAllHistory;
