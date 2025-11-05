import express from "express";
import { NotificationController } from "./notification.controller.js";
import { authMiddleware } from "../../utils/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, NotificationController.getNotifications);

router.get("/:id", authMiddleware, NotificationController.getNotification);

router.delete(
  "/:id",
  authMiddleware,
  NotificationController.deleteNotification
);

router.patch("/:id", authMiddleware, NotificationController.readNotification);

export default router;
