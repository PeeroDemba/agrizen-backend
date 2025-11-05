"use strict";

import { DataTypes, type QueryInterface } from "sequelize";

// /** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("loans", {
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
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("loans");
  },
};
