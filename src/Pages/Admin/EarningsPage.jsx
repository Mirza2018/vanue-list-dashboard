import React, { useState } from "react";
import { LuArrowRightLeft } from "react-icons/lu";
import EarningFromAccount from "../../Components/EarningPage/EarningFromAccount";
import EarningFromSubscripTion from "../../Components/EarningPage/EarningFromSubscripTion";

const EarningsPage = () => {
  const [earning, setEarning] = useState(true);
  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">Earnings</p>
          <div className="flex gap-4 items-center"></div>
        </div>
      </div>
      <main className="p-5">
        <div className="flex md:flex-row md:gap-2 gap-5  flex-col  justify-start items-center   w-fit mt-5 mb-[21px] bg-base-color pe-1">
          <h1
            onClick={() => setEarning(true)}
            className={`text-2xl cursor-pointer py-2 text-nowrap  text-center ${
              earning
                ? "font-normal bg-secondary-color my-2 text-white  border-b-4 px-2"
                : "font-normal text-black  "
            }`}
          >
            Earning from Subscription
          </h1>

          <h1
            onClick={() => setEarning(false)}
            className={`text-2xl cursor-pointer py-2 text-nowrap  text-center ${
              earning
                ? "font-normal text-black  "
                : "font-normal bg-secondary-color my-2 text-white  border-b-4 px-2 "
            }`}
          >
            Earning from Account Creation
          </h1>
        </div>
        <section className="flex gap-5">
          <div className="text-lg font-normal bg-secondary-color text-white px-4 py-[14px] rounded-lg flex items-center gap-4 w-fit">
            <LuArrowRightLeft />
            <p>Today’s Earning</p>
            <p>$3230</p>
          </div>
          <div className="text-lg font-normal bg-secondary-color text-white px-4 py-[14px] rounded-lg flex items-center gap-4 w-fit">
            <LuArrowRightLeft />
            <p>All Earning</p>
            <p>$3230</p>
          </div>
        </section>
        {earning ? <EarningFromAccount /> : <EarningFromSubscripTion />}
      </main>
    </div>
  );
};

export default EarningsPage;
