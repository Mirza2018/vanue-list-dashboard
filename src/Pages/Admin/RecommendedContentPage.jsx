import React, { useState } from "react";
import PendingApprovals from "../../Components/RecommandedPage/PendingApprovals";
import ApprovedContent from "../../Components/RecommandedPage/ApprovedContent";

const RecommendedContentPage = () => {
  const [recommented, setRecommend] = useState(true);
  return (
    <div 
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">
            Recommended Content
          </p>
          <div className="flex gap-4 items-center"></div>
        </div>
      </div>

      <main className="p-5">
        <div className="flex md:flex-row md:gap-2 gap-5  flex-col  justify-start items-center   w-fit mt-5 mb-[21px] bg-base-color pe-1">
          <h1
            onClick={() => setRecommend(true)}
            className={`text-2xl cursor-pointer py-2 text-nowrap  text-center ${
              recommented
                ? "font-normal bg-secondary-color my-2 text-white  border-b-4 px-2"
                : "font-normal text-black  "
            }`}
          >
            Pending Approvals
          </h1>

          <h1
            onClick={() => setRecommend(false)}
            className={`text-2xl cursor-pointer py-2 text-nowrap  text-center ${
              recommented
                ? "font-normal text-black  "
                : "font-normal bg-secondary-color my-2 text-white  border-b-4 px-2 "
            }`}
          >
            Approved Content
          </h1>
        </div>
      </main>

      {recommented ? <PendingApprovals /> : <ApprovedContent />}
    </div>
  );
};

export default RecommendedContentPage;
 