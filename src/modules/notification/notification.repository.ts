import Notification from "../../database/models/notification.js";

export class NotificationRepository {
  static async getNotifications(
    query: {
      filter?: "unread" | "read";
      page?: number;
      perPage?: number;
    },
    farmerId?: string
  ) {
    return await Notification.findAndCountAll({
      where: {
        ...(query.filter ? { status: query.filter } : false),
        ...(farmerId ? { userId: farmerId } : false),
      },
      limit: query.perPage ?? 10,
      offset: query.page ? (query.page - 1) * (query.perPage ?? 10) : 0,
    });
  }

  static async getNotification(id: string) {
    return await Notification.findByPk(id);
  }

  static async deleteNotification(id: string) {
    return await Notification.destroy({
      where: {
        id,
      },
    });
  }

  static async readNotification(userId: string, notificationId: string) {
    return await Notification.update(
      { status: "read" },
      {
        where: {
          id: notificationId,
          userId,
        },
      }
    );
  }
}
