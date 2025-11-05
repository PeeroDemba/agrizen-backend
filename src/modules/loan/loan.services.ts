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

  static async getLoans(query: {
    filter?: "pending" | "approved" | "rejected";
    page?: number;
    perPage?: number;
  }) {
    return await LoanRepository.getLoans(query);
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
}
