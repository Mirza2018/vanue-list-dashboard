import axios from "axios";
import { useEffect, useState } from "react";
import { AllIcons } from "../../../public/images/AllImages";
import RecentUserTable from "../../Components/Tables/RecentUserTable";

import UserRatioBarChart from "../../Components/Chart/UserRatioBarChart";
import { useGetCustomersOverviewQuery } from "../../redux/api/adminApi";
import { Spin } from "antd";

const AdminDashboard = () => {
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useGetCustomersOverviewQuery();

  const displayedData = data ?? currentData;

  const [recentUserData, setRecentUserData] = useState([]);
  const [recentUserLoading, setRecentUserLoading] = useState(true);
  const [recentCompanyData, setRecentCompanyData] = useState([]);
  const [recentCompanyLoading, setRecentCompanyLoading] = useState(true);

  

  // useEffect(() => {
  //   const fetchRecentUserData = async () => {
  //     try {
  //       const response = await axios.get("/data/userData.json");

  //       setRecentUserData(response?.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setRecentUserLoading(false);
  //     }
  //   };

  //   fetchRecentUserData();
  //   const fetchRecentCompanyData = async () => {
  //     try {
  //       const response = await axios.get("/data/userData.json");

  //       setRecentCompanyData(response?.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setRecentCompanyLoading(false);
  //     }
  //   };

  //   fetchRecentCompanyData();
  // }, []);

  if (isLoading)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (!isLoading && isFetching)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (isSuccess && displayedData)
    return (
      <div>
        <>
          <div className=" items-stretch">
            <div className="xl:col-span-2">
              {/* Card Items */}
              <div className="flex flex-col sm:flex-row gap-1 lg:gap-5 mb-5">
                {/* Carer  */}
                <div className="flex bg-white border border-secondary-color gap-5 flex-wrap rounded-lg py-2 px-1 lg:p-5 items-center justify-center flex-1">
                  <div className="flex gap-2 xl:gap-4 items-center ">
                    <img src={AllIcons.two} className="h-14 w-12" alt="" />

                    <div className="text-center w-fit">
                      <p className="text-sm lg:text-base xl:text-2xl font-medium ">
                        Total Visitors
                      </p>
                      <p className="text-xs lg:text-sm xl:text-xl  mb-1 text-secondary-color">
                        {displayedData?.data?.totalUsers}
                        {/* 780 */}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex bg-white border border-secondary-color gap-5 flex-wrap rounded-lg py-2 px-1 lg:p-5 items-center justify-center flex-1">
                  <div className="flex gap-2 xl:gap-4 items-center ">
                    <img src={AllIcons.three} className="h-14 w-12" alt="" />

                    <div className="text-center w-fit">
                      <p className="text-sm lg:text-base xl:text-2xl font-medium ">
                        Total Business Users
                      </p>
                      <p className="text-xs lg:text-sm xl:text-xl  mb-1 text-secondary-color">
                        {displayedData?.data?.totalVenues}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* State */}
              <div className="w-full h-fit  rounded-xl">
                <UserRatioBarChart
                  monthlyOverview={displayedData?.data?.monthlyOverview}
                />
              </div>
            </div>
          </div>
          {/* Table  */}

          <div className="text-xl font-medium whitespace-nowrap mt-5 text-black">
            Recent Users
          </div>

          <div
            className="w-full h-fit  rounded-xl mt-2 border border-secondary-color"
            style={{ boxShadow: "0px 0px 2px 1px #00000030" }}
          >
            {/* Recent User table  */}
            <RecentUserTable
              data={displayedData?.data?.recentUsers}
              loading={isLoading}
              isLoading={isLoading}
            />
          </div>
        </>
      </div>
    );
};

export default AdminDashboard;
