import { apiSlice } from "../api/apiSlice";
export const analyticApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseAnalytics: builder.query({
      query: () => ({
        url: "analytics/courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getOrdersAnalytics: builder.query({
      query: () => ({
        url: "analytics/orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getUsersAnalytics: builder.query({
      query: () => ({
        url: "analytics/users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});
export const {
  useGetCourseAnalyticsQuery,
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} = analyticApi;
