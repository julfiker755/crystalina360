import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const chatApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getChatList: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/chat/list",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.message]
    }),
    messageList: build.query({
      query: (id) => ({
        url: `/chat/room/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.message]
    }),
    subscribeChannel: build.mutation({
      query: (id) => ({
        url: `/broadcasting/auth`,
        method: "GET",
      }),
      invalidatesTags: [tagTypes.message]

    }),
    storeRoom: build.mutation({
      query: (data) => ({
        url: `/chat/room`,
        method: "POST",
        ContentType: "multipart/form-data",
        data
      }),
      invalidatesTags: [tagTypes.message]
    }),
    messageStore: build.mutation({
      query: (data) => ({
        url: `/chats`,
        method: "POST",
        ContentType: "multipart/form-data",
        data
      }),
      invalidatesTags: [tagTypes.message]
    }),

  }),
});

export const {
  useGetChatListQuery,
  useStoreRoomMutation,
  useMessageListQuery,
  useMessageStoreMutation,
  useSubscribeChannelMutation
} = chatApi
