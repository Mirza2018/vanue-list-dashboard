import axios from "axios";
import { useEffect, useState } from "react";
import { AllIcons } from "../../../public/images/AllImages";
import { Link } from "react-router-dom";
import RecentUserTable from "../../Components/Tables/RecentUserTable";

import RecentCompanyTable from "../../Components/Tables/RecentCompanyTable";
import UserRatioBarChart from "../../Components/Chart/UserRatioBarChart";

// const activities = [
//   {
//     id: "1",
//     activity: "You added a company successfully.",
//     description:
//       "You added a company to your app successfully. Now they can add users.",
//     time: "2:00 PM",
//   },
//   {
//     id: "2",
//     activity: "A company added 6 Service Users.",
//     description: "A company added 6 Service Users to your app.",
//     time: "2:00 PM",
//   },
//   {
//     id: "3",
//     activity: "A company added 4 Carers.",
//     description: "A company added 4 Carers to your app.",
//     time: "2:00 PM",
//   },
//   {
//     id: "4",
//     activity: "You added a company successfully.",
//     description:
//       "You added a company to your app successfully. Now they can add users.",
//     time: "2:00 PM",
//   },
//   {
//     id: "5",
//     activity: "A company added 6 Service Users.",
//     description: "A company added 6 Service Users to your app.",
//     time: "2:00 PM",
//   },
//   {
//     id: "6",
//     activity: "A company added 4 Carers.",
//     description: "A company added 4 Carers to your app.",
//     time: "2:00 PM",
//   },
//   {
//     id: "7",
//     activity: "A company added 8 Service Users.",
//     description: "A company added 8 Service Users to your app.",
//     time: "3:00 PM",
//   },
//   {
//     id: "8",
//     activity: "You added a company successfully.",
//     description:
//       "You added a company to your app successfully. Now they can add users.",
//     time: "3:30 PM",
//   },
//   {
//     id: "9",
//     activity: "A company added 5 Carers.",
//     description: "A company added 5 Carers to your app.",
//     time: "4:00 PM",
//   },
//   {
//     id: "10",
//     activity: "A company added 3 Service Users.",
//     description: "A company added 3 Service Users to your app.",
//     time: "4:15 PM",
//   },
//   {
//     id: "11",
//     activity: "A company added 7 Carers.",
//     description: "A company added 7 Carers to your app.",
//     time: "5:00 PM",
//   },
//   {
//     id: "12",
//     activity: "You added a company successfully.",
//     description:
//       "You added a company to your app successfully. Now they can add users.",
//     time: "5:30 PM",
//   },
//   {
//     id: "13",
//     activity: "A company added 10 Service Users.",
//     description: "A company added 10 Service Users to your app.",
//     time: "6:00 PM",
//   },
//   {
//     id: "14",
//     activity: "A company added 2 Carers.",
//     description: "A company added 2 Carers to your app.",
//     time: "6:15 PM",
//   },
//   {
//     id: "15",
//     activity: "You added a company successfully.",
//     description:
//       "You added a company to your app successfully. Now they can add users.",
//     time: "6:30 PM",
//   },
// ];
const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("home_care_user"));
  const [recentUserData, setRecentUserData] = useState([]);
  const [recentUserLoading, setRecentUserLoading] = useState(true);
  const [recentCompanyData, setRecentCompanyData] = useState([]);
  const [recentCompanyLoading, setRecentCompanyLoading] = useState(true);

  useEffect(() => {
    const fetchRecentUserData = async () => {
      try {
        const response = await axios.get("/data/userData.json");

        setRecentUserData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setRecentUserLoading(false);
      }
    };

    fetchRecentUserData();
    const fetchRecentCompanyData = async () => {
      try {
        const response = await axios.get("/data/userData.json");

        setRecentCompanyData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setRecentCompanyLoading(false);
      }
    };

    fetchRecentCompanyData();
  }, []);

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
                      Total Customers
                    </p>
                    <p className="text-xs lg:text-sm xl:text-xl  mb-1 text-secondary-color">
                      780
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex bg-white border border-secondary-color gap-5 flex-wrap rounded-lg py-2 px-1 lg:p-5 items-center justify-center flex-1">
                <div className="flex gap-2 xl:gap-4 items-center ">
                  <img src={AllIcons.three} className="h-14 w-12" alt="" />

                  <div className="text-center w-fit">
                    <p className="text-sm lg:text-base xl:text-2xl font-medium ">
                      Total Venues
                    </p>
                    <p className="text-xs lg:text-sm xl:text-xl  mb-1 text-secondary-color">
                      780
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* State */}
            <div className="w-full h-fit  rounded-xl">
              <UserRatioBarChart />
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
          <RecentUserTable data={recentUserData} loading={recentUserLoading} />
        </div>
      </>
    </div>
  );
};

export default AdminDashboard;
