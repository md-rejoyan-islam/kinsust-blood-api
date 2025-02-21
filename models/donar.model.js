// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const donarSchema = {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
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
  email: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.STRING,
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
  department: {
    type: DataTypes.STRING,
  },
  session: {
    type: DataTypes.STRING,
  },

  homeDistrict: {
    type: DataTypes.STRING,
  },

  lastDonationDate: {
    type: DataTypes.STRING,
    default: "2023-06-06",
  },

  totalDonation: {
    type: DataTypes.STRING,
  },
  comment: {
    type: DataTypes.STRING,
  },
  lastEditedBy: {
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
const DonarsModel = sequelize.define("Donar", donarSchema, schemaOptions);

// export default DonarsModel;
module.exports = DonarsModel;
