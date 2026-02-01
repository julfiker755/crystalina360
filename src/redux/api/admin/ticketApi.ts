import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const ticketsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getTickets: build.query({
      query: (arg) => ({
        url: "/ticket/list",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.a_ticket],
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.a_users],
    }),
  }),
});

export const { useGetTicketsQuery } = ticketsApi;
