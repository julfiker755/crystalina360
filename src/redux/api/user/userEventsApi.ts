import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const userEventsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getUserEvents: build.query({
      query: (arg) => ({
        url: "/events",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.u_events_all],
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),
    wishEvents: build.mutation({
      query: (data: any) => ({
        url: "/favorite",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.u_events_all, tagTypes.u_wishlist_all],
    }),
    getMyWish: build.query({
      query: (arg) => ({
        url: "/favorite",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.u_wishlist_all],
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),
  }),
});

export const {
  useGetUserEventsQuery,
  useWishEventsMutation,
  useGetMyWishQuery,
} = userEventsApi;
