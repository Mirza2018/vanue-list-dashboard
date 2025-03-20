import React from "react";
import MonthReport from "../../Components/ReportPage/MonthReport";
import Demographics from "../../Components/ReportPage/Demographics";
import RevenueReport from "../../Components/ReportPage/RevenueReport";

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
        <div className="flex gap-4">
          <MonthReport />
          <Demographics />
          <RevenueReport />
        </div>
      </main>
    </div>
  );
};

export default ReportPage;
