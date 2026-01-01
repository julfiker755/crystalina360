import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const couponApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCoupon: build.query({
      query: (arg) => ({
        url: "/coupon-code",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.a_coupon],
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),
    storeCoupon: build.mutation({
      query: (data: any) => ({
        url: "/coupon-code",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.a_coupon],
    }),
    updateCoupon: build.mutation({
      query: ({ id, data }) => ({
        url: `/coupon-code/${id}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.a_coupon],
    }),
    deleteCoupon: build.mutation({
      query: (id) => ({
        url: `/coupon-code/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.a_coupon],
    }),
  }),
});

export const {
  useGetCouponQuery,
  useStoreCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;
