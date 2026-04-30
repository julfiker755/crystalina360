import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const invoicesApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getInvoices: build.query({
      query: (arg) => ({
        url: "/admin/invoices",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.a_invoices],
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),
    invoicesDetails: build.query({
      query: (id) => ({
        url: `/admin/invoices/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetInvoicesQuery, useInvoicesDetailsQuery } = invoicesApi;
