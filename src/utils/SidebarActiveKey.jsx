const currentPath = location.pathname;
export const getActiveKeys = () => {
  if (
    currentPath.includes("/profile") ||
    currentPath.includes("/edit-profile")
  ) {
    return ["profile"];
  }
  if (
    currentPath.includes("/settings/change-password") ||
    currentPath.includes("/settings/forgot-password") ||
    currentPath.includes("/settings/update-password") ||
    currentPath.includes("/settings/otp-page")
  ) {
    return ["change-password"];
  }
  if (currentPath.includes("/privacy-policy")) {
    return ["privacy-policy"];
  }
  if (currentPath.includes("/add-feedback")) {
    return ["add-feedback"];
  }
  if (currentPath.includes("/show-feedback")) {
    return ["show-feedback"];
  }
  if (currentPath.includes("/terms-and-condition")) {
    return ["terms-and-condition"];
  }
  return [currentPath.split("/")[1]]; // Default fallback
};
