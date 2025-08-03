"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user.controllers");
const verify_1 = require("../middlewares/verify");
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const userRouter = express_1.default.Router();
userRouter.use(verify_1.isLoggedIn);
// get all users and create a new user data
userRouter
    .route("/")
    .get(user_controllers_1.getAllUsers)
    .post((0, authorization_1.default)("admin", "superadmin"), user_controllers_1.createUser);
// password change
userRouter
    .route("/password-change/:id")
    .put((0, authorization_1.default)("superadmin", "admin", "moderator"), user_controllers_1.passwordChange);
// get,update and delete a user data
userRouter
    .route("/:id")
    .get((0, authorization_1.default)("admin", "superadmin", "moderator"), user_controllers_1.getSingleUserById)
    .put((0, authorization_1.default)("admin", "superadmin", "moderator"), user_controllers_1.updateUserById)
    .delete((0, authorization_1.default)("admin", "superadmin"), user_controllers_1.deleteUserById);
exports.default = userRouter;
