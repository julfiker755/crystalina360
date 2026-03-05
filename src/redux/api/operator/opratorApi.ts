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
      query: ({ data, onUploadProgress }) => ({
        url: "/events",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
        onUploadProgress,
      }),
      invalidatesTags: [tagTypes.o_events, tagTypes.a_admin_events],
    }),
    updateEvents: build.mutation({
      query: ({ id, data, onUploadProgress }) => ({
        url: `/events/${id}`,
        method: "POST",
        ContentType: "multipart/form-data",
        data,
        onUploadProgress,
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
    pendingEventOpertor: build.query({
      query: (arg) => ({
        url: "/my/pending/events",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.o_panding_events],
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),
    buyPlan: build.mutation({
      query: (data) => ({
        url: "/buy-plans",
        method: "POST",
        data,
      }),
      invalidatesTags: [
        tagTypes.profile,
        tagTypes.a_add_on_get,
        tagTypes.o_my_add_on,
      ],
    }),
    addsonCart: build.query({
      query: (arg) => ({
        url: "/my/addson/cart",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.o_my_add_on],
    }),
    paymentInitOp: build.mutation({
      query: (id) => ({
        url: `/paymentInit/${id}`,
        method: "POST",
      }),
    }),
    getEvtList: build.query({
      query: (arg) => ({
        url: "/addsOn/events/list",
        method: "GET",
        params: arg,
      }),
    }),
    getSlgAddOn: build.query({
      query: (id) => ({
        url: `/adds-on/${id}`,
        method: "GET",
      }),
    }),
    storeQuestion: build.mutation({
      query: (data) => ({
        url: "/addson/question",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useStoreEventsMutation,
  useSingleEventsQuery,
  useConnectPaypalMutation,
  usePendingEventOpertorQuery,
  useBuyPlanMutation,
  useAddsonCartQuery,
  useUpdateEventsMutation,
  usePaymentInitOpMutation,
  useGetEvtListQuery,
  useGetSlgAddOnQuery,
  useStoreQuestionMutation,
} = opratorsApi;
