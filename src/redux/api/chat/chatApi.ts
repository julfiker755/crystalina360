import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const chatApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getChatList: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/group-chats/my/chat/list",
        method: "GET",
        params: arg,
      }),
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
      providesTags: [tagTypes.chatlist],
    }),
    messageList: build.query({
      query: ({ id, page }) => ({
        url: `/group-chats/${id}/messages/history`,
        method: "GET",
        params: { page },
      }),
      transformResponse: (res: any) => {
        return buildResponse(res);
      },
    }),

    messageStore: build.mutation({
      query: ({ id, data }) => ({
        url: `/group-chats/${id}/messages`,
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
  }),
});

export const {
  useGetChatListQuery,
  useMessageListQuery,
  useMessageStoreMutation,
} = chatApi;
