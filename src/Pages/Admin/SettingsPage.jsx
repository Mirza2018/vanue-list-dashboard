import React from "react";
import { Link } from "react-router-dom";

const SettingsPage = () => {
  return (
    <div
      className="bg-white min-h-[90vh]  rounded-xl p-10 "
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <Link to={`change-password`}>
        <div className="flex items-center justify-between me-20 border-b-2 border-[#9D9FA2]  max-w-[1000px] p-3 cursor-pointer">
          <h1 className="text-2xl hover:text-secondary-color">
            Change Password
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z"
              fill="black"
            />
          </svg>
        </div>
      </Link>

      <Link to={`privacy-policy`}>
        <div className="flex items-center justify-between me-20 border-b-2 border-[#9D9FA2]  max-w-[1000px] p-3 cursor-pointer">
          <h1 className="text-2xl hover:text-secondary-color">
            Privacy Policy
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z"
              fill="black"
            />
          </svg>
        </div>
      </Link>
      <Link to={`terms-and-condition`}>
        <div className="flex items-center justify-between me-20 border-b-2 border-[#9D9FA2]  max-w-[1000px] p-3 cursor-pointer">
          <h1 className="text-2xl hover:text-secondary-color">
            Terms & Conditions
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z"
              fill="black"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
};

export default SettingsPage;
