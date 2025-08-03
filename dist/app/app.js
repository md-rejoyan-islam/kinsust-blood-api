"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const corsOptions_1 = __importDefault(require("../config/corsOptions"));
const routes_1 = __importDefault(require("./routes"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// express app
const app = (0, express_1.default)();
// Apply rate limiting to all requests
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // 10 requests per minute
    message: "Too many requests from this IP, please try again after 5 minutes",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many requests from this IP, please try again after 5 minutes",
        });
    },
});
app.use(limiter);
// middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// cookie parser
app.use((0, cookie_parser_1.default)());
// cors setup
app.use((0, cors_1.default)(corsOptions_1.default));
// morgan setup
const morgan_1 = __importDefault(require("morgan"));
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// routes
app.use(routes_1.default);
exports.default = app;
