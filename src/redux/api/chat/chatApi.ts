import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const chatApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getChatList: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/notification",
        method: "GET",
        params: arg,
      }),
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),
  }),
});

export const {

} = chatApi
