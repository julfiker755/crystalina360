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
        bookingsDetails: build.query({
            query: (id) => ({
                url: `/booking/details/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.u_booking_details],
        }),
        getInvoice: build.query({
            query: (id) => ({
                url: `/invoice/${id}`,
                method: "GET",
            }),
        }),
        storeRating: build.mutation({
            query: (data: any) => ({
                url: "/ratings",
                method: "POST",
                data,
            }),
            invalidatesTags: [tagTypes.u_booking_details],
        }),
    }),
});

export const { useLazyGetInvoiceQuery, useGetBookingsQuery, useBookingsDetailsQuery, useStoreRatingMutation } = bookingsApi
