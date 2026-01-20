import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const opratorsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getEvents: build.query({
      query: (arg) => ({
        url: "/my-events",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.o_events],
      transformResponse: (res: any) => {
        const info = {
          total_events: res?.data?.total,
          ongoing_events: res?.data?.ongoing,
          upcoming_events: res?.data?.upcoming,
        };
        return {
          info: info,
          data: buildResponse(res?.data),
        };
      },
    }),
    storeEvents: build.mutation({
      query: (data: any) => ({
        url: "/events",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.o_events, tagTypes.a_admin_events],
    }),
    singleEvents: build.query({
      query: (id) => ({
        url: `/events/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.o_single_events],
    }),
    connectPaypal: build.mutation({
      query: () => ({
        url: "/paypal/connect/account",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useStoreEventsMutation,
  useSingleEventsQuery,
  useConnectPaypalMutation
} = opratorsApi;
