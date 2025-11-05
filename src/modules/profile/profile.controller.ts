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
}
