import express from "express";
import {
  authorizeRoles,
  isAuthenticated,
  updateAccessToken,
} from "../middleware/auth";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAllCourses,
  getAllCoursesComplete,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course-controller";

const courseRouter = express.Router();

// Create Course
courseRouter.post(
  "/create",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);

// Edit/Update Course
courseRouter.put(
  "/update/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);
//Get Single Course (Unverified)
courseRouter.get("/get/:id", getSingleCourse);

//Get All Courses (Unverified)
courseRouter.get("/get-all", getAllCourses);

//Get Course Content (Purchased)
courseRouter.get(
  "/get-course-content/:id",
  updateAccessToken,
  isAuthenticated,
  getCourseByUser
);

//Post Question on Course Contant
courseRouter.put(
  "/add-question",
  updateAccessToken,
  isAuthenticated,
  addQuestion
);

//Post Answer on a Question
courseRouter.put("/add-answer", updateAccessToken, isAuthenticated, addAnswer);

//Post Review on a Course
courseRouter.put(
  "/add-review/:id",
  updateAccessToken,
  isAuthenticated,
  addReview
);

//Post Reply to Review
courseRouter.put(
  "/add-reply-review",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview
);

// Get All Courses (Admin)
courseRouter.get(
  "/get",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCoursesComplete
);

// Get VdoCipher OTP
courseRouter.post("/getVdoCipherOTP", generateVideoUrl);

// Delete Course (Admin)
courseRouter.delete(
  "/delete/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCourse
);
export default courseRouter;
