import { baseApi } from "../baseApi";


export const userCouponApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    couponCheck: build.mutation({
      query: (data: any) => ({
        url: "/check-coupon",
        method: "POST",
        data,
      }),
    }),

  }),
});

export const {
  useCouponCheckMutation
} = userCouponApi
