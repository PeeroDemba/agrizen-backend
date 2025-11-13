import { ErrorConstructor } from "../../utils/errors.js";
import { ProfileService } from "./profile.services.js";
import type { Response, Request, NextFunction } from "express";

export class ProfileController {
  static async getProfile(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const profile = await ProfileService.getProfile(request.user.id);
      return response.status(200).json({
        status: "success",
        message: "Profile retrieved successfully",
        data: profile,
      });
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to retrieve profile",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }

  static async getFarmers(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const farmer = await ProfileService.getFarmers(
        request.user,
        request.query
      );
      let page = request.query.page ? Number(request.query.page) : 1;
      let perPage = request.query.perPage ? Number(request.query.perPage) : 10;

      return response.status(200).json({
        status: "success",
        message: "Farmers retrieved successfully",
        data: farmer.rows,
        meta: {
          total: farmer.count,
          page: page,
          perPage: perPage,
          prevPage: page === 1 ? null : page - 1,
          nextPage: Math.ceil(farmer.count / perPage) > page ? page + 1 : null,
        },
      });
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to retrieve farmers",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }

  static async getFarmer(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const farmer = await ProfileService.getFarmer(
        request.user,
        request.params.id!
      );

      return response.status(200).json({
        status: "success",
        message: "Farmer retrieved successfully",
        data: farmer,
      });
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to retrieve farmer",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }
}
