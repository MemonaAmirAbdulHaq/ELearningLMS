require("dotenv").config();
import { Response, Request, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { IOrder } from "../models/order-model";
import userModel from "../models/user-model";
import courseModel from "../models/course-model";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification-model";
import { getAllOrdersService, newOrder } from "../services/order-service";
import { redis } from "../utils/redis";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create Order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;

      if (payment_info) {
        if ("id" in payment_info) {
          const paymentIntentId = payment_info.id;
          const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId
          );
          if (paymentIntent.status !== "succeeded") {
            return next(new ErrorHandler(`Unauthorized Payment!`, 400));
          }
        }
      }

      const user = await userModel.findById(req.user?._id);

      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (courseExistInUser) {
        return next(
          new ErrorHandler(`You cannot purchase a course twice!`, 400)
        );
      }

      const course = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler(`Invalid course Id`, 404));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
        payment_info,
      };

      const mailData: any = {
        order: {
          _id: String(course._id).slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error) {
        return next(new ErrorHandler(`Error sending mail`, 400));
      }

      user?.courses.push(course?.id);

      await redis.set(req.user?._id as string, JSON.stringify(user));

      await user?.save();

      await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You got a new order of ${course?.name}`,
      });
      course.purchased = (course.purchased || 0) + 1;

      await redis.set(courseId, JSON.stringify(course));
      await course.save();

      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get All Orders --- Admin
export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrdersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Send Stripe Publishable Key
export const sendStripePublishableKey = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({
        publishablekey: process.env.STRIPE_PUBLISHABLE_KEY,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// New Payment
export const newPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "USD",
        metadata: {
          company: "ELearning - LMS",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
