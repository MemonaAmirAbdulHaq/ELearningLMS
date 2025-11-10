import express from "express";
import {
  authorizeRoles,
  isAuthenticated,
  updateAccessToken,
} from "../middleware/auth";
import {
  createOrder,
  getAllOrders,
  newPayment,
  sendStripePublishableKey,
} from "../controllers/order-controller";

const orderRouter = express.Router();

// Create Order
orderRouter.post("/create", updateAccessToken, isAuthenticated, createOrder);

// Get All Orders (Admin)
orderRouter.get(
  "/get-all",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);

// Get STRIPE Publishable Key
orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);

// Payment Gate Way
orderRouter.post("/payment", isAuthenticated, newPayment);
export default orderRouter;
