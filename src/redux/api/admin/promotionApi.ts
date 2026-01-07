import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

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
    slgPromotion: build.query({
      query: (id) => ({
        url: `/promotions/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.a_slg_promotion],
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
    updatePromotion: build.mutation({
      query: ({ id, data }) => ({
        url: `/promotion/${id}`,
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.a_promotion],
    }),
    deletePromotion: build.mutation({
      query: (id) => ({
        url: `/promotion/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.a_promotion],
    }),
    promotionCount: build.mutation({
      query: (id) => ({
        url: `/promotions/count/${id}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.a_promotion],
    }),
  }),
});

export const {
  useGetPromotionQuery,
  useDeletePromotionMutation,
  useStorePromotionMutation,
  useUpdatePromotionMutation,
  usePromotionCountMutation,
  useSlgPromotionQuery,
} = promotionsApi;
