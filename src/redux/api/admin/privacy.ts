import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const privacyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPrivacy: build.query({
      query: () => ({
        url: "/privacy-policy",
        method: "GET",
      }),
      providesTags: [tagTypes.a_privacy],
    }),
    storePrivacy: build.mutation({
      query: (data: any) => ({
        url: "/privacy-policy",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.a_privacy],
    }),
  }),
});

export const { useGetPrivacyQuery, useStorePrivacyMutation } = privacyApi;
