import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const newsletterApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNewslet: build.query({
      query: (arg) => ({
        url: "/newsletter",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.a_newsletter],
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),
    storeNewslet: build.mutation({
      query: (data: any) => ({
        url: "/newsletter",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.a_newsletter],
    }),
    deleteNewslet: build.mutation({
      query: (id) => ({
        url: `/newsletter/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.a_newsletter],
    }),
    replayNewslet: build.mutation({
      query: ({ id, data }) => ({
        url: `/newsletter/${id}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.a_newsletter],
    }),
  }),
});

export const {
  useGetNewsletQuery,
  useStoreNewsletMutation,
  useDeleteNewsletMutation,
  useReplayNewsletMutation,
} = newsletterApi;
