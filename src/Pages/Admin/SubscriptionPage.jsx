import React, { useState } from "react";
import AddSubscribetionModal from "../../Components/Modal/Admin/AddSubscribetionModal";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaArrowRight, FaCheck, FaRegEdit } from "react-icons/fa";
import { Switch } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { EditOutlined } from "@ant-design/icons";
const plans = [
  {
    name: "Basic",
    price: 7,
    duration: "1-3 months",
    facilities: ["Feature A", "Feature B"],
  },
  {
    name: "Advance",
    price: 9,
    duration: "1-6 months",
    facilities: ["Feature A", "Feature B", "Feature C"],
  },
  {
    name: "Premium",
    price: 12,
    duration: "1-12 months",
    facilities: ["Feature A", "Feature B", "Feature C", "Feature D"],
  },
];
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
        <div className="flex justify-around my-10 gap-10 flex-wrap">
          {plans.map((plan, index) => (
            <section
              className="bg-highlight-color rounded-xl flex flex-col gap-4 p-5 min-w-[300px]"
              style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
            >
              <div className="flex items-center gap-2 justify-end">
                <p>
                  <Switch size="small" defaultChecked />
                </p>
                <p>
                  <RiDeleteBin6Line className="text-xl text-secondary-color cursor-pointer" />
                </p>
                <p>
                  <EditOutlined className="text-xl text-secondary-color cursor-pointer" />
                </p>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{plan.name}</h1>
                <div className="flex items-end">
                  <h1 className="text-6xl font-bold">${plan.price}</h1>
                  <p className="text-xl font-bold">{plan.duration}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {plan.facilities.map((facility) => (
                  <div className="flex items-center gap-2">
                    <div>
                      <FaCheck className="bg-base-color size-8 rounded-full p-2 text-secondary-color" />
                    </div>
                    <h1 className="text-lg font-medium">{facility}</h1>
                  </div>
                ))}
                {/* 
                <div className="flex items-center gap-2">
                  <div>
                    <FaCheck className="bg-base-color size-8 rounded-full p-2 text-secondary-color" />
                  </div>
                  <h1 className="text-lg font-medium">facaldpla</h1>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <FaCheck className="bg-base-color size-8 rounded-full p-2 text-secondary-color" />
                  </div>
                  <h1 className="text-lg font-medium">facaldpla</h1>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <FaCheck className="bg-base-color size-8 rounded-full p-2 text-secondary-color" />
                  </div>
                  <h1 className="text-lg font-medium">
                    facaldpla Lorem ipsum dolor sit amet
                  </h1>
                </div> */}
                <div className="flex justify-center items-end  h-full">
                  <button
                    className={`text-lg font-normal   py-3 px-[18px] rounded-lg flex items-center gap-4 w-fit cursor-pointer select-none bg-secondary-color text-white`}
                  >
                    Buy Now <FaArrowRight />
                  </button>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SubscriptionPage;
