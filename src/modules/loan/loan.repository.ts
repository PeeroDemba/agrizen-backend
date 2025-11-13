import sequelize from "../../database/models/index.js";
import Loan from "../../database/models/loan.js";
import Notification from "../../database/models/notification.js";
import User from "../../database/models/user.js";
import type { LoanInterface } from "./loan.interface.js";
import * as uuid from "uuid";

export class LoanRepository {
  static async createLoan(payload: LoanInterface) {
    const transaction = await sequelize.transaction();
    try {
      const loan = await Loan.create(payload, { transaction });

      await Notification.create(
        {
          id: uuid.v4(),
          notificationType: "Loan Creation",
          createdAt: new Date(),
          readAt: null,
          resourceId: loan.id,
          userId: loan.farmerId,
        },
        { transaction }
      );

      await transaction.commit();

      return loan;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  static async getLoans(
    query: {
      filter?: "pending" | "approved" | "rejected";
      farmerId?: string;
      page?: number;
      perPage?: number;
    },
    farmerId?: string
  ) {
    return await Loan.findAndCountAll({
      where: {
        ...(query.filter ? { status: query.filter } : false),
        ...(query.farmerId ? { farmerId: query.farmerId } : false),
        ...(farmerId ? { farmerId } : false),
      },
      include: [
        {
          model: User,
          as: "user",
          required: true,
          attributes: {
            exclude: [
              "password",
              "resetToken",
              "resetTokenExpiredAt",
              "deletedAt",
            ],
          },
        },
      ],
      limit: query.perPage ?? 10,
      offset: query.page ? (query.page - 1) * (query.perPage ?? 10) : 0,
    });
  }

  static async getLoan(id: string) {
    return await Loan.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          required: true,
          attributes: {
            exclude: [
              "password",
              "resetToken",
              "resetTokenExpiredAt",
              "deletedAt",
            ],
          },
        },
      ],
    });
  }

  static async deleteLoan(id: string) {
    return await Loan.destroy({
      where: {
        id,
      },
    });
  }

  static async approveLoan(id: string) {
    const transaction = await sequelize.transaction();
    try {
      await Loan.update(
        { status: "approved" },
        {
          where: {
            id,
          },
          transaction,
        }
      );

      const loan = await Loan.findByPk(id, { transaction });

      await Notification.create(
        {
          id: uuid.v4(),
          notificationType: "Loan Approved",
          createdAt: new Date(),
          readAt: null,
          resourceId: loan?.id!,
          userId: loan?.farmerId!,
        },
        { transaction }
      );

      await transaction.commit();

      return loan;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  static async rejectLoan(id: string) {
    const transaction = await sequelize.transaction();
    try {
      await Loan.update(
        { status: "rejected" },
        {
          where: {
            id,
          },
          transaction,
        }
      );

      const loan = await Loan.findByPk(id, { transaction });

      await Notification.create(
        {
          id: uuid.v4(),
          notificationType: "Loan Rejected",
          createdAt: new Date(),
          readAt: null,
          resourceId: loan?.id!,
          userId: loan?.farmerId!,
        },
        { transaction }
      );

      await transaction.commit();

      return loan;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  static async loanMetric(farmerId: string) {
    return await Loan.findAll({
      where: {
        farmerId,
      },
      group: ["farmerId", "status"],
      attributes: [
        "status",
        [sequelize.fn("SUM", sequelize.col("amount")), "totalLoanAmount"],
        [sequelize.fn("COUNT", sequelize.col("status")), "totalLoanCount"],
      ],
    });
  }

  static async loanMetrics(query: { page?: number; perPage?: number }) {
    return await User.findAndCountAll({
      where: {
        role: "farmer",
      },
      attributes: {
        exclude: ["password", "resetToken", "resetTokenExpiredAt", "deletedAt"],
      },
      include: [
        {
          model: Loan,
          as: "loans",
          required: false,
          attributes: ["status", "amount"],
        },
      ],
      distinct: true,
      limit: query.perPage ?? 10,
      offset: query.page ? (query.page - 1) * (query.perPage ?? 10) : 0,
    });
  }
}
