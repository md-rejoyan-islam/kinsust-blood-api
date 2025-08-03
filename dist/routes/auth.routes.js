"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const verify_1 = require("../middlewares/verify");
const authRouter = express_1.default.Router();
// user login
authRouter.route("/login").post(verify_1.isLoggedOut, auth_controllers_1.userLogin);
// user logout
authRouter.route("/logout").post(verify_1.isLoggedIn, auth_controllers_1.userLogout);
// logged in user
authRouter.route("/me").get(verify_1.isLoggedIn, auth_controllers_1.me);
exports.default = authRouter;
