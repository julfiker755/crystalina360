import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const termsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTerms: build.query({
      query: () => ({
        url: "/terms-condition",
        method: "GET",
      }),
      providesTags: [tagTypes.a_terms],
    }),
    storeTerms: build.mutation({
      query: (data: any) => ({
        url: "/terms-condition",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.a_terms],
    }),
  }),
});

export const { useGetTermsQuery, useStoreTermsMutation } = termsApi;
