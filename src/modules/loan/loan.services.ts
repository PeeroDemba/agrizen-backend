import { ErrorConstructor } from "../../utils/errors.js";
import type { LoanInterface } from "./loan.interface.js";
import { LoanRepository } from "./loan.repository.js";
import { LoanSchema } from "./loan.validation.js";
import * as uuid from "uuid";
import "dotenv/config";

export class LoanService {
  static async createLoan(
    user: { id: string; role: "admin" | "farmer" },
    payload: LoanInterface
  ) {
    if (user.role === "farmer") {
      const result = LoanSchema.safeParse(payload);

      if (result.success) {
        return await LoanRepository.createLoan({
          ...result.data,
          id: uuid.v4(),
          farmerId: user.id,
          createdAt: new Date(),
        });
      } else {
        throw new ErrorConstructor(
          "Validation error",
          422,
          result.error.message
        );
      }
    } else {
      throw new ErrorConstructor(
        "Access denied. Your role does not permit this action.",
        403
      );
    }
  }

  static async getLoans(
    user: { id: string; role: "admin" | "farmer" },
    query: {
      filter?: "pending" | "approved" | "rejected";
      farmerId?: string;
      page?: number;
      perPage?: number;
    }
  ) {
    if (user.role === "admin") {
      return await LoanRepository.getLoans(query);
    } else {
      delete query.farmerId;
      return await LoanRepository.getLoans(query, user.id);
    }
  }

  static async getLoan(id: string) {
    return await LoanRepository.getLoan(id);
  }

  static async deleteLoan(
    user: { id: string; role: "admin" | "farmer" },
    id: string
  ) {
    if (user.role === "admin") {
      return await LoanRepository.deleteLoan(id);
    } else {
      throw new ErrorConstructor(
        "Access denied. Your role does not permit this action.",
        403
      );
    }
  }

  static async approveLoan(
    user: { id: string; role: "admin" | "farmer" },
    id: string
  ) {
    if (user.role === "admin") {
      return await LoanRepository.approveLoan(id);
    } else {
      throw new ErrorConstructor(
        "Access denied. Your role does not permit this action.",
        403
      );
    }
  }

  static async rejectLoan(
    user: { id: string; role: "admin" | "farmer" },
    id: string
  ) {
    if (user.role === "admin") {
      return await LoanRepository.rejectLoan(id);
    } else {
      throw new ErrorConstructor(
        "Access denied. Your role does not permit this action.",
        403
      );
    }
  }

  static async loanMetric(
    user: { id: string; role: "admin" | "farmer" },
    farmerId?: string
  ) {
    if (user.role === "admin") {
      if (farmerId) {
        return await LoanRepository.loanMetric(farmerId);
      } else {
        throw new ErrorConstructor(
          "Access denied. Your role does not permit this action.",
          403
        );
      }
    } else if (user.role === "farmer") {
      if (!farmerId) {
        return await LoanRepository.loanMetric(user.id);
      } else {
        throw new ErrorConstructor(
          "Access denied. Your role does not permit this action.",
          403
        );
      }
    }
  }

  static async loanMetrics(
    user: { id: string; role: "admin" | "farmer" },
    query: {
      page?: number;
      perPage?: number;
    }
  ) {
    if (user.role === "admin") {
      return await LoanRepository.loanMetrics(query);
    } else {
      throw new ErrorConstructor(
        "Access denied. Your role does not permit this action.",
        403
      );
    }
  }
}
