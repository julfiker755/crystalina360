import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const addonApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getAddon: build.query({
      query: (arg) => ({
        url: "/adds-on",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.a_add_on_get],
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),
    addOnToggle: build.mutation({
      query: (id: any) => ({
        url: `/makeAvailableAddsOn/${id}`,
        method: "POST",
        ContentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.a_add_on_get],
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
      invalidatesTags: [tagTypes.a_add_on_get],
    }),
    updateAddon: build.mutation({
      query: ({ id, data }) => ({
        url: `/adds-on/${id}`,
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.a_add_on_get],
    }),
  }),
});

export const {
  useGetAddonQuery,
  useAllBenefitsQuery,
  useStoreAddOnMutation,
  useUpdateAddonMutation,
  useAddOnToggleMutation,
} = addonApi;
