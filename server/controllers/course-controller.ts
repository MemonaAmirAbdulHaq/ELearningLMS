require("dotenv").config();
import { Response, Request, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import cloudinary from "cloudinary";
import { createCourse, getAllCoursesService } from "../services/course-service";
import courseModel from "../models/course-model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification-model";
import axios from "axios";

// Upload Course
export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folders: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Edit Course
export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data?.thumbnail;
      const courseId = req.params.id;

      const courseData = (await courseModel.findById(courseId)) as any;

      if (thumbnail && !thumbnail.startsWith("https")) {
        await cloudinary.v2.uploader.destroy(courseData?.thumbnail.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (thumbnail.startsWith("https")) {
        data.thumbnail = {
          public_id: courseData?.thumbnail.public_id,
          url: courseData?.thumbnail.url,
        };
      }

      const course = await courseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get Single Course (Without Purchase)
export const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const isCacheExist = await redis.get(courseId as string);
      if (isCacheExist) {
        const course = JSON.parse(isCacheExist);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await courseModel
          .findById(courseId)
          .select(
            "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
          );

        await redis.set(
          courseId as string,
          JSON.stringify(course),
          "EX",
          604800
        );

        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get All Courses (Without Purchase)
export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await courseModel
        .find()
        .select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );

      res.status(200).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get Courses (After Purchase)
export const getCourseByUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;

      const courseExist = userCourseList?.find(
        (course: any) => course._id.toString() === courseId
      );
      if (!courseExist) {
        return next(
          new ErrorHandler("You don't have access to this course", 400)
        );
      }

      const course = await courseModel.findById(courseId);
      const content = course?.courseData;
      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Add Question in Course
interface IAddQuestion {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId }: IAddQuestion = req.body;
      const course = await courseModel.findById(courseId);
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErrorHandler(`Invalid content Id`, 400));
      }

      // Create a new Question Object
      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };

      // Adding Question to Course Content
      courseContent.questions.push(newQuestion);

      // Send Notification to Admin
      await NotificationModel.create({
        user: req.user?._id,
        title: "New Question",
        message: `You got a new question in course: ${course?.name}`,
      });

      // Save Updated Course
      await course?.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Add Answer to Question (Admin)
interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

export const addAnswer = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, courseId, contentId, questionId }: IAddAnswerData =
        req.body;
      const course = await courseModel.findById(courseId);
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }
      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErrorHandler(`Invalid content Id`, 400));
      }

      const question = courseContent?.questions?.find((item: any) =>
        item._id.equals(questionId)
      );

      if (!question) {
        return next(new ErrorHandler(`Question not found!`, 400));
      }

      // Create a new Answer Object
      const newAnswer: any = {
        user: req.user,
        answer,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add answer to Course Content
      question.questionReplies.push(newAnswer);

      await course?.save();

      if (req.user?._id === question.user._id) {
        // Create Notification for Admin
        await NotificationModel.create({
          user: req.user?._id,
          title: "New Reply to Question Received",
          message: `You got a new reply to a question in ${courseContent?.title}`,
        });
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title,
        };

        try {
          await sendMail({
            email: question.user.email,
            subject: "Question Reply",
            template: "question-reply.ejs",
            data,
          });
        } catch (error: any) {
          console.log(error.message);
          return next(new ErrorHandler(`Error sending mail`, 400));
        }
      }

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Add Reviews to Course
interface IAddReviewData {
  review: string;
  rating: number;
  userId: string;
}

export const addReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;

      const courseId = req.params.id;

      //Check if Course Id Exists in User Course List
      const courseExist = userCourseList?.some(
        (course: any) => course._id.toString() === courseId?.toString()
      );
      if (!courseExist) {
        return next(
          new ErrorHandler(
            `You are not authorized to access this course's resource`,
            400
          )
        );
      }

      const course = await courseModel.findById(courseId);

      const { review, rating } = req.body as IAddReviewData;
      const reviewData: any = {
        user: req.user,
        comment: review,
        rating,
      };
      course?.reviews.push(reviewData);

      let avg = 0;

      course?.reviews.forEach((rev: any) => {
        avg += rev.rating;
      });

      if (course) {
        course.ratings = avg / course.reviews.length;
      }

      await redis.set(courseId as string, JSON.stringify(course), "EX", 604800);
      await course?.save();

      // Create Notification
      await NotificationModel.create({
        user: req.user?._id,
        title: "New Review Recieved",
        message: `${req.user?.name} has given a review on your course ${course?.name}`,
      });

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Add Reply in Review
interface IAddReviewReply {
  comment: string;
  courseId: string;
  reviewId: string;
}
export const addReplyToReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, courseId, reviewId } = req.body as IAddReviewReply;

      const course = await courseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler(`Invalid course Id`, 404));
      }

      const review = course.reviews?.find(
        (rev: any) => rev._id.toString() === reviewId
      );

      if (!review) {
        return next(new ErrorHandler(`Invalid review Id`, 404));
      }

      const replyData: any = {
        user: req.user,
        comment,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (!review?.commentReplies) {
        review.commentReplies = [];
      }
      review?.commentReplies.push(replyData);

      await redis.set(courseId, JSON.stringify(course), "EX", 604800);

      await course.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get All Courses --- Admin
export const getAllCoursesComplete = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCoursesService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Delete Course --- Admin
export const deleteCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const course = await courseModel.findById(id);
      if (!course) {
        return next(new ErrorHandler(`Invalid course Id`, 404));
      }
      await courseModel.deleteOne({ _id: id });

      await redis.del(id as string);

      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Generate Video URL
export const generateVideoUrl = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.body;

      if (!videoId?.trim()) {
        return res
          .status(400)
          .json({ success: false, message: "videoId is required" });
      }
      if (!process.env.VDO_CIPHER_SECRET_KEY) {
        return res.status(500).json({
          success: false,
          message: "VDO_CIPHER_SECRET_KEY is not set",
        });
      }

      const response = await axios.post(
        `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
        { ttl: 300 },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Apisecret ${process.env.VDO_CIPHER_SECRET_KEY}`,
          },
        }
      );
      res.status(200).json({
        success: true,
        data: response.data,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
