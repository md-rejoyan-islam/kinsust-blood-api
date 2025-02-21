// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";
// import hashPassword from "../helper/hashPassword.js";
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const hashPassword = require("../src/helper/hashPassword");

// user schema
const userSchema = {
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
        msg: "Please enter user name",
      },
      notEmpty: true,
    },
    set(value) {
      this.setDataValue("name", value.trim());
    },
  },
  email: {
    type: DataTypes.STRING,

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
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter user password",
      },
      notEmpty: true,
    },
    set(val) {
      this.setDataValue("password", hashPassword(val));
    },
  },
  role: {
    type: DataTypes.ENUM({
      lowercase: true,
    }),
    values: ["superadmin", "admin", "moderator"],
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
};

// options
const schemaOptions = {
  timestamps: true,
  freezeTableName: true, // Model tableName will be the same as the model name
  charset: "utf8", // support all language
  collate: "utf8_general_ci",
};

// create model
const UserModel = sequelize.define("User", userSchema, schemaOptions);

// export default UserModel;
module.exports = UserModel;
