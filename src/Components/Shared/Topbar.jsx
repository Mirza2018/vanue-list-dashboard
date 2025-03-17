/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BarsOutlined, BellFilled } from "@ant-design/icons";
import { Dropdown, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import user from "/images/user.png";
import { AllImages } from "../../../public/images/AllImages";
import { CiUser } from "react-icons/ci";

const notifications = [
  {
    id: 1,
    message: "A company added 6 Service Users.",
    time: "Fri, 12:30pm",
  },
  {
    id: 2,
    message: "A company added 6 Service Users.",
    time: "Fri, 12:30pm",
  },
  {
    id: 3,
    message: "A company added 6 Service Users.",
    time: "Fri, 12:30pm",
  },
  {
    id: 4,
    message: "A company added 6 Service Users.",
    time: "Fri, 12:30pm",
  },
  {
    id: 5,
    message: "A company added 6 Service Users.",
    time: "Fri, 12:30pm",
  },
];

const Topbar = ({ collapsed, setCollapsed }) => {
  const user = JSON.parse(localStorage.getItem("home_care_user"));
  const [notificationCount, setNotificationCount] = useState(
    notifications.length
  );

  const handleMenuClick = () => {
    setNotificationCount(0); // Reset notification count when the menu is clicked
    setCollapsed(false);
  };

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-full text-center bg-white p-4 rounded-lg"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
      onClick={handleMenuClick}
    >
      {notifications.map((notification) => (
        <div className="test-start" key={notification.id}>
          <div className="flex gap-2">
            <BellFilled style={{ color: "#839F9F" }} />
            <div className="flex flex-col items-start">
              <p>{notification.message}</p>
              <p className="text-gray-400">{notification.time}</p>
            </div>
          </div>
        </div>
      ))}
      <Link
        to={`/${user?.role}/notifications`}
        className="w-2/3 mx-auto bg-secondary-color !text-primary-color rounded h-8 py-1"
      >
        See More
      </Link>
    </div>
  );
  return (
    <div className="pt-4 mx-[-50px] flex justify-between items-center bg-[#ffffff] ">
      <div className="flex items-center gap-2 text-base-color ml-4">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl"
        />
      </div>
      <div className="flex items-center justify-center mr-5 gap-2">
        <Dropdown
          overlay={notificationMenu}
          trigger={["hover"]}
          placement="bottomRight"
          className="cursor-pointer"
        >
          <BellFilled
            shape="circle"
            size="small"
            className="text-secondary-color font-bold text-xl rounded-full border border-secondary-color w-11 aspect-square p-1 flex justify-center items-center"
          />
        </Dropdown>
        <Link
          to="profile"
          className="flex items-center justify-center gap-2 bg-transparent text-base-color border-0 rounded-lg h-8 px-2 py-1  mr-5"
        >
          {/* <p className="text-base-color text-lg">David Wilson</p>
          <img
            src={AllImages.user}
            alt="profile_pic"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
            className="rounded"
          /> */}
          <CiUser className="text-secondary-color font-bold text-xl rounded-full border border-secondary-color w-10 h-10 p-1" />
        </Link>
      </div>
    </div>
  );
};
export default Topbar;
