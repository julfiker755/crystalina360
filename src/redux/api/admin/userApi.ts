import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const usersApi = baseApi.injectEndpoints({
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
      invalidatesTags: [tagTypes.a_users],
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = usersApi;
