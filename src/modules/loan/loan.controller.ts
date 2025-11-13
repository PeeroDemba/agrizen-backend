import { ErrorConstructor } from "../../utils/errors.js";
import { LoanService } from "./loan.services.js";
import type { Response, Request, NextFunction } from "express";

export class LoanController {
  static async createLoan(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const loan = await LoanService.createLoan(request.user, request.body);
      return response.status(201).json({
        status: "success",
        message: "Loan created successfully",
        data: loan,
      });
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to create loan",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }

  static async getLoans(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const loan = await LoanService.getLoans(request.user, request.query);
      let page = request.query.page ? Number(request.query.page) : 1;
      let perPage = request.query.perPage ? Number(request.query.perPage) : 10;

      return response.status(200).json({
        status: "success",
        message: "Loans retrieved successfully",
        data: loan.rows,
        meta: {
          total: loan.count,
          page: page,
          perPage: perPage,
          prevPage: page === 1 ? null : page - 1,
          nextPage: Math.ceil(loan.count / perPage) > page ? page + 1 : null,
        },
      });
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to retrieve loans",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }

  static async getLoan(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const loan = await LoanService.getLoan(request.params.id!);
      if (loan) {
        return response.status(200).json({
          status: "success",
          message: "Loan retrieved successfully",
          data: loan,
        });
      } else {
        return response.status(404).json({
          status: "error",
          message: "Loan does not exist",
        });
      }
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to retrieve loan",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }

  static async deleteLoan(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await LoanService.deleteLoan(request.user, request.params.id!);
      return response.status(200).json({
        status: "success",
        message: "Loan deleted successfully",
      });
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to delete loan",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }

  static async approveLoan(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await LoanService.approveLoan(request.user, request.params.id!);
      return response.status(200).json({
        status: "success",
        message: "Loan approved successfully",
      });
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to approve loan",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }

  static async rejectLoan(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await LoanService.rejectLoan(request.user, request.params.id!);
      return response.status(200).json({
        status: "success",
        message: "Loan rejected successfully",
      });
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to reject loan",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }

  static async loanMetric(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const loan = await LoanService.loanMetric(
        request.user,
        request.params.id!
      );
      return response.status(200).json({
        status: "success",
        message: "Loan metric retrieved successfully",
        data: loan,
      });
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to retrieve loan metric",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }

  static async loanMetrics(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const loan = await LoanService.loanMetrics(request.user, request.query);
      let page = request.query.page ? Number(request.query.page) : 1;
      let perPage = request.query.perPage ? Number(request.query.perPage) : 10;

      return response.status(200).json({
        status: "success",
        message: "Loan metrics retrieved successfully",
        data: loan.rows,
        meta: {
          total: loan.count,
          page: page,
          perPage: perPage,
          prevPage: page === 1 ? null : page - 1,
          nextPage: Math.ceil(loan.count / perPage) > page ? page + 1 : null,
        },
      });
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to retrieve loan metrics",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }
}
