import React from "react";
import { AllIcons, AllImages } from "../../../public/images/AllImages";

const MonthReport = () => {
  return (
    <section className="bg-base-color py-4 px-3 rounded flex flex-col justify-between flex-1">
      <div>
        <div className="flex gap-[10px] justify-center mb-[10px]">
          <img src={AllIcons.monthReport} alt="" />
          <h1 className="text-base font-bold">Monthly Summary Report</h1>
        </div>
        <div className="flex flex-col gap-[5px]">
          <div className="text-sm border-b border-white flex justify-between pb-[5px] gap-2">
            <h1 className="font-semibold">Total Visitors:</h1> <p>4,321</p>
          </div>
          <div className="text-sm border-b border-white flex justify-between pb-[5px] gap-2">
            <h1 className="font-semibold">Number of Clicks:</h1> <p>4,321</p>
          </div>
          <div className="text-sm border-b border-white flex justify-between pb-[5px] gap-2 items-center">
            <h1 className="font-semibold">Gender Demographics:</h1>{" "}
            <div className="flex flex-col justify-end items-end">
              <p>Male: 4,321</p>
              <p>Female: 4,321</p>
            </div>
          </div>
          <div className="text-sm border-b border-white flex justify-between pb-[5px] gap-2 items-center">
            <h1 className="font-semibold">Age Demographics:</h1>{" "}
            <div className="">
              <p>12-25: 200</p>
              <p>25-35: 300</p>
              <p>35-50: 400</p>
              <p>50-80: 500</p>
            </div>
          </div>
        </div>
      </div>

      <button
        className={`text-lg font-normal mt-5  py-3 px-[18px] rounded-2xl flex items-center gap-4 w-fit cursor-pointer select-none bg-secondary-color text-white`}
      >
        Export as PDF
      </button>
    </section>
  );
};

export default MonthReport;
