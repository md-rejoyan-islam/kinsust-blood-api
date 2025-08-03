"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const hashPassword_1 = __importDefault(require("../helper/hashPassword"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Please enter user name",
            },
            notEmpty: true,
        },
        set(value) {
            this.setDataValue("name", value.trim());
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "Please enter user email",
            },
            notEmpty: true,
            isEmail: {
                msg: "Please enter valid email",
            },
        },
        set(value) {
            this.setDataValue("email", value.trim());
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Please enter user password",
            },
            notEmpty: true,
        },
        set(val) {
            this.setDataValue("password", (0, hashPassword_1.default)(val));
        },
    },
    role: {
        type: sequelize_1.DataTypes.ENUM("superadmin", "admin", "moderator"),
        defaultValue: "moderator",
        allowNull: false,
        validate: {
            isIn: {
                args: [["superadmin", "admin", "moderator"]],
                msg: "Please enter valid role",
            },
            notNull: {
                msg: "Please enter user role",
            },
            notEmpty: true,
        },
        set(value) {
            this.setDataValue("role", value.trim().toLowerCase());
        },
    },
}, {
    timestamps: true,
    freezeTableName: true, // Model tableName will be the same as the model name
    charset: "utf8", // support all language
    collate: "utf8_general_ci",
    sequelize: db_1.sequelize,
    tableName: "User",
});
exports.default = User;
