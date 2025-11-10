import express from "express";
import {
  authorizeRoles,
  isAuthenticated,
  updateAccessToken,
} from "../middleware/auth";
import {
  getCoursesAnalytics,
  getOrdersAnalytics,
  getUsersAnalytics,
} from "../controllers/analytics-controller";

const analyticsRouter = express.Router();

// Get User's Analytics (Admin)
analyticsRouter.get(
  "/users",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getUsersAnalytics
);

// Get Course's Analytics (Admin)
analyticsRouter.get(
  "/courses",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getCoursesAnalytics
);

// Get Order's Analytics (Admin)
analyticsRouter.get(
  "/orders",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getOrdersAnalytics
);
export default analyticsRouter;
