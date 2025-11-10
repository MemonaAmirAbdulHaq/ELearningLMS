import { Response, Request, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import LayoutModel from "../models/layout-model";
import cloudinary from "cloudinary";

// Create Layout
export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExist = await LayoutModel.findOne({ type });
      if (isTypeExist) {
        return next(new ErrorHandler(`${type} already exists!`, 400));
      }
      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
        const banner = {
          type: "Banner",
          banner: {
            image: {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            },
            title,
            subTitle,
          },
        };
        await LayoutModel.create(banner);
      } else if (type === "FAQ") {
        const { faq } = req.body;
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await LayoutModel.create({ type, faq: faqItems });
      } else if (type === "Categories") {
        const { categories } = req.body;
        const categoryItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await LayoutModel.create({ type, categories: categoryItems });
      } else {
        return next(new ErrorHandler(`Invalid Type for Layout`, 400));
      }

      res.status(200).json({
        success: true,
        message: "Layout created successfully!",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Edit Layout
export const updateLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (type === "Banner") {
        const bannerData: any = await LayoutModel.findOne({ type });
        const { image, title, subTitle } = req.body;
        if (!bannerData) {
          return next(new ErrorHandler(`${type} doesn't exist!`, 400));
        }

        const data = image.startsWith("https")
          ? bannerData
          : await cloudinary.v2.uploader.upload(image, {
              folder: "layout",
            });

        const banner = {
          type: "Banner",
          image: {
            public_id: image.startsWith("https")
              ? bannerData.banner.image.public_id
              : data?.public_id,
            url: image.startsWith("https")
              ? bannerData.banner.image.url
              : data?.secure_url,
          },
          title,
          subTitle,
        };
        await LayoutModel.findByIdAndUpdate(bannerData._id, { banner });
      } else if (type === "FAQ") {
        const faqData = await LayoutModel.findOne({ type });
        if (!faqData) {
          return next(new ErrorHandler(`${type} doesn't exist!`, 400));
        }
        const { faq } = req.body;
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await LayoutModel.findByIdAndUpdate(faqData._id, { faq: faqItems });
      } else if (type === "Categories") {
        const categoriesData = await LayoutModel.findOne({ type });
        if (!categoriesData) {
          return next(new ErrorHandler(`${type} doesn't exist!`, 400));
        }
        const { categories } = req.body;
        const categoryItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await LayoutModel.findByIdAndUpdate(categoriesData._id, {
          categories: categoryItems,
        });
      } else {
        return next(new ErrorHandler(`Invalid Type for Layout`, 400));
      }

      res.status(200).json({
        success: true,
        message: "Layout updated successfully!",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get Layout by Type
export const getLayoutByType = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.params;
      const layout = await LayoutModel.findOne({ type });
      if (!layout) {
        return next(new ErrorHandler(`${type} doesn't exist!`, 400));
      }
      res.status(200).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
