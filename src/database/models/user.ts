"use strict";
import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import sequelize from "./index.js";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: string;
  declare fullName: string;
  declare phone: string;
  declare email: string;
  declare role: string;
  declare password: string;
  declare state: string;
  declare nationalId: number;
  declare resetToken: CreationOptional<string | null>;
  declare resetTokenExpiredAt: CreationOptional<Date | null>;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    fullName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM("admin", "farmer"),
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    nationalId: {
      allowNull: false,
      type: DataTypes.BIGINT.UNSIGNED,
      unique: true,
    },
    resetToken: {
      type: DataTypes.STRING,
    },
    resetTokenExpiredAt: {
      type: DataTypes.DATE,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    paranoid: true,
  }
);

export default User;
