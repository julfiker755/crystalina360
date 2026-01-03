import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const blogApi = baseApi.injectEndpoints({
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
    slgBlog: build.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.a_single_blog],
    }),
    storeBlog: build.mutation({
      query: (data: any) => ({
        url: "/blogs",
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

export const {
  useGetBlogQuery,
  useSlgBlogQuery,
  useStoreBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogApi;
