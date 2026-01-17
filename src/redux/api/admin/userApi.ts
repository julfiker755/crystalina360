import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const usersApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getUsers: build.query({
      query: (arg) => ({
        url: "/user/list",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.a_users],
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.a_users, tagTypes.a_operator],
    }),
    getOperator: build.query({
      query: (arg) => ({
        url: "/operator/list",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.a_operator],
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),
    slgOprators: build.query({
      query: (id) => ({
        url: `/operator/details/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.a_slg_opertor],
    }),
    opratorsEventAll: build.query({
      query: ({ id, arg }) => ({
        url: `/operator/events/list/${id}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.o_events_all_list],
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetOperatorQuery,
  useSlgOpratorsQuery,
  useOpratorsEventAllQuery,
} = usersApi;
