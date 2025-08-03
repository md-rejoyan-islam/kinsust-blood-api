"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const http_errors_1 = __importDefault(require("http-errors"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000, // 1 minute
    max: 15, // 10 requests per minute
    message: "Too many requests from this IP, please try again after 5 minutes",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: () => {
        throw (0, http_errors_1.default)(429, "Too many requests from this IP, please try again after 5 minutes");
    },
});
exports.default = limiter;
