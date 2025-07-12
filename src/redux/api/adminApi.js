import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Category
    getCategory: build.query({
      query: (params) => ({
        url: `/category`,
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.category],
    }),
    getdeleteCategory: build.query({
      query: (params) => ({
        url: `/category/deleted`,
        method: "GET",
        params,
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
    recoveryCategory: build.mutation({
      query: (data) => ({
        url: `/category/recovery/${data.id}`,
        method: "PATCH",
        // body: data.data,
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

    // venue
    getVenue: build.query({
      query: (params) => ({
        url: `/venue`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.venue],
    }),
    venueAction: build.mutation({
      query: (data) => ({
        url: `/venue/${data.action}/${data.id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.venue],
    }),
    pendingVenue: build.query({
      query: () => ({
        url: `/venue/pending`,
        method: "GET",
      }),
      providesTags: [tagTypes.venue],
    }),
    createVenue: build.mutation({
      query: (data) => ({
        url: `/venue/admin/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.venue],
    }),

    //venue generate qr
    getUnGenerateQrVenue: build.query({
      query: () => ({
        url: `/venue/unGenerateQr`,
        method: "GET",
      }),
      providesTags: [tagTypes.venue, tagTypes.qr],
    }),
    getGenerateQrVenue: build.query({
      query: (params) => ({
        url: `/venue/generateQr`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.qr],
    }),

    createQr: build.mutation({
      query: (data) => ({
        url: `/venue/generateQr`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.qr],
    }),

    /// Customers

    getCustomersOverview: build.query({
      query: () => ({
        url: `/users/all-overview`,
        method: "GET",
      }),
      providesTags: [tagTypes.customer],
    }),
    getRecoveryAccount: build.query({
      query: (params) => ({
        url: `/recovery/account`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.customer],
    }),

    getCustomers: build.query({
      query: (params) => ({
        url: `/users/all`,
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.customer],
    }),
    getUnCreatedCustomers: build.query({
      query: (params) => ({
        url: `/users/unCreatedVenueUser`,
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.customer],
    }),

    blockCustomers: build.mutation({
      query: (data) => ({
        url: `/users/${data.action}/${data?.id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.customer],
    }),
    recoveryAccountRequest: build.mutation({
      query: (data) => {
        // console.log("data ",data);
        // return
        return {
          url: `/recovery/update/${data?.id}`,
          method: "PATCH",
          body: data?.data,
        };
      },
      invalidatesTags: [tagTypes.customer],
    }),

    ///recommented content
    getAcceptdRecommentedContent: build.query({
      query: (params) => ({
        url: `/recommented/accepted`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.recommented],
    }),
    getPendingRecommentedContent: build.query({
      query: (params) => ({
        url: `/recommented/pending`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.recommented],
    }),
    actionRecommentedContent: build.mutation({
      query: (data) => ({
        url: `/recommented/updateStatus/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: [tagTypes.recommented],
    }),

    createRecomment: build.mutation({
      query: (data) => ({
        url: `/recommented/admin/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.recommented],
    }),

    //discover-mauritius

    getDiscovermauritius: build.query({
      query: (params) => ({
        url: `/discover`,
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.mauritius],
    }),

    createMauritius: build.mutation({
      query: (data) => ({
        url: `/discover/admin/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.mauritius],
    }),
    updateMauritius: build.mutation({
      query: (data) => ({
        url: `/discover/update/${data.id}`,
        method: "PATCH",
        body: data.formData,
      }),
      invalidatesTags: [tagTypes.mauritius],
    }),

    deleteMauritius: build.mutation({
      query: (id) => {
        // console.log("data ",data);
        // return
        return {
          url: `/discover/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.mauritius],
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
  useRecoveryCategoryMutation,
  //sub
  useGetSubscriptionQuery,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useUpdateSubscriptionMutation,
  //venu
  useGetVenueQuery,
  usePendingVenueQuery,
  useCreateVenueMutation,
  useVenueActionMutation,
  // Customers
  useGetCustomersQuery,
  useBlockCustomersMutation,
  useGetUnCreatedCustomersQuery,
  useGetCustomersOverviewQuery,
  useGetRecoveryAccountQuery,
  useRecoveryAccountRequestMutation,
  //recommented

  useGetAcceptdRecommentedContentQuery,
  useActionRecommentedContentMutation,
  useGetPendingRecommentedContentQuery,
  useCreateRecommentMutation,
  //qr
  useGetUnGenerateQrVenueQuery,
  useCreateQrMutation,
  useGetGenerateQrVenueQuery,
  //discover-mauritius
  useGetDiscovermauritiusQuery,
  useCreateMauritiusMutation,
  useUpdateMauritiusMutation,
  useDeleteMauritiusMutation,
} = adminApi;
