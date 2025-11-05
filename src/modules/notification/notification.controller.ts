import { ErrorConstructor } from "../../utils/errors.js";
import { NotificationService } from "./notification.services.js";
import type { Response, Request, NextFunction } from "express";

export class NotificationController {
  static async getNotifications(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const notification = await NotificationService.getNotifications(
        request.user,
        request.query
      );
      let page = request.query.page ? Number(request.query.page) : 1;
      let perPage = request.query.perPage ? Number(request.query.perPage) : 10;

      return response.status(200).json({
        status: "success",
        message: "Notifications retrieved successfully",
        data: notification.rows,
        meta: {
          total: notification.count,
          page: page,
          perPage: perPage,
          prevPage: page === 1 ? null : page - 1,
          nextPage:
            Math.ceil(notification.count / perPage) > page ? page + 1 : null,
        },
      });
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to retrieve notifications",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }

  static async getNotification(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const notification = await NotificationService.getNotification(
        request.params.id!
      );
      if (notification) {
        return response.status(200).json({
          status: "success",
          message: "Notification retrieved successfully",
          data: notification,
        });
      } else {
        return response.status(404).json({
          status: "error",
          message: "Notification does not exist",
        });
      }
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to retrieve notification",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }

  static async deleteNotification(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await NotificationService.deleteNotification(request.params.id!);
      return response.status(200).json({
        status: "success",
        message: "Notification deleted successfully",
      });
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to delete notification",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }

  static async readNotification(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const count = await NotificationService.readNotification(
        request.user,
        request.params.id!
      );
      if (count[0] > 0) {
        return response.status(200).json({
          status: "success",
          message: "Notification successfully marked as read",
        });
      } else {
        return response.status(404).json({
          status: "error",
          message: "Notification does not exist",
        });
      }
    } catch (e: any) {
      if (e.code) {
        next(e);
      } else {
        next(
          new ErrorConstructor(
            "Failed to mark notification as read",
            400,
            JSON.stringify(e.errors)
          )
        );
      }
    }
  }
}
