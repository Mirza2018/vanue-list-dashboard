import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: `/users/my-profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),

    profileUpdate: build.mutation({
      query: (profile) => ({
        url: `/users/update-my-profile`,
        method: "PATCH",
        body: profile,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const { useGetProfileQuery, useProfileUpdateMutation } = profileApi;
