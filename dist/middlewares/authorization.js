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
Object.defineProperty(exports, "__esModule", { value: true });
const responseHandler_1 = require("../helper/responseHandler");
const authorization = (...role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!role.includes((_a = req === null || req === void 0 ? void 0 : req.me) === null || _a === void 0 ? void 0 : _a.role)) {
            return (0, responseHandler_1.errorResponse)(res, {
                statusCode: 403,
                message: "You don't have permission to perform this action",
            });
        }
        next();
    });
};
exports.default = authorization;
