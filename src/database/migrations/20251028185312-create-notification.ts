"use strict";

import { DataTypes, type QueryInterface } from "sequelize";

// /** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("notifications", {
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
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("notifications");
  },
};
