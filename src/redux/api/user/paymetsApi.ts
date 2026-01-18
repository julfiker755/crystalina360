import { baseApi } from "../baseApi";


export const paymentsApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        // paymentInit: build.query({
        //     query: (id) => ({
        //         url: `/paymentInit/${id}`,
        //         method: "GET",
        //     }),
        // }),
        paymentInit: build.mutation({
            query: (data) => ({
                url: `/paymentInit/${data.invoice_no}`,
                method: "POST",
            }),
        }),
    }),
});

export const { usePaymentInitMutation } = paymentsApi
