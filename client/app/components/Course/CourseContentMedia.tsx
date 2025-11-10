import CoursePlayer from "@/app/utils/CoursePlayer";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import defaultAvatar from "../../../public/assets/avatar.jpg";
import toast from "react-hot-toast";
import {
  useAddAnswertoQuestionMutation,
  useAddNewQuestionMutation,
  useAddReviewMutation,
  useAddReviewReplyMutation,
  useGetSingleUserCourseQuery,
} from "@/redux/features/course/courseApi";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
type Props = {
  data: any;
  id: string;
  setActiveVideo: (activeVideo: number) => void;
  activeVideo: number;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  setActiveVideo,
  activeVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [questionId, setQuestionId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reviewReply, setReviewReply] = useState("");
  const [reviewId, setReviewId] = useState("");
  const { data: course, refetch: reviewRefetch } = useGetSingleUserCourseQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );
  const [
    addNewQuestion,
    {
      isSuccess: questionSuccess,
      isLoading: questionLoading,
      error: questionError,
    },
  ] = useAddNewQuestionMutation();

  const [
    addAddAnswertoQuestion,
    { isSuccess: answerSuccess, error: answerError, isLoading: answerLoading },
  ] = useAddAnswertoQuestionMutation();

  const [
    addReview,
    { isSuccess: reviewSuccess, error: reviewError, isLoading: reviewLoading },
  ] = useAddReviewMutation();

  const [
    addReviewReply,
    {
      isSuccess: reviewReplySuccess,
      error: reviewReplyError,
      isLoading: reviewReplyLoading,
    },
  ] = useAddReviewReplyMutation();
  const alreadyReviewd = course?.course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );
  const handleQuestionSubmit = () => {
    if (question.length < 11) {
      toast.error("Question should be atleast 10 characters long!");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (questionSuccess) {
      toast.success("Question added successfully!");
      socketId.emit("notification", {
        title: "New Question Received",
        message: `You have a new question on ${data[activeVideo].title}`,
        userId: user?._id,
      });
      setQuestion("");
      refetch();
    }

    if (questionError) {
      if ("data" in questionError) {
        const errorData = questionError.data as {
          success?: boolean;
          message?: string;
        };
        toast.error(errorData?.message || "Adding question failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }, [questionSuccess, questionError, refetch]);

  useEffect(() => {
    if (answerSuccess) {
      toast.success("Answer added successfully!");
      if (user?.role !== "admin") {
        socketId.emit("notification", {
          title: "New Reply Received",
          message: `You have a new question reply on ${data[activeVideo].title}`,
          userId: user?._id,
        });
      }
      setAnswers({});
      setQuestionId("");
      refetch();
    }

    if (answerError) {
      if ("data" in answerError) {
        const errorData = answerError.data as {
          success?: boolean;
          message?: string;
        };
        toast.error(errorData?.message || "Adding answer failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }, [answerSuccess, answerError, refetch]);

  useEffect(() => {
    if (reviewSuccess) {
      toast.success("Review added successfully!");
      socketId.emit("notification", {
        title: "New Review Received",
        message: `You have a new review on ${data[activeVideo].title}`,
        userId: user?._id,
      });
      setRating(0);
      setReview("");
      reviewRefetch();
    }

    if (reviewError) {
      if ("data" in reviewError) {
        const errorData = reviewError.data as {
          success?: boolean;
          message?: string;
        };
        toast.error(errorData?.message || "Adding review failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }, [reviewSuccess, reviewError, reviewRefetch]);

  useEffect(() => {
    if (reviewReplySuccess) {
      toast.success("Review reply added successfully!");
      setReviewReply("");
      setIsReviewReply(false);
      reviewRefetch();
    }

    if (reviewReplyError) {
      if ("data" in reviewReplyError) {
        const errorData = reviewReplyError.data as {
          success?: boolean;
          message?: string;
        };
        toast.error(errorData?.message || "Adding review failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }, [reviewReplySuccess, reviewReplyError, reviewRefetch]);

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Please enter review message!");
    } else if (rating === 0) {
      toast.error("Please select a rating!");
    } else {
      await addReview({ courseId: id, rating, review });
    }
  };

  const handleAnswerSubmit = async (currentQuestionId: string) => {
    const currentAnswer = answers[currentQuestionId];
    if (!currentAnswer || !currentAnswer.trim()) {
      toast.error("Please enter an answer");
      return;
    }

    await addAddAnswertoQuestion({
      answer: currentAnswer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: currentQuestionId,
    });
  };

  const handleReviewReplySubmit = async () => {
    if (!reviewReplyLoading) {
      if (reviewReply === "") {
        toast.error("Please fill in the reply!");
      } else {
        await addReviewReply({ comment: reviewReply, courseId: id, reviewId });
      }
    }
  };

  // Update the answer for a specific question
  const updateAnswer = (questionId: string, answerText: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerText,
    }));
  };

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto bg-white dark:bg-gray-900">
      {/* Video Player */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
        <CoursePlayer
          title={data[activeVideo]?.title}
          videoUrl={data[activeVideo]?.videoUrl}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="w-full flex items-center justify-between my-6">
        <button
          className={`flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-Poppins font-[500] rounded-lg transition-all duration-300 ${
            activeVideo === 0 && "!bg-gray-400 !cursor-not-allowed opacity-70"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
          disabled={activeVideo === 0}
        >
          <AiOutlineArrowLeft className="mr-2" size={18} />
          Prev Lesson
        </button>
        <button
          className={`flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-Poppins font-[500] rounded-lg transition-all duration-300 ${
            activeVideo === data.length - 1 &&
            "!bg-gray-400 !cursor-not-allowed opacity-70"
          }`}
          onClick={() =>
            setActiveVideo(
              data && activeVideo === data.length - 1
                ? activeVideo
                : activeVideo + 1
            )
          }
          disabled={activeVideo === data.length - 1}
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" size={18} />
        </button>
      </div>

      {/* Video Title */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-[25px] font-Poppins font-[600] text-gray-900 dark:text-white">
          {data[activeVideo].title}
        </h1>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          {["Overview", "Resources", "Q&A", "Reviews"].map(
            (text: string, index: number) => (
              <button
                key={index}
                className={`px-4 py-3 font-Poppins font-[500] text-[16px] 800px:text-[18px] transition-all duration-300 border-b-2 ${
                  activeBar === index
                    ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-800 dark:hover:text-gray-200"
                }`}
                onClick={() => setActiveBar(index)}
              >
                {text}
              </button>
            )
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        {/* Overview */}
        {activeBar === 0 && (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-[16px] leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {data[activeVideo]?.description}
            </p>
          </div>
        )}

        {/* Resources */}
        {activeBar === 1 && (
          <div className="space-y-4">
            {data[activeVideo]?.links.map((item: any, index: number) => (
              <div
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                key={index}
              >
                <h2 className="text-[18px] font-Poppins font-[600] text-gray-900 dark:text-white mb-2">
                  {item.title && item.title}
                </h2>
                <a
                  href={item.url}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline text-[16px] break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.url}
                </a>
              </div>
            ))}
            {data[activeVideo]?.links.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No resources available for this lesson.
              </p>
            )}
          </div>
        )}

        {/* Q & A */}
        {activeBar === 2 && (
          <div className="space-y-6">
            {/* Question Form */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-[20px] font-Poppins font-[600] text-gray-900 dark:text-white mb-4">
                Ask a Question
              </h3>
              <div className="flex gap-4">
                <Image
                  src={user.avatar ? user.avatar?.url : defaultAvatar}
                  width={50}
                  height={50}
                  alt="user-icon"
                  className="w-[50px] h-[50px] rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Write your question..."
                    rows={4}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      className={`px-6 py-2 bg-blue-600 text-white font-Poppins font-[500] rounded-lg transition-all duration-300 ${
                        questionLoading || question.length < 11
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-700"
                      }`}
                      onClick={
                        questionLoading ? () => {} : handleQuestionSubmit
                      }
                      disabled={questionLoading || question.length < 11}
                    >
                      {questionLoading ? "Submitting..." : "Submit Question"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <CommentReply
                data={data}
                activeVideo={activeVideo}
                answers={answers}
                updateAnswer={updateAnswer}
                handleAnswerSubmit={handleAnswerSubmit}
                user={user}
                setQuestionId={setQuestionId}
                answerLoading={answerLoading}
              />
            </div>
          </div>
        )}

        {/* Reviews */}
        {activeBar === 3 && (
          <div className="space-y-6">
            {!alreadyReviewd && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-[20px] font-Poppins font-[600] text-gray-900 dark:text-white mb-4">
                  Write a Review
                </h3>
                <div className="flex gap-4">
                  <Image
                    src={user.avatar ? user.avatar.url : defaultAvatar}
                    width={50}
                    height={50}
                    alt="user-icon"
                    className="w-[50px] h-[50px] rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="mb-4">
                      <label className="block text-[16px] font-Poppins font-[500] text-gray-900 dark:text-white mb-2">
                        Rating <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) =>
                          rating >= i ? (
                            <AiFillStar
                              key={i}
                              className="cursor-pointer hover:scale-110 transition-transform"
                              color="rgb(246,186,0)"
                              size={28}
                              onClick={() => setRating(i)}
                            />
                          ) : (
                            <AiOutlineStar
                              key={i}
                              className="cursor-pointer hover:scale-110 transition-transform"
                              color="rgb(246,186,0)"
                              size={28}
                              onClick={() => setRating(i)}
                            />
                          )
                        )}
                      </div>
                    </div>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Share your thoughts about this course..."
                      rows={4}
                      className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <div className="flex justify-end mt-3">
                      <button
                        className={`px-6 py-2 bg-blue-600 text-white font-Poppins font-[500] rounded-lg transition-all duration-300 ${
                          reviewLoading || !review.trim() || rating === 0
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-blue-700"
                        }`}
                        onClick={reviewLoading ? () => {} : handleReviewSubmit}
                        disabled={
                          reviewLoading || !review.trim() || rating === 0
                        }
                      >
                        {reviewLoading ? "Submitting..." : "Submit Review"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews List */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="space-y-6">
                {course &&
                  course?.course?.reviews &&
                  [...course?.course?.reviews]
                    .reverse()
                    .map((item: any, index: number) => (
                      <div
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                        key={index}
                      >
                        <div className="flex gap-4">
                          <Image
                            alt="user-img"
                            src={item?.user?.avatar?.url || defaultAvatar}
                            width={50}
                            height={50}
                            className="h-[50px] w-[50px] object-cover rounded-full flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-[18px] font-Poppins font-[600] text-gray-900 dark:text-white">
                                {item?.user?.name}
                              </h4>
                              <small className="text-gray-500 dark:text-gray-400">
                                {format(item?.createdAt)}
                              </small>
                            </div>
                            <Ratings rating={item?.rating} />
                            <p className="text-gray-700 dark:text-gray-300 mt-3 leading-relaxed">
                              {item?.comment}
                            </p>
                          </div>
                        </div>

                        {user.role === "admin" &&
                          item.commentReplies.length === 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                              <button
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-Poppins font-[500] text-[14px]"
                                onClick={() => {
                                  setIsReviewReply(!isReviewReply);
                                  setReviewId(item?._id);
                                }}
                              >
                                Add Reply
                              </button>
                            </div>
                          )}

                        {isReviewReply && reviewId === item?._id && (
                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                            <div className="flex gap-3">
                              <input
                                type="text"
                                value={reviewReply}
                                onChange={(e: any) =>
                                  setReviewReply(e.target.value)
                                }
                                placeholder="Enter your reply..."
                                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              />
                              <button
                                type="button"
                                className={`px-6 py-3 bg-blue-600 text-white font-Poppins font-[500] rounded-lg transition-all duration-300 ${
                                  reviewReplyLoading || !reviewReply.trim()
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-blue-700"
                                }`}
                                onClick={handleReviewReplySubmit}
                                disabled={
                                  reviewReplyLoading || !reviewReply.trim()
                                }
                              >
                                {reviewReplyLoading ? "Submitting..." : "Reply"}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Admin Replies */}
                        {item?.commentReplies.map(
                          (i: any, replyIndex: number) => (
                            <div
                              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"
                              key={replyIndex}
                            >
                              <div className="flex gap-4 800px:ml-8">
                                <Image
                                  alt="user-img"
                                  src={i?.user?.avatar?.url || defaultAvatar}
                                  width={40}
                                  height={40}
                                  className="h-[40px] w-[40px] object-cover rounded-full flex-shrink-0"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h5 className="text-[16px] font-Poppins font-[600] text-gray-900 dark:text-white">
                                      {i.user.name}
                                    </h5>
                                    {i.user.role === "admin" && (
                                      <VscVerifiedFilled className="text-green-500 text-[16px]" />
                                    )}
                                  </div>
                                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {i.comment}
                                  </p>
                                  <small className="text-gray-500 dark:text-gray-400">
                                    {format(i.createdAt)}
                                  </small>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ))}

                {(!course?.course?.reviews ||
                  course?.course?.reviews.length === 0) && (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    No reviews yet. Be the first to review this course!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  user,
  answers,
  updateAnswer,
  setQuestionId,
  handleAnswerSubmit,
  answerLoading,
}: any) => {
  return (
    <div className="space-y-6">
      {data[activeVideo].questions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No questions yet. Be the first to ask a question!
        </p>
      ) : (
        data[activeVideo].questions.map((question: any, index: number) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            question={question}
            index={index}
            answers={answers}
            updateAnswer={updateAnswer}
            setQuestionId={setQuestionId}
            answerLoading={answerLoading}
            handleAnswerSubmit={handleAnswerSubmit}
            user={user}
          />
        ))
      )}
    </div>
  );
};

const CommentItem = ({
  data,
  setQuestionId,
  answers,
  question,
  updateAnswer,
  handleAnswerSubmit,
  answerLoading,
  user,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  const currentAnswer = answers[question._id] || "";

  const handleSubmit = () => {
    handleAnswerSubmit(question._id);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
      {/* Question */}
      <div className="flex gap-4 mb-4">
        <Image
          alt="user-img"
          src={question?.user?.avatar?.url || defaultAvatar}
          width={50}
          height={50}
          className="h-[50px] w-[50px] object-cover rounded-full flex-shrink-0"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-[18px] font-Poppins font-[600] text-gray-900 dark:text-white">
              {question?.user?.name}
            </h5>
            <small className="text-gray-500 dark:text-gray-400">
              {format(question.createdAt)}
            </small>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {question?.question}
          </p>
        </div>
      </div>

      {/* Reply Controls */}
      <div className="flex items-center gap-4 mb-4">
        <button
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-Poppins font-[500] text-[14px]"
          onClick={() => {
            setReplyActive(!replyActive);
            setQuestionId(question._id);
          }}
        >
          <BiMessage size={16} />
          {!replyActive
            ? question.questionReplies?.length !== 0
              ? `View Replies (${question.questionReplies?.length})`
              : "Add Reply"
            : "Hide Replies"}
        </button>
      </div>

      {/* Replies */}
      {replyActive && (
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-4">
          {/* Existing Replies */}
          {question.questionReplies.map((reply: any, index: number) => (
            <div className="flex gap-4 800px:ml-8" key={index}>
              <Image
                alt="user-img"
                src={reply?.user?.avatar?.url || defaultAvatar}
                width={40}
                height={40}
                className="h-[40px] w-[40px] object-cover rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h6 className="text-[16px] font-Poppins font-[600] text-gray-900 dark:text-white">
                    {reply.user.name}
                  </h6>
                  {reply.user.role === "admin" && (
                    <VscVerifiedFilled className="text-green-500 text-[16px]" />
                  )}
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {reply.answer}
                </p>
                <small className="text-gray-500 dark:text-gray-400">
                  {format(reply.createdAt)}
                </small>
              </div>
            </div>
          ))}

          {/* New Reply Form */}
          <div className="flex gap-4 800px:ml-8">
            <Image
              src={user?.avatar?.url || defaultAvatar}
              width={40}
              height={40}
              alt="user-avatar"
              className="w-[40px] h-[40px] rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={currentAnswer}
                  onChange={(e) => updateAnswer(question._id, e.target.value)}
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && currentAnswer.trim()) {
                      handleSubmit();
                    }
                  }}
                />
                <button
                  type="button"
                  className={`px-6 py-3 bg-blue-600 text-white font-Poppins font-[500] rounded-lg transition-all duration-300 ${
                    answerLoading || !currentAnswer.trim()
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-700"
                  }`}
                  onClick={handleSubmit}
                  disabled={!currentAnswer.trim() || answerLoading}
                >
                  {answerLoading ? "Submitting..." : "Reply"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;
