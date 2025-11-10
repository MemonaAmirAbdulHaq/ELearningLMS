import { apiSlice } from "../api/apiSlice";
export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "course/create",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "course/get",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `course/delete/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `course/update/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllUserCourses: builder.query({
      query: () => ({
        url: "course/get-all",
        method: "GET",
      }),
    }),
    getSingleUserCourse: builder.query({
      query: (id) => ({
        url: `course/get/${id}`,
        method: "GET",
      }),
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `course/get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addNewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: "course/add-question",
        method: "PUT",
        body: { question, courseId, contentId },
        credentials: "include" as const,
      }),
    }),
    addAnswertoQuestion: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: "course/add-answer",
        method: "PUT",
        body: {
          answer,
          courseId,
          contentId,
          questionId,
        },
        credentials: "include" as const,
      }),
    }),
    addReview: builder.mutation({
      query: ({ courseId, review, rating }) => ({
        url: `course/add-review/${courseId}`,
        method: "PUT",
        body: {
          review,
          rating,
        },
        credentials: "include" as const,
      }),
    }),
    addReviewReply: builder.mutation({
      query: ({ comment, courseId, reviewId }) => ({
        url: "course/add-reply-review",
        method: "PUT",
        body: {
          comment,
          courseId,
          reviewId,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
  useUpdateCourseMutation,
  useGetAllUserCoursesQuery,
  useGetSingleUserCourseQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddAnswertoQuestionMutation,
  useAddReviewMutation,
  useAddReviewReplyMutation,
} = courseApi;
