// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const patientSchema = {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
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
    type: DataTypes.ENUM({
      lowercase: true,
    }),
    values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
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
  date: {
    type: DataTypes.STRING,
    default: null,
  },
  editedBy: {
    type: DataTypes.STRING,
    default: null,
  },
  comment: {
    type: DataTypes.STRING,
  },
};

// schema options
const schemaOptions = {
  timestamps: true,
  freezeTableName: true, // Model tableName will be the same as the model name
  charset: "utf8", // support all language
  collate: "utf8_general_ci",
};

// create model
const PatientModel = sequelize.define("Patient", patientSchema, schemaOptions);

module.exports = PatientModel;
