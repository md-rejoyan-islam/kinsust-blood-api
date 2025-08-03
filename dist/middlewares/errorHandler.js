"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const responseHandler_1 = require("../helper/responseHandler");
const errorHandler = (err, req, res) => {
    // validation error
    if (err instanceof sequelize_1.ValidationError) {
        err.message = err.errors[0].message;
    }
    (0, responseHandler_1.errorResponse)(res, {
        statusCode: err.status,
        message: err.message,
    });
};
exports.default = errorHandler;
