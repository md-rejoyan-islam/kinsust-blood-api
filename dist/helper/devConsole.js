"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
function devConsole(message, error) {
    if (process.env.NODE_ENV === "development") {
        console.log("\n", colors_1.default.yellow.bgBlue.yellow(message), "\n");
        if (error) {
            console.log(colors_1.default.bgRed.yellow(error));
        }
    }
}
exports.default = devConsole;
