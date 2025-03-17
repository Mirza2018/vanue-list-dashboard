import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AllIcons } from "../../../public/images/AllImages";
import RecentUserTable from "../../Components/Tables/RecentUserTable";
import Company_Line_Chart from "../../Components/Chart/CompanyLineChart";

const activities = [
  {
    id: "1",
    activity: "You added a company successfully.",
    description:
      "You added a company to your app successfully. Now they can add users.",
    time: "2:00 PM",
  },
  {
    id: "2",
    activity: "A company added 6 Service Users.",
    description: "A company added 6 Service Users to your app.",
    time: "2:00 PM",
  },
  {
    id: "3",
    activity: "A company added 4 Carers.",
    description: "A company added 4 Carers to your app.",
    time: "2:00 PM",
  },
  {
    id: "4",
    activity: "You added a company successfully.",
    description:
      "You added a company to your app successfully. Now they can add users.",
    time: "2:00 PM",
  },
  {
    id: "5",
    activity: "A company added 6 Service Users.",
    description: "A company added 6 Service Users to your app.",
    time: "2:00 PM",
  },
  {
    id: "6",
    activity: "A company added 4 Carers.",
    description: "A company added 4 Carers to your app.",
    time: "2:00 PM",
  },
  {
    id: "7",
    activity: "A company added 8 Service Users.",
    description: "A company added 8 Service Users to your app.",
    time: "3:00 PM",
  },
  {
    id: "8",
    activity: "You added a company successfully.",
    description:
      "You added a company to your app successfully. Now they can add users.",
    time: "3:30 PM",
  },
  {
    id: "9",
    activity: "A company added 5 Carers.",
    description: "A company added 5 Carers to your app.",
    time: "4:00 PM",
  },
  {
    id: "10",
    activity: "A company added 3 Service Users.",
    description: "A company added 3 Service Users to your app.",
    time: "4:15 PM",
  },
  {
    id: "11",
    activity: "A company added 7 Carers.",
    description: "A company added 7 Carers to your app.",
    time: "5:00 PM",
  },
  {
    id: "12",
    activity: "You added a company successfully.",
    description:
      "You added a company to your app successfully. Now they can add users.",
    time: "5:30 PM",
  },
  {
    id: "13",
    activity: "A company added 10 Service Users.",
    description: "A company added 10 Service Users to your app.",
    time: "6:00 PM",
  },
  {
    id: "14",
    activity: "A company added 2 Carers.",
    description: "A company added 2 Carers to your app.",
    time: "6:15 PM",
  },
  {
    id: "15",
    activity: "You added a company successfully.",
    description:
      "You added a company to your app successfully. Now they can add users.",
    time: "6:30 PM",
  },
];

const CompanyDashboard = () => {
  const user = JSON.parse(localStorage.getItem("home_care_user"));
  const [recentUserData, setRecentUserData] = useState([]);
  const [recentUserLoading, setRecentUserLoading] = useState(true);

  useEffect(() => {
    const fetchRecentUserData = async () => {
      try {
        const response = await axios.get("/data/recentUser.json");

        setRecentUserData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setRecentUserLoading(false);
      }
    };

    fetchRecentUserData();
  }, []);
  return (
    <div>
      <>
        <div className="grid xl:grid-cols-3 gap-5 items-stretch">
          <div className="xl:col-span-2">
            {/* Card Items */}
            <div className="flex flex-col sm:flex-row gap-1 lg:gap-5 mb-5">
              {/* Service User  */}
              <div className="flex gap-5 flex-wrap rounded-lg bg-[#19363D] py-2 px-1 xl:p-5 items-center justify-center flex-1">
                <div className="flex gap-2 xl:gap-5 items-center">
                  <img
                    src={AllIcons.serviceUser}
                    className="h-10 w-14"
                    alt=""
                  />

                  <div className="text-center w-fit">
                    <p className="text-sm lg:text-base xl:text-xl font-medium text-primary-color">
                      12464
                    </p>
                    <p className="text-xs lg:text-sm xl:text-lg text-primary-color mb-1">
                      Service User
                    </p>
                  </div>
                </div>
              </div>
              {/* Carer  */}
              <div className="flex gap-5 flex-wrap rounded-lg bg-[#326471] py-2 px-1 lg:p-5 items-center justify-center flex-1">
                <div className="flex gap-2 xl:gap-4 items-center">
                  <img src={AllIcons.carer} className="h-14 w-12" alt="" />

                  <div className="text-center w-fit">
                    <p className="text-sm lg:text-base xl:text-xl font-medium text-primary-color">
                      12464
                    </p>
                    <p className="text-xs lg:text-sm xl:text-lg text-primary-color mb-1">
                      Carer
                    </p>
                  </div>
                </div>
              </div>
              {/* Employee  */}
              <div className="flex gap-5 flex-wrap rounded-lg bg-[#559BAC] py-2 px-1 lg:p-5 items-center justify-center flex-1">
                <div className="flex gap-2 xl:gap-4 items-center">
                  <img src={AllIcons.employee} className="h-12 w-12" alt="" />

                  <div className="text-center w-fit">
                    <p className="text-sm lg:text-base xl:text-xl font-medium text-primary-color">
                      12464
                    </p>
                    <p className="text-xs lg:text-sm xl:text-lg text-primary-color mb-1">
                      Employee
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* State */}
            <div
              className="w-full h-fit py-5 rounded-xl"
              style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
            >
              <div className="flex items-center gap-5 mb-5 w-[97%] mx-auto">
                <h1 className="text-3xl font-semibold">Users ratio</h1>
                <div className="flex items-center gap-1">
                  <div className="bg-[#19363D] w-4 h-4 rounded-full"></div>{" "}
                  <p className="text-xl font-semibold">Service User</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="bg-[#326471] w-4 h-4 rounded-full"></div>{" "}
                  <p className="text-xl font-semibold">Carer</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="bg-[#559BAC] w-4 h-4 rounded-full"></div>{" "}
                  <p className="text-xl font-semibold">Employee</p>
                </div>
              </div>
              <Company_Line_Chart />
            </div>
          </div>
          <div
            className="w-full max-h-[300px] xl:max-h-[600px] overflow-y-auto  rounded-xl relative"
            style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
          >
            <div className="flex justify-between items-center sticky top-0 p-5 bg-white z-10">
              <h1 className="text-xl font-semibold">Recent Activity</h1>
              <Link to={`/${user?.role}/notifications`}>
                <p className="cursor-pointer text-[#898c8d] underline ">
                  View all
                </p>
              </Link>
            </div>
            <div className="flex flex-col gap-5 p-5">
              {activities.map((activity, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className=" p-1 bg-[#19363D4D] rounded-full w-fit">
                    <img src={AllIcons.bell} className="w-5 h-5" alt="" />
                  </div>
                  <div>
                    <p className="text-[#242424] text-base">
                      {activity.activity}
                    </p>
                    <p className="text-xs text-[#8A8D8E] mt-2">
                      {activity.description}
                    </p>
                    <p className="text-xs text-[#8A8D8E] mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Table  */}
        <div className="flex flex-col lg:flex-row gap-4 mt-5 p-5 rounded">
          <div className="bg-[#FFFFFF] rounded flex-1">
            <div className="flex justify-between items-center mx-3 py-2">
              <p className="text-3xl mb-2 font-bold text-[#1D242D]">
                Recent All Users
              </p>
            </div>
            <RecentUserTable
              data={recentUserData}
              loading={recentUserLoading}
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default CompanyDashboard;
