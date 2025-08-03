import { DataTypes, Model } from "sequelize";
import { bloodGroupEnum } from "../app/types";
import { sequelize } from "../config/db";
type BloodGroup = keyof typeof bloodGroupEnum;

interface HistoryAttributes {
  id: string;
  donarId: string;
  phone: string;
  name: string;
  bloodGroup: BloodGroup;
  lastDonationDate: string;
  editedBy?: string;
}

class History extends Model<HistoryAttributes> implements HistoryAttributes {
  public id!: string;
  public donarId!: string;
  public phone!: string;
  public name!: string;
  public bloodGroup!: BloodGroup;
  public lastDonationDate!: string;
  public editedBy?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

History.init(
  {
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
      set(value: string) {
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
      set(value: string) {
        this.setDataValue("name", value.trim());
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
        this.setDataValue("bloodGroup", value.trim() as any);
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
  },
  {
    timestamps: true,
    freezeTableName: true, // Model tableName will be the same as the model name
    charset: "utf8", // support all language
    collate: "utf8_general_ci",
    sequelize,
    tableName: "History",
  }
);

export default History;
