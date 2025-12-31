import { tagTypes } from "@/redux/tag-types";
import { buildResponse } from "@/lib";
import { baseApi } from "../baseApi";

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNoti: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/notification",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.notification],

      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),
    markNoti: build.mutation({
      query: (id: string) => ({
        url: `/mark/as/read/notification/${id}`,
        method: "POST",
        ContentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
    markAllNoti: build.mutation({
      query: () => ({
        url: `/mark/all/as/read/notification`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
  }),
});

export const { useGetNotiQuery, useMarkNotiMutation, useMarkAllNotiMutation } =
  notificationsApi;
