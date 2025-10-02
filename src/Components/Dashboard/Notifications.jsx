/* eslint-disable no-unused-vars */
import { Pagination, Spin } from "antd";
import React, { useState } from "react";
import { FiBell } from "react-icons/fi";
import { MdArrowBackIos } from "react-icons/md";

import { FormattedDate, FormattedTime } from "./DateAndTime";
import { useGetNotificationQuery } from "../../redux/api/notificationApi";

const Notifications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const { data, isFetching, error } = useGetNotificationQuery({
    page: currentPage,
    limit,
  });
 
  const onChange = (page) => {
    setCurrentPage(page);
  };
  console.log(data);

  return (
    <div
      className=" bg-slate-50  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex items-center bg-secondary-color gap-1 py-3 px-5 mb-3 rounded-tl-xl rounded-tr-xl">
        <MdArrowBackIos
          className="text-xl sm:text-2xl lg:text-3xl text-primary-color cursor-pointer"
          onClick={() => window.history.back()}
        />

        <h1 className="text-3xl font-bold text-primary-color">Notification</h1>
      </div>

      {isFetching ? (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="px-4 sm:px-6 md:px-8 ">
            {data?.data?.map((notification) => (
              <div
                key={notification?._id}
                className="flex items-center space-x-3 p-2 border-b border-gray-300 last:border-none"
              >
                {/* Icon */}
                <div className="bg-[#b8c1c3] p-2 rounded-full">
                  <FiBell className="text-secondary-color w-6 h-6" />
                </div>

                {/* Notification text */}
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-gray-700">
                    {notification?.message}{" "}
                  </span>
                  <div className="text-sm text-black-500">
                    <FormattedDate value={notification?.createdAt} />
                    {"  "}
                    <span className="font-bold text-secondary-color">
                      ( <FormattedTime value={notification?.createdAt} /> )
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end items-center py-4">
            {data?.data?.meta?.total > 0 && (
              <Pagination
                onChange={onChange}
                current={currentPage}
                total={data.data.meta.total}
                pageSize={limit}
                showSizeChanger={false} // Optional: Disable page size changer
              />
            )}
          </div>
        </>
      )}

      {/* <TestSocket/> */}
    </div>
  );
};
export default Notifications;
