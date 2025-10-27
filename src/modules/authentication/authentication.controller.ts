import { ErrorConstructor } from "../../utils/errors.js";
import { UserService } from "./authentication.services.js";
import type { Response, Request, NextFunction } from "express";

export class UserController {
  static async createUser(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserService.createUser(request.body);
      return response.status(201).json({
        status: "success",
        message: "User created successfully",
        data: user,
      });
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to create user",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }

  static async loginUser(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserService.loginUser(request.body);
      if (user) {
        return response.status(200).json({
          status: "success",
          message: "User logged in successfully",
          data: user.data,
          token: user.token,
        });
      } else {
        return response.status(404).json({
          status: "error",
          message: "Invalid credentials",
        });
      }
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to login user",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }

  static async forgotPassword(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await UserService.forgotPassword(request.body.email);
      return response.status(200).json({
        status: "success",
        message: `If an account exists for ${request.body.email}, a password reset link will be sent to that email address.`,
      });
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Email delivery failed",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }

  static async resetPassword(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await UserService.resetPassword(request.body);
      return response.status(200).json({
        status: "success",
        message: "Password reset successfully",
      });
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to reset password",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }
}
