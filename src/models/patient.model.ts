import { DataTypes, Model } from "sequelize";
import { bloodGroupEnum } from "../app/types";
import { sequelize } from "../config/db";
type BloodGroup = keyof typeof bloodGroupEnum;

interface PatientAttributes {
  id: string;
  amount: string;
  location: string;
  phone: string;
  bloodGroup: BloodGroup;
  date?: string;
  editedBy?: string;
  comment?: string;
}

class Patient extends Model<PatientAttributes> implements PatientAttributes {
  public id!: string;
  public amount!: string;
  public location!: string;
  public phone!: string;
  public bloodGroup!: BloodGroup;
  public date?: string;
  public editedBy?: string;
  public comment?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Patient.init(
  {
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
    date: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    editedBy: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    comment: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    freezeTableName: true, // Model tableName will be the same as the model name
    charset: "utf8", // support all language
    collate: "utf8_general_ci",
    sequelize,
    tableName: "Patient",
  }
);

export default Patient;
