import express from "express";
import {
  authorizeRoles,
  isAuthenticated,
  updateAccessToken,
} from "../middleware/auth";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification-controller";

const notificationRouter = express.Router();

// Get All Notifications for Admin
notificationRouter.get(
  "/get-all",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getNotifications
);

// Update Notification for Admin
notificationRouter.put(
  "/update/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotification
);

export default notificationRouter;
