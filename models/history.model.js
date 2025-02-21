// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// user schema
const historySchema = {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  donarId: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter donar id",
      },
      notEmpty: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
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
    type: DataTypes.STRING,
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
      this.setDataValue("bloodGroup", value.trim());
    },
  },
  lastDonationDate: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter last donation date",
      },
      notEmpty: true,
    },
  },
  editedBy: {
    type: DataTypes.STRING,
  },
};

// options
const schemaOptions = {
  timestamps: true,
  freezeTableName: true, // Model tableName will be the same as the model name
  charset: "utf8", // support all language
  collate: "utf8_general_ci",
};

// create model
const HistoryModel = sequelize.define("History", historySchema, schemaOptions);

// export default HistoryModel;
module.exports = HistoryModel;
