"use strict";
import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import sequelize from "./index.js";

class Loan extends Model<InferAttributes<Loan>, InferCreationAttributes<Loan>> {
  declare id: string;
  declare farmerId: string;
  declare amount: number;
  declare purposeOfLoan: string;
  declare repaymentDuration: string;
  declare status: CreationOptional<"pending" | "approved" | "rejected">;
  declare preferredPaymentMethod: string;
  declare collateralDocuments: string[];
  declare createdAt: Date;
}

Loan.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    farmerId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        key: "id",
        model: "users",
      },
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    purposeOfLoan: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    repaymentDuration: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    preferredPaymentMethod: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    collateralDocuments: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.BLOB),
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Loan",
    tableName: "loans",
    updatedAt: false,
  }
);

export default Loan;
