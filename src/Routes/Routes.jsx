/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import DashboardLayout from "../Components/Layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

//* Auth
import SignIn from "../Pages/Auth/SignIn";
import ForgotPassword from "../Pages/Auth/ForgetPassword";
import OtpPage from "../Pages/Auth/OtpPage";
import UpdatePassword from "../Pages/Auth/UpdatePassword";

//* Common

import Notifications from "../Components/Dashboard/Notifications";
import Profile from "../Pages/Common/Profile";
import EditProfile from "../Pages/Common/EditProfile";
import SettingsChangePassword from "../Pages/Common/settings/SettingsChangePassword";
import SettingsForgotPassword from "../Pages/Common/settings/SettingsForgotPassword";
import SettingsOtpPage from "../Pages/Common/settings/SettingsOtpPage";
import SettingsUpdatePassword from "../Pages/Common/settings/SettingsUpdatePassword";
import TermsOfService from "../Pages/Common/settings/TermsOfService";
import PrivacyPolicy from "../Pages/Common/settings/PrivacyPolicy";

//* Admin Dashboard
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import AllCompanies from "../Pages/Admin/Companies";
import ServiceUser from "../Pages/Admin/ServiceUser";
import Carer from "../Pages/Admin/Carer";

//* Company Dashboard
import CompanyDashboard from "../Pages/Company/CompanyDashboard";
import CompanyServiceUser from "../Pages/Company/CompanyServiceUser";
import CompanyCarer from "../Pages/Company/CompanyCarer";
import CompanyEmployee from "../Pages/Company/CompanyEmployee";
import CompanyReport from "../Pages/Company/CompanyReport";
import Loading from "../Components/UI/Loading";
import AddFeedback from "../Pages/Company/AddFeedback";
import AdminAllFeedBack from "../Pages/Admin/AllFeedback";

import CategoriesPage from "../Pages/Admin/CategoriesPage";
import SettingsPage from "../Pages/Admin/SettingsPage";
import CustomersPage from "../Pages/Admin/CustomersPage";
import VanuesPage from "../Pages/Admin/VanuesPage";
import VenuesRequestPage from "../Pages/Admin/VenuesRequestPage";
import VenueRequestAccept from "../Pages/Admin/VenueRequestAccept";
import EarningsPage from "../Pages/Admin/EarningsPage";
import QRforVenuePage from "../Pages/Admin/QRforVenuePage";
import RecommendedContentPage from "../Pages/Admin/RecommendedContentPage";
import NotificationsPage from "../Pages/Admin/NotificationsPage";
import SubscriptionPage from "../Pages/Admin/SubscriptionPage";
import ReportPage from "../Pages/Admin/ReportPage";
import VenueSeeDetails from "../Pages/Admin/VenueSeeDetails";
import DiscoverMauritius from "../Pages/Admin/DiscoverMauritius";

function AuthRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/admin/dashboard`, { replace: true });
  }, [navigate]);

  // Optionally display a loading indicator
  return <Loading />;
}

const router = createBrowserRouter([
  {
    path: "/",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "/dashboard",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
      {
        path: "all-venues",
        element: <VanuesPage />,
      },
      {
        path: "venues-request",
        element: <VenuesRequestPage />,
      },
      {
        path: "venues-request/deatils/:id",
        element: <VenueSeeDetails />,
      },
      {
        path: "venues-request/deatils/:id/accepted",
        element: <VenueRequestAccept />,
      },
      {
        path: "report",
        element: <ReportPage />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "subscription",
        element: <SubscriptionPage />,
      },
      {
        path: "earnings",
        element: <EarningsPage />,
      },
      {
        path: "venue-qr",
        element: <QRforVenuePage />,
      },
      {
        path: "recommented-content",
        element: <RecommendedContentPage />,
      },
      {
        path: "discover-mauritius",
        element: <DiscoverMauritius />,
      },
      {
        path: "notification",
        element: <NotificationsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "settings/terms-and-condition",
        element: <TermsOfService />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "companies",
        element: <AllCompanies />,
      },
      {
        path: "service-User",
        element: <ServiceUser />,
      },
      {
        path: "carer",
        element: <Carer />,
      },
      {
        path: "show-feedback",
        element: <AdminAllFeedBack />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },

      {
        path: "settings/change-password",
        element: <SettingsChangePassword />,
      },
      {
        path: "settings/forgot-password",
        element: <SettingsForgotPassword />,
      },
      {
        path: "settings/otp-page",
        element: <SettingsOtpPage />,
      },
      {
        path: "settings/update-password",
        element: <SettingsUpdatePassword />,
      },
    ],
  },
  {
    path: "company",
    element: (
      <ProtectedRoute role="company">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <CompanyDashboard />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "service-user",
        element: <CompanyServiceUser />,
      },
      {
        path: "carer",
        element: <CompanyCarer />,
      },
      {
        path: "employee",
        element: <CompanyEmployee />,
      },
      {
        path: "report",
        element: <CompanyReport />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "add-feedback",
        element: <AddFeedback />,
      },
      {
        path: "settings/change-password",
        element: <SettingsChangePassword />,
      },
      {
        path: "settings/forgot-password",
        element: <SettingsForgotPassword />,
      },
      {
        path: "settings/otp-page",
        element: <SettingsOtpPage />,
      },
      {
        path: "settings/update-password",
        element: <SettingsUpdatePassword />,
      },
    ],
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "verify-otp",
    element: <OtpPage />,
  },
  {
    path: "update-password",
    element: <UpdatePassword />,
  },
]);

export default router;
