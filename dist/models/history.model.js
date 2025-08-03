"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class History extends sequelize_1.Model {
}
History.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    donarId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Please enter donar id",
            },
            notEmpty: true,
        },
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
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
            this.setDataValue("bloodGroup", value.trim());
        },
    },
    lastDonationDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Please enter last donation date",
            },
            notEmpty: true,
        },
    },
    editedBy: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: true,
    freezeTableName: true, // Model tableName will be the same as the model name
    charset: "utf8", // support all language
    collate: "utf8_general_ci",
    sequelize: db_1.sequelize,
    tableName: "History",
});
exports.default = History;
