import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const testimonialsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTestimonials: build.query({
      query: (arg) => ({
        url: "/testimonials",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.testimonials],
    }),
  }),
});

export const { useGetTestimonialsQuery } = testimonialsApi;
