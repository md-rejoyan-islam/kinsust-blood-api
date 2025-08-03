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
exports.userLogin = exports.me = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const createJWT_1 = __importDefault(require("../helper/createJWT"));
const matchPassword_1 = __importDefault(require("../helper/matchPassword"));
const user_model_1 = __importDefault(require("../models/user.model"));
const userLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email)
        throw (0, http_errors_1.default)(400, "Please provide email");
    if (!password)
        throw (0, http_errors_1.default)(400, "Please provide password");
    // get user by emaill
    const user = yield user_model_1.default.findOne({
        where: { email },
    });
    // user check
    if (!user)
        throw (0, http_errors_1.default)(400, "Couldn't find any user account!. Please contact us.");
    //  password match
    (0, matchPassword_1.default)(password, user.password);
    // create  access token
    const accessToken = (0, createJWT_1.default)({ email }, process.env.JWT_LOGIN_SECRET_KEY, +process.env.JWT_LOGIN_EXPIRE);
    return { user, accessToken };
});
exports.userLogin = userLogin;
const me = (me) => __awaiter(void 0, void 0, void 0, function* () {
    if (!me) {
        throw http_errors_1.default.Unauthorized("Couldn't find any user account!. Please register.");
    }
    return me;
});
exports.me = me;
