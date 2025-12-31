import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const fqaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFqa: build.query({
      query: () => ({
        url: "/faq",
        method: "GET",
      }),
      providesTags: [tagTypes.a_fqa],
    }),
    storeFqa: build.mutation({
      query: (data: any) => ({
        url: "/faq",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.a_fqa],
    }),
    updateFqa: build.mutation({
      query: ({ id, data }) => ({
        url: `/faq/${id}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.a_fqa],
    }),
    deleteFqa: build.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.a_fqa],
    }),
  }),
});

export const {
  useGetFqaQuery,
  useStoreFqaMutation,
  useUpdateFqaMutation,
  useDeleteFqaMutation,
} = fqaApi;
