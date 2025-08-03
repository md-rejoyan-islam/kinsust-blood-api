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
exports.sequelize = exports.connectDB = void 0;
const sequelize_1 = require("sequelize");
const devConsole_1 = __importDefault(require("../helper/devConsole"));
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql", // database type
    logging: false,
});
exports.sequelize = sequelize;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        sequelize.sync(); // sync all models with database
        // sequelize.sync({ force: true }); // sync all models with database and force to drop all tables
        yield sequelize.authenticate();
        const config = sequelize.config; // get config object from sequelize
        (0, devConsole_1.default)(`MySQL successfully conncted on ${config.host}, Database name: ${config.database}`);
    }
    catch (error) {
        (0, devConsole_1.default)("Unable to connect to the database:", error);
    }
});
exports.connectDB = connectDB;
