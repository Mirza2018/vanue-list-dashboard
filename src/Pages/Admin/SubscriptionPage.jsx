import React, { useState } from "react";
import AddSubscribetionModal from "../../Components/Modal/Admin/AddSubscribetionModal";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

const SubscriptionPage = () => {
  const [isAddSubscription, setIsAddSubscription] = useState(false);
  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">
            Subscription
          </p>
        </div>
      </div>

      <main className="p-5">
        <div className="px-5 mt-5 ">
          <div
            onClick={() => setIsAddSubscription(true)}
            className="bg-secondary-color text-primary-color flex justify-center items-center gap-2 py-2 w-full rounded-lg cursor-pointer"
          >
            <FaRegEdit className="md:text-3xl text-2xl" />
            <p className="md:text-2xl text-lg font-semibold whitespace-nowrap">
              Create Subscription Plan
            </p>
          </div>
        </div>
        <AddSubscribetionModal
          isAddSubscription={isAddSubscription}
          setIsAddSubscription={setIsAddSubscription}
        />
      </main>
    </div>
  );
};

export default SubscriptionPage;
