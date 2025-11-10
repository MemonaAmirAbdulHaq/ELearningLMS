import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type) => ({
        url: `layout/get/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateHeroData: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: "layout/update",
        method: "PUT",
        body: {
          type,
          image,
          title,
          subTitle,
          faq,
          categories,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetHeroDataQuery, useUpdateHeroDataMutation } = layoutApi;
