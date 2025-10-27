"use strict";

import { DataTypes, type QueryInterface } from "sequelize";

// /** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("users", {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
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
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("users");
  },
};
