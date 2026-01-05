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
      query: ({ data, onUploadProgress }) => ({
        url: "/podcast",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
        onUploadProgress,
      }),
      invalidatesTags: [tagTypes.a_podcast],
    }),
    updatePadcast: build.mutation({
      query: ({ id, data, onUploadProgress }) => ({
        url: `/podcast/${id}`,
        method: "POST",
        ContentType: "multipart/form-data",
        data,
        onUploadProgress,
      }),
      invalidatesTags: [tagTypes.a_podcast],
    }),
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
  useUpdatePadcastMutation,
} = podcastsApi;
