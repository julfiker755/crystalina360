import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const pricingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPricing: build.query({
      query: (arg) => ({
        url: "/pricing",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.a_pricing],
    }),
    storePricing: build.mutation({
      query: (data: any) => ({
        url: "/pricing",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.a_pricing],
    }),
    updatePricing: build.mutation({
      query: ({ id, data }) => ({
        url: `/pricing/${id}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.a_pricing],
    }),
    cancelPlan: build.mutation({
      query: ({ id, data }) => ({
        url: `/subscription/cancel/${id}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.profile, tagTypes.a_pricing],
    }),
  }),
});

export const {
  useGetPricingQuery,
  useUpdatePricingMutation,
  useStorePricingMutation,
  useCancelPlanMutation,
} = pricingsApi;
