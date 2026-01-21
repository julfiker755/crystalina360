import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const addonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBlog: build.query({
      query: (arg) => ({
        url: "/blogs",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.a_blog],
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),
    allBenefits: build.query({
      query: () => ({
        url: "/benefits",
        method: "GET",
      }),
      providesTags: [tagTypes.a_benefits_all],
    }),

    storeAddOn: build.mutation({
      query: (data: any) => ({
        url: "/adds-on",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.a_blog],
    }),
    updateBlog: build.mutation({
      query: ({ id, data }) => ({
        url: `/blogs/${id}`,
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.a_single_blog],
    }),
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.a_blog],
    }),
  }),
});

export const { useAllBenefitsQuery, useStoreAddOnMutation } = addonApi;
