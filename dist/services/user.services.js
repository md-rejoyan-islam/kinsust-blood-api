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
exports.updateUserById = exports.passwordChange = exports.getSingleUserById = exports.getAllUsers = exports.deleteUserById = exports.createUser = void 0;
const crypto_1 = __importDefault(require("crypto"));
const http_errors_1 = __importDefault(require("http-errors"));
const user_model_1 = __importDefault(require("../models/user.model"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    // get all users
    const { count, rows: users } = yield user_model_1.default.findAndCountAll({});
    // if no user found
    if (!count)
        throw (0, http_errors_1.default)(400, "Couldn't find any user data.");
    return { count, users };
});
exports.getAllUsers = getAllUsers;
const getSingleUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // find user by id
    const user = yield user_model_1.default.findByPk(id);
    // if user data not found
    if (!user)
        throw (0, http_errors_1.default)(400, "Couldn't find any user data.");
    return user;
});
exports.getSingleUserById = getSingleUserById;
const createUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    // email is required
    if (!body.email)
        throw (0, http_errors_1.default)(400, "Email is required.");
    // user check
    const user = yield user_model_1.default.findOne({
        where: { email: body.email },
    });
    if (user)
        throw http_errors_1.default.BadRequest("Email already exists.");
    // create user
    const result = yield user_model_1.default.create(Object.assign(Object.assign({}, body), { id: crypto_1.default.randomUUID() }));
    return result;
});
exports.createUser = createUser;
const updateUserById = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    // find user by id
    const user = yield user_model_1.default.findByPk(id);
    // if user data not found
    if (!user)
        throw (0, http_errors_1.default)(400, "Couldn't find any user data.");
    // if email changed
    let userByEmail = null;
    if (body === null || body === void 0 ? void 0 : body.email) {
        userByEmail = yield user_model_1.default.findOne({
            where: { email: body.email },
        });
    }
    // if email already exists
    if (userByEmail && userByEmail.id !== id)
        throw http_errors_1.default.BadRequest("Email already exists.");
    // if role changed to superAdmin
    if (body.role === "superAdmin")
        throw (0, http_errors_1.default)(400, "You can't update role to superAdmin.");
    // update user data
    yield user_model_1.default.update(Object.assign({}, body), { where: { id } });
    const result = yield user_model_1.default.findByPk(id);
    return result;
});
exports.updateUserById = updateUserById;
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // find user by id
    const user = yield user_model_1.default.findByPk(id);
    // if user data not found
    if (!user)
        throw (0, http_errors_1.default)(400, "Couldn't find any user data.");
    // if user is superAdmin
    if (user.role === "superadmin")
        throw (0, http_errors_1.default)(400, "You can't delete superAdmin.");
    // delete user data
    yield user.destroy();
    return user;
});
exports.deleteUserById = deleteUserById;
const passwordChange = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    // user check
    const user = yield user_model_1.default.findByPk(id);
    if (!user)
        throw (0, http_errors_1.default)(400, "Couldn't find any user account with this id");
    // if password not found
    if (!password)
        throw (0, http_errors_1.default)(400, "Please provide password");
    // update user data
    yield user_model_1.default.update({
        password,
    }, {
        where: { id },
    });
    // updated data
    const result = yield user_model_1.default.findByPk(id, {
    // attributes: { exclude: ["password"] },
    });
    return result;
});
exports.passwordChange = passwordChange;
