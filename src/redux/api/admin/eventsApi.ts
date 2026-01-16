import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const eventsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    adminEvent: build.query({
      query: (arg) => ({
        url: "/my-events",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.a_admin_events],
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),
    getPandingEvent: build.query({
      query: (arg) => ({
        url: "/pending/events",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.a_pending_events],
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),
    approveEvent: build.mutation({
      query: (id) => {
        return {
          url: `/approve-event/${id}`,
          method: "POST",
        };
      },
      invalidatesTags: [tagTypes.a_pending_events],
    }),
    approveAll: build.mutation({
      query: () => {
        return {
          url: `/approve-all-events`,
          method: "POST",
        };
      },
      invalidatesTags: [tagTypes.a_pending_events],
    }),
    deleteEvent: build.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.a_admin_events, tagTypes.a_slg_opertor],
    }),
    adminEventCount: build.query({
      query: (arg) => ({
        url: "/all/events/count",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.a_admin_events_count],
    }),
  }),
});

export const {
  useGetPandingEventQuery,
  useApproveEventMutation,
  useApproveAllMutation,
  useAdminEventQuery,
  useDeleteEventMutation,
  useAdminEventCountQuery,
} = eventsApi;
