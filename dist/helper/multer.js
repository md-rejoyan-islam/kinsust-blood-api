"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// multer storage
const storage = multer_1.default.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const fileUpload = (0, multer_1.default)({
    storage,
    fileFilter: (req, file, cb) => {
        // supported image formats
        const supportedImageExtension = /(json|csv)/;
        const fileExtension = path_1.default.extname(file.originalname);
        if (supportedImageExtension.test(fileExtension)) {
            cb(null, true);
        }
        else {
            cb(new Error("Only JSON/CSV file accepted"));
        }
    },
}).single("file");
exports.default = fileUpload;
