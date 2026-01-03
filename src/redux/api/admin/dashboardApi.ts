import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const dashApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboard: build.query({
      query: () => ({
        url: "/dashboard",
        method: "GET",
      }),
      providesTags: [tagTypes.a_fqa],
    }),
  }),
});

export const { useGetDashboardQuery } = dashApi;
