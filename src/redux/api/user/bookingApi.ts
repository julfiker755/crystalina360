import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const bookingsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBookings: build.query({
            query: (arg) => ({
                url: "/booking/list",
                method: "GET",
                params: arg,
            }),
            providesTags: [tagTypes.u_bookings_all],
            transformResponse: (res: any) => {
                return buildResponse(res);
            },
        }),
    }),
});

export const { useGetBookingsQuery } = bookingsApi
