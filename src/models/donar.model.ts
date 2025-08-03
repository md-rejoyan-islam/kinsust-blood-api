import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { bloodGroupEnum } from "./../app/types";

type BloodGroup = keyof typeof bloodGroupEnum;

interface DonarAttributes {
  id: string;
  name: string;
  email?: string;
  age?: string;
  phone: string;
  bloodGroup: BloodGroup;
  department?: string;
  session?: string;
  homeDistrict?: string;
  lastDonationDate?: string;
  totalDonation?: string;
  comment?: string;
  lastEditedBy?: string;
}

class Donar extends Model<DonarAttributes> implements DonarAttributes {
  public id!: string;
  public name!: string;
  public email?: string;
  public age?: string;
  public phone!: string;
  public bloodGroup!: BloodGroup;
  public department?: string;
  public session?: string;
  public homeDistrict?: string;
  public lastDonationDate?: string;
  public totalDonation?: string;
  public comment?: string;
  public lastEditedBy?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Donar.init(
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
          msg: "Please enter donar name",
        },
        notEmpty: true,
      },
      set(value: string) {
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
      set(value: string) {
        this.setDataValue("phone", value.trim());
      },
    },
    bloodGroup: {
      type: DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
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
      set(value: string) {
        this.setDataValue("bloodGroup", value.trim().toUpperCase() as any);
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
      defaultValue: "2023-06-06",
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
  },
  {
    timestamps: true,
    freezeTableName: true, // Model tableName will be the same as the model name
    charset: "utf8", // support all language
    collate: "utf8_general_ci",
    sequelize,
    tableName: "Donar",
  }
);

export default Donar;
