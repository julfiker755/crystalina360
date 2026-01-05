import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const promotionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPromotion: build.query({
      query: (arg) => ({
        url: "/promotions",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.a_promotion],
      transformResponse: (res: any) => {
        const {
          currentlyRunning,
          totalBanner,
          promotions: t,
        } = res?.data || {};

        return {
          currentlyRunning,
          totalBanner,
          promo: {
            data: t.data,
            meta: {
              current_page: t.current_page,
              per_page: t.per_page,
              total: t.total,
            },
          },
        };
      },
    }),
    storePromotion: build.mutation({
      query: (data: any) => ({
        url: "/promotion",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.a_promotion],
    }),
    // updateBlog: build.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/blogs/${id}`,
    //     method: "POST",
    //     ContentType: "multipart/form-data",
    //     data,
    //   }),
    //   invalidatesTags: [tagTypes.a_single_blog],
    // }),
    deletePromotion: build.mutation({
      query: (id) => ({
        url: `/promotion/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.a_promotion],
    }),
  }),
});

export const {
  useGetPromotionQuery,
  useDeletePromotionMutation,
  useStorePromotionMutation,
} = promotionsApi;
