import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Input } from "antd";
import React, { useEffect, useState } from "react";
import VenuesRequestSingle from "../../Components/VenuesRequest/VenuesRequestSingle";
import axios from "axios";
import { FaChevronLeft } from "react-icons/fa";
import { usePendingVenueQuery } from "../../redux/api/adminApi";

const VenuesRequestPage = () => {
  const { data, currentData, isLoading, isFetching, isSuccess } =
    usePendingVenueQuery();
  const displayedData = data ?? currentData;
  // console.log(data);

  return (
    <div className="bg-white rounded-tl-xl rounded-tr-xl h-full">
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p
            onClick={() => window.history.back()}
            className="text-3xl text-primary-color font-semibold flex justify-center items-center gap-2"
          >
            <FaChevronLeft />
            Venues Request
          </p>
        </div>
      </div>
      {displayedData?.data.length == 0 && (
        <div className="text-xl font-medium flex justify-center h-screen items-center  ">
          No venue request ...
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 p-10">
        {displayedData?.data?.map((singleData) => (
          <VenuesRequestSingle data={singleData} key={singleData?._Id} />
        ))}
      </div>
    </div>
  );
};

export default VenuesRequestPage;
