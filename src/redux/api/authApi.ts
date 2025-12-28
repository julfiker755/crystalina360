import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    LoginIn: build.mutation({
      query: (data) => {
        return {
          url: "/login",
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.profile],
    }),
    register: build.mutation({
      query: (data) => {
        return {
          url: "/register",
          method: "POST",
          data,
        };
      },
    }),
    forgotPassword: build.mutation({
      query: (data) => ({
        url: "/otp-send",
        method: "POST",
        data,
      }),
    }),
    otpVarify: build.mutation({
      query: (data) => ({
        url: "/verify-otp",
        method: "POST",
        data,
      }),
    }),
    resetPass: build.mutation({
      query: (data) => ({
        url: "/forget/password",
        method: "POST",
        data,
      }),
    }),
    getProfile: build.query({
      query: () => ({
        url: "/my/profile",
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    logout: build.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: "/update/profile",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    updatePass: build.mutation({
      query: (data) => ({
        url: "/change/password",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useLoginInMutation,
  useGetProfileQuery,
  useRegisterMutation,
  useForgotPasswordMutation,
  useOtpVarifyMutation,
  useResetPassMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useUpdatePassMutation,
} = authApi;
