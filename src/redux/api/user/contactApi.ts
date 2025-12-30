import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const contactUserApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendContact: build.mutation({
      query: (data: any) => ({
        url: "/contact-us",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.u_contact_us],
    }),
  }),
});

export const { useSendContactMutation } = contactUserApi;
