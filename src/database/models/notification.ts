"use strict";
import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import sequelize from "./index.js";

class Notification extends Model<
  InferAttributes<Notification>,
  InferCreationAttributes<Notification>
> {
  declare id: string;
  declare userId: string;
  declare resourceId: CreationOptional<string | null>;
  declare notificationType: string;
  declare status: CreationOptional<"read" | "unread">;
  declare readAt: Date | null;
  declare createdAt: Date;
}

Notification.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        key: "id",
        model: "users",
      },
    },
    resourceId: {
      allowNull: true,
      type: DataTypes.UUID,
      onDelete: "CASCADE",
      references: {
        key: "id",
        model: "loans",
      },
    },
    notificationType: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM("unread", "read"),
      defaultValue: "unread",
    },
    readAt: {
      type: DataTypes.DATE,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Notification",
    tableName: "notifications",
    updatedAt: false,
  }
);

export default Notification;
