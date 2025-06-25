import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Category
    getCategory: build.query({
      query: () => ({
        url: `/category`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),
    getdeleteCategory: build.query({
      query: () => ({
        url: `/category/deleted`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),

    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
    createCategory: build.mutation({
      query: (data) => ({
        url: `/category/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    updateCategory: build.mutation({
      query: (data) => ({
        url: `/category/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    // Subscribtion

    getSubscription: build.query({
      query: () => ({
        url: `/subscription`,
        method: "GET",
      }),
      providesTags: [tagTypes.subscription],
    }),
    createSubscription: build.mutation({
      query: (data) => ({
        url: `/subscription/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.subscription],
    }),

    updateSubscription: build.mutation({
      query: (data) => ({
        url: `/subscription/${data?.id}/update`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: [tagTypes.subscription],
    }),
    deleteSubscription: build.mutation({
      query: (id) => ({
        url: `/subscription/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.subscription],
    }),

    //end
  }),
});

export const {
  useGetCategoryQuery,
  useDeleteCategoryMutation,
  useGetdeleteCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetSubscriptionQuery,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useUpdateSubscriptionMutation
} = adminApi;
