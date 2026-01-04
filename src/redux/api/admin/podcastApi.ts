import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const podcastsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPodcast: build.query({
      query: (arg) => ({
        url: "/podcast",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.a_podcast],
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),
    storePodcast: build.mutation({
      query: (data: any) => ({
        url: "/podcast",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.a_podcast],
    }),
    // updateFqa: build.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/faq/${id}`,
    //     method: "POST",
    //     data,
    //   }),
    //   invalidatesTags: [tagTypes.a_fqa],
    // }),
    deletePodcast: build.mutation({
      query: (id) => ({
        url: `/podcast/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.a_podcast],
    }),
  }),
});

export const {
  useGetPodcastQuery,
  useDeletePodcastMutation,
  useStorePodcastMutation,
} = podcastsApi;
