"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Donar extends sequelize_1.Model {
}
Donar.init({
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
                msg: "Please enter donar name",
            },
            notEmpty: true,
        },
        set(value) {
            this.setDataValue("name", value.trim());
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    age: {
        type: sequelize_1.DataTypes.STRING,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "Please enter donar phone number",
            },
            notEmpty: true,
        },
        set(value) {
            this.setDataValue("phone", value.trim());
        },
    },
    bloodGroup: {
        type: sequelize_1.DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
        allowNull: false,
        validate: {
            isIn: {
                args: [["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]],
                msg: "Please enter valid blood group",
            },
            notNull: {
                msg: "Please enter donar blood group",
            },
            notEmpty: true,
        },
        set(value) {
            this.setDataValue("bloodGroup", value.trim().toUpperCase());
        },
    },
    department: {
        type: sequelize_1.DataTypes.STRING,
    },
    session: {
        type: sequelize_1.DataTypes.STRING,
    },
    homeDistrict: {
        type: sequelize_1.DataTypes.STRING,
    },
    lastDonationDate: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "2023-06-06",
    },
    totalDonation: {
        type: sequelize_1.DataTypes.STRING,
    },
    comment: {
        type: sequelize_1.DataTypes.STRING,
    },
    lastEditedBy: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: true,
    freezeTableName: true, // Model tableName will be the same as the model name
    charset: "utf8", // support all language
    collate: "utf8_general_ci",
    sequelize: db_1.sequelize,
    tableName: "Donar",
});
exports.default = Donar;
