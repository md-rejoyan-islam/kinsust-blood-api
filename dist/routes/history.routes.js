"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const history_controllers_1 = require("../controllers/history.controllers");
const verify_1 = require("../middlewares/verify");
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const historyRouter = express_1.default.Router();
historyRouter.use(verify_1.isLoggedIn);
historyRouter
    .route("/")
    .get(history_controllers_1.getAllHistory)
    .post((0, authorization_1.default)("superadmin"), history_controllers_1.createHistory);
historyRouter
    .route("/all-delete")
    .delete((0, authorization_1.default)("superadmin"), history_controllers_1.deleteAllHistory);
historyRouter
    .route("/:id")
    .get(history_controllers_1.getSingleHistoryById)
    .put((0, authorization_1.default)("superadmin", "admin"), history_controllers_1.updateHistory)
    .delete((0, authorization_1.default)("superadmin"), history_controllers_1.deleteHistory);
exports.default = historyRouter;
