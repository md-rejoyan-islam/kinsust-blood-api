"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const donar_controllers_1 = require("../controllers/donar.controllers");
const verify_1 = require("../middlewares/verify");
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const multer_1 = __importDefault(require("../helper/multer"));
const bloodRouter = express_1.default.Router();
bloodRouter.use(verify_1.isLoggedIn);
// get all blood donors and create a new blood donor data
bloodRouter
    .route("/")
    .get(donar_controllers_1.getAllBloodDonars)
    .post((0, authorization_1.default)("admin", "superadmin", "moderator"), donar_controllers_1.createBloodDonar);
// bulk create
bloodRouter.route("/bulk-create").post(donar_controllers_1.bulkCreateBloodDonar);
// bulk delete
bloodRouter.route("/bulk-delete").post(donar_controllers_1.bulkDeleteBloodDonar);
// get,update and delete a blood donor data
bloodRouter
    .route("/:id")
    .get((0, authorization_1.default)("admin", "superadmin", "moderator"), donar_controllers_1.getSingleBloodDonarById)
    .put(donar_controllers_1.updateBloodDonarById)
    .delete((0, authorization_1.default)("admin", "superadmin"), donar_controllers_1.deleteBloodDonarById);
bloodRouter.route("/file").post(multer_1.default, donar_controllers_1.uploadDonarFile);
exports.default = bloodRouter;
