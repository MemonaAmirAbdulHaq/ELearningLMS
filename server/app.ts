require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user-route";
import courseRouter from "./routes/course-route";
import orderRouter from "./routes/order-route";
import notificationRouter from "./routes/notification-route";
import analyticsRouter from "./routes/analytics-route";
import layoutRouter from "./routes/layout-route";
import { rateLimit } from "express-rate-limit";

// Body Parser
app.use(express.json({ limit: "50mb" }));


app.use(cookieParser());


app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
});

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/notification", notificationRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/api/v1/layout", layoutRouter);

// Testing API
app.get("/test", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "The Api Endpoint is working fine",
  });
});

// Unknown Route
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found!`) as any;
  err.statusCode = 404;
  next(err);
});

// Rate Limitng
app.use(limiter);

// Error Handler Middleware
app.use(ErrorMiddleware);
