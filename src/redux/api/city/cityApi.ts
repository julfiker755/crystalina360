import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";



export const cityApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getRegionList: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/italy-region",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.region_list],
    }),
    getProvinceList: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/italy-province",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.province_list],
    }),
    getItalyCityList: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/italy-city",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.city_list],
    }),

  }),
});

export const {
  useGetRegionListQuery,
  useLazyGetProvinceListQuery,
  useLazyGetItalyCityListQuery
} = cityApi
