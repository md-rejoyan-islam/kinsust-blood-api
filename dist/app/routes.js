"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_errors_1 = __importDefault(require("http-errors"));
const responseHandler_1 = require("../helper/responseHandler");
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const donar_routes_1 = __importDefault(require("../routes/donar.routes"));
const history_routes_1 = __importDefault(require("../routes/history.routes"));
const patient_routes_1 = __importDefault(require("../routes/patient.routes"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const router = (0, express_1.Router)();
// home route
router.get("/", (_req, res) => {
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Welcome to the KIN Blood API",
    });
});
// health check route
router.get("/health", (_req, res) => {
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Server is running fine.",
    });
});
router.use("/api/v1/donars", donar_routes_1.default);
router.use("/api/v1/users", user_routes_1.default);
router.use("/api/v1/auth", auth_routes_1.default);
router.use("/api/v1/history", history_routes_1.default);
router.use("/api/v1/patient", patient_routes_1.default);
// 404 route
router.use((_req, res, next) => {
    next((0, http_errors_1.default)(404, "Couldn't find this route."));
});
// error handler
router.use(errorHandler_1.default);
exports.default = router;
