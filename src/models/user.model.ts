import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { hashPassword } from "../helper/hashPassword";
import { userRoleEnum } from "./../app/types";
type UserRole = keyof typeof userRoleEnum;

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: UserRole;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
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
      set(value: string) {
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
      set(value: string) {
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
      set(val: string) {
        this.setDataValue("password", hashPassword(val));
      },
    },
    role: {
      type: DataTypes.ENUM(...userRoleEnum),
      defaultValue: "moderator",
      allowNull: false,
      validate: {
        isIn: {
          args: [userRoleEnum],
          msg: "Please enter valid role",
        },
        notNull: {
          msg: "Please enter user role",
        },
        notEmpty: true,
      },
      set(value: string) {
        this.setDataValue("role", value.trim().toLowerCase() as any);
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true, // Model tableName will be the same as the model name
    charset: "utf8", // support all language
    collate: "utf8_general_ci",
    sequelize,
    tableName: "User",
  }
);

export default User;
