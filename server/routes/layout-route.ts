import express from "express";
import {
  authorizeRoles,
  isAuthenticated,
  updateAccessToken,
} from "../middleware/auth";
import {
  createLayout,
  getLayoutByType,
  updateLayout,
} from "../controllers/layout-controller";

const layoutRouter = express.Router();

// Create Layout (Admin)
layoutRouter.post(
  "/create",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);

// Update Layout (Admin)
layoutRouter.put(
  "/update",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateLayout
);

// Get Layout
layoutRouter.get("/get/:type", getLayoutByType);

export default layoutRouter;
