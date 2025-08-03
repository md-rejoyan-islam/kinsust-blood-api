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
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app/app"));
const db_1 = require("./config/db");
const devConsole_1 = __importDefault(require("./helper/devConsole"));
// dotenv  config
dotenv_1.default.config();
// port
const PORT = process.env.SERVER_PORT || 8000;
// server listen
app_1.default.listen(PORT, () => {
    (0, db_1.connectDB)();
    (0, devConsole_1.default)(`Server is running on http://localhost:${PORT}`);
});
// unhandled promise rejection error handler
process.on("unhandledRejection", (error) => __awaiter(void 0, void 0, void 0, function* () {
    (0, devConsole_1.default)(error.name);
}));
