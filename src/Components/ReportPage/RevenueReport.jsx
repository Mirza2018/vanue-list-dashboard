import React from "react";
import { AllIcons } from "../../../public/images/AllImages";
import PiChart from "./DonutChart";

const RevenueReport = () => {
  return (
    <section className="bg-base-color py-4 px-3 rounded flex flex-col flex-1">
      <div className="flex gap-[10px] justify-center mb-[10px]">
        <img src={AllIcons.revenue} alt="" />
        <h1 className="text-base font-bold">Revenue Breakdown Report</h1>
      </div>
      <div className="flex gap-1 justify-center items-center ">
        <div className="flex flex-col gap-[5px]">
          <div className="text-sm border-b border-white flex justify-between pb-[5px] gap-2">
            <h1 className="font-semibold">Total Revenue:</h1> <p>$5,200</p>
          </div>
          <div className="text-sm border-b border-white flex justify-between pb-[5px] gap-2">
            <h1 className="font-semibold">From Subscription:</h1> <p>$25,200</p>
          </div>
          <div className="text-sm border-b border-white flex justify-between pb-[5px] gap-2">
            <h1 className="font-semibold">From Add-ons:</h1> <p>$1,040 (20%)</p>
          </div>
        </div>
        <div>
          <PiChart />
        </div>
      </div>
    </section>
  );
};

export default RevenueReport;
