import React from "react";
import MonthReport from "../../Components/ReportPage/MonthReport";
import Demographics from "../../Components/ReportPage/Demographics";
import RevenueReport from "../../Components/ReportPage/RevenueReport";
import { AllIcons, AllImages } from "../../../public/images/AllImages";
import SubscriptionTrenda from "../../Components/ReportPage/SubscriptionTrenda";

const ReportPage = () => {
  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">Report</p>
          <div className="flex gap-4 items-center"></div>
        </div>
      </div>
      <main className="p-5">
        <div className="flex gap-4 flex-wrap justify-between ">
          <MonthReport />

          <Demographics />

          <RevenueReport />
        </div>

        <div className="flex flex-col sm:flex-row gap-1 lg:gap-5 mb-5 mt-8">
          {/* Carer  */}
          <div className="flex bg-white border border-secondary-color gap-5 flex-wrap rounded-lg py-2 px-1 lg:p-5 items-center justify-center flex-1">
            <div className="flex gap-2 xl:gap-4 items-center ">
              <img src={AllIcons.three} className="h-14 w-12" alt="" />

              <div className="text-center w-fit">
                <p className="text-sm lg:text-base xl:text-2xl font-medium ">
                  Total Venue
                </p>
                <p className="text-xs lg:text-sm xl:text-xl  mb-1 text-secondary-color">
                  780
                </p>
              </div>
            </div>
          </div>
          <div className="flex bg-white border border-secondary-color gap-5 flex-wrap rounded-lg py-2 px-1 lg:p-5 items-center justify-center flex-1">
            <div className="flex gap-2 xl:gap-4 items-center ">
              <img src={AllIcons.subscription} className="h-14 w-12" alt="" />

              <div className="text-center w-fit">
                <p className="text-sm lg:text-base xl:text-2xl font-medium ">
                  Active Subscriptions
                </p>
                <p className="text-xs lg:text-sm xl:text-xl  mb-1 text-secondary-color">
                  780
                </p>
              </div>
            </div>
          </div>
          <div className="flex bg-white border border-secondary-color gap-5 flex-wrap rounded-lg py-2 px-1 lg:p-5 items-center justify-center flex-1">
            <div className="flex gap-2 xl:gap-4 items-center ">
              <img src={AllIcons.cash} className="h-14 w-12" alt="" />

              <div className="text-center w-fit">
                <p className="text-sm lg:text-base xl:text-2xl font-medium ">
                  Subscriptions Purchased (This Month)
                </p>
                <p className="text-xs lg:text-sm xl:text-xl  mb-1 text-secondary-color">
                  780
                </p>
              </div>
            </div>
          </div>
        </div>

        <SubscriptionTrenda />
      </main>
    </div>
  );
};

export default ReportPage;
