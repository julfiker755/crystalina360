import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const userEventsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getPublicEvents: build.query({
      query: (arg) => ({
        url: "/public/events",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.u_public_events_all],

    }),
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
    purchaseStore: build.mutation({
      query: (data: any) => ({
        url: "/ticket",
        method: "POST",
        data,
      }),
    }),
    ticketDetails: build.query({
      query: (id) => ({
        url: `/ticket/details/${id}`,
        method: "GET",
      }),
    }),

  }),
});

export const {
  useGetUserEventsQuery,
  useWishEventsMutation,
  useGetMyWishQuery,
  useGetPublicEventsQuery,
  usePurchaseStoreMutation,
  useTicketDetailsQuery
} = userEventsApi;
