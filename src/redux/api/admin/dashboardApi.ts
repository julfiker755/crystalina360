import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const dashApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboard: build.query({
      query: (arg) => ({
        url: "/dashboard",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.a_dashboard],
    }),
  }),
});

export const { useGetDashboardQuery } = dashApi;
