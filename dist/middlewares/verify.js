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
exports.isLoggedOut = exports.isLoggedIn = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseHandler_1 = require("../helper/responseHandler");
const user_model_1 = __importDefault(require("../models/user.model"));
const isLoggedIn = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // get cookie from request
    const token = ((_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) || ((_c = (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1]);
    if (!token) {
        throw http_errors_1.default.Unauthorized("Unauthorized, Access token not found. Please login.");
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_LOGIN_SECRET_KEY, (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            // clear cookie
            res === null || res === void 0 ? void 0 : res.clearCookie("accessToken", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            (0, responseHandler_1.errorResponse)(res, {
                statusCode: 401,
                message: "Unauthorized, Invalid access token.Please login again",
            });
        }
        const loginUser = yield user_model_1.default.findOne({
            where: { email: decode.email },
        });
        // if have valid cookie but user not found
        if (!loginUser) {
            // clear cookie
            res.clearCookie("accessToken");
            // send response
            return (0, responseHandler_1.errorResponse)(res, {
                statusCode: 401,
                message: "User not found. Please login again.",
            });
        }
        req.me = loginUser;
        next();
    }));
}));
exports.isLoggedIn = isLoggedIn;
const isLoggedOut = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // get cookie from request
    const token = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_LOGIN_SECRET_KEY, (err) => {
            if (err) {
                // delete client cookie
                res === null || res === void 0 ? void 0 : res.clearCookie("accessToken", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });
                next();
            }
            else {
                throw (0, http_errors_1.default)(400, "User is already logged in");
            }
        });
    }
    next();
}));
exports.isLoggedOut = isLoggedOut;
