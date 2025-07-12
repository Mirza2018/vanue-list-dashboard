import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const notifcationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotification: build.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `/notifications/my-notifications`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: [tagTypes.notification],
    }),

    getNotificationCount: build.query({
      query: () => ({
        url: `/notifications/unread`,
        method: "GET",
      }),
      providesTags: [tagTypes.notificationCount],
    }),

    notificationRead: build.mutation({
      query: () => ({
        url: `/notifications/read-all`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.notificationCount, tagTypes.notification],
    }),
  }),
});

export const {
  useLazyGetNotificationQuery,
  useGetNotificationQuery,
  useGetNotificationCountQuery,
  useNotificationReadMutation,
} = notifcationApi;
