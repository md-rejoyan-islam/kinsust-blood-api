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
exports.updateUserById = exports.passwordChange = exports.getSingleUserById = exports.getAllUsers = exports.deleteUserById = exports.createUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const responseHandler_1 = require("../helper/responseHandler");
const userServices = __importStar(require("../services/user.services"));
/**
 * @method GET
 * @route /api/v1/user
 * @description Get all users
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Array} Array of users
 */
const getAllUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { count, users } = yield userServices.getAllUsers();
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "All user data fetched successfully",
        payload: {
            total: count,
            data: users,
        },
    });
}));
exports.getAllUsers = getAllUsers;
/**
 * @method GET
 * @route /api/v1/user/:id
 * @description Get a user
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A user
 */
const getSingleUserById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield userServices.getSingleUserById(id);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "User data fetched successfully",
        payload: {
            data: user,
        },
    });
}));
exports.getSingleUserById = getSingleUserById;
/**
 * @method POST
 * @route /api/v1/user
 * @description Create a user
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A user
 */
const createUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userServices.createUser(req.body);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 201,
        message: "User created successfully",
        payload: {
            data: result,
        },
    });
}));
exports.createUser = createUser;
/**
 * @method PUT
 * @route /api/v1/user/:id
 * @description Update a user
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A user
 */
const updateUserById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield userServices.updateUserById(id, req.body);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "User updated successfully",
        payload: {
            data: result,
        },
    });
}));
exports.updateUserById = updateUserById;
/**
 * @method DELETE
 * @route /api/v1/user/:id
 * @description Delete a user
 * @access Private
 * @private Only logged in users can access this route
 * @returns {Object} A user
 */
const deleteUserById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield userServices.deleteUserById(id);
    // response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "User deleted successfully",
        payload: {
            data: user,
        },
    });
}));
exports.deleteUserById = deleteUserById;
/**
 *
 * @apiDescription    Password reset
 * @apiMethod         PUT
 *
 * @apiRoute          /api/v1/auth/password-reset
 * @apiAccess         registered user
 *
 * @apiBody           { email,password,code}
 *
 * @apiSuccess        { success: true , message: Successfully password updated., data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 */
const passwordChange = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const { id } = req.params;
    const result = yield userServices.passwordChange(id, password);
    // success response send
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Successfully password updated.",
        payload: {
            data: result,
        },
    });
}));
exports.passwordChange = passwordChange;
