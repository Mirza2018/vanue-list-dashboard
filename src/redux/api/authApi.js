import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
// import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // User Login
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `/auth/login`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.profile],
    }),

    //Password Change
    changePassword: build.mutation({
      query: (changePassword) => {
        return {
          url: `/auth/change-password`,
          method: "PATCH",
          body: changePassword,
        };
      },
      // invalidatesTags: [tagTypes.user],
    }),

    signUp: build.mutation({
      query: (signupData) => ({
        url: `/auth/register`,
        method: "POST",
        body: signupData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    verifiedEmail: build.mutation({
      query: (otpData) => {
        return {
          url: `/auth/verify_email`,
          method: "POST",
          body: otpData,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    resendOTP: build.mutation({
      query: (resendOtp) => {
        return {
          url: `/auth/resend_otp`,
          method: "POST",
          body: resendOtp,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    forgetPassword: build.mutation({
      query: (userEmail) => {
        return {
          url: `/auth/forgot_password`,
          method: "POST",
          body: userEmail,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    forgetOtpVerify: build.mutation({
      query: (otpData) => {
        return {
          url: `/auth/verify_otp`,
          method: "POST",
          body: otpData,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    //end
  }),
});

export const { useUserLoginMutation, useChangePasswordMutation } = authApi;
