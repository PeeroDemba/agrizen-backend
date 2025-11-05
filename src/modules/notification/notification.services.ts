import { NotificationRepository } from "./notification.repository.js";
import "dotenv/config";

export class NotificationService {
  static async getNotifications(
    user: { id: string; role: "admin" | "farmer" },
    query: {
      filter?: "unread" | "read";
      page?: number;
      perPage?: number;
    }
  ) {
    if (user.role === "admin") {
      return await NotificationRepository.getNotifications(query);
    } else {
      return await NotificationRepository.getNotifications(query, user.id);
    }
  }

  static async getNotification(id: string) {
    return await NotificationRepository.getNotification(id);
  }

  static async deleteNotification(id: string) {
    return await NotificationRepository.deleteNotification(id);
  }

  static async readNotification(
    user: { id: string; role: "admin" | "farmer" },
    id: string
  ) {
    return await NotificationRepository.readNotification(user.id, id);
  }
}
