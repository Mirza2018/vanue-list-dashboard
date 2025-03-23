import React from "react";
import { Link } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { FaChevronLeft } from "react-icons/fa";

const VenueSeeDetails = () => {
  return (
    <div className="bg-white rounded-tl-xl rounded-tr-xl">
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl mb-20">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p
            onClick={() => window.history.back()}
            className="text-3xl text-primary-color font-semibold flex justify-center items-center gap-2 cursor-pointer"
          >
            <FaChevronLeft /> Venue Request
          </p>
          {/* <div className="flex gap-4 items-center">
                 <ConfigProvider
                   theme={{ token: { colorTextPlaceholder: "#f3f3f3" } }}
                 >
                   <Input
                     placeholder="Search company..."
                     value={searchText}
                     onChange={(e) => onSearch(e.target.value)}
                     className="text-primary-color font-semibold !border-primary-color !bg-transparent py-2 !rounded-full"
                     prefix={
                       <SearchOutlined className="text-primary-color font-bold text-lg mr-2" />
                     }
                   />
                 </ConfigProvider>
               </div> */}
        </div>
      </div>
      <div className="container mx-10">
        <div className="flex  justify-start items-center gap-2 mx-5 mb-4">
          <img src={AllImages.kfc} className="w-20" alt="" />
          <div className="">
            <h1 className="text-xl font-semibold">Dianne Russell</h1>
            <div className="flex justify-between items-center gap-2">
              <Link to={`accepted`}>
                <button
                  className="font-semibold text-base bg-secondary-color rounded-tl-xl rounded-br-xl text-white px-3 py-2  hover:scale-105 transition delay-100  text-nowrap
                     "
                >
                  Accept
                </button>
              </Link>
              <button className="font-semibold text-base rounded-br-xl  rounded-tl-xl border border-secondary-color text-secondary-color  px-3 py-2 hover:scale-105 transition delay-100 ">
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start  gap-9">
          <div className="">
            <div className="mt-2">
              <h2 className="font-bold text-3xl mb-5">Venue Information</h2>
              <div className="text-lg  mx-auto">
                <div className="sm:flex gap-1 sm:gap-2 mb-2">
                  <div className="font-bold">Name:</div>
                  <div>name</div>
                </div>
                <div className="sm:flex gap-1 sm:gap-2 mb-2">
                  <div className="font-bold">Phone:</div>
                  <div>phone</div>
                </div>
                <div className="sm:flex gap-1 sm:gap-2 mb-2">
                  <div className="font-bold">Email:</div>
                  <div>email</div>
                </div>

                <div className="sm:flex gap-1 sm:gap-2 mb-2">
                  <div className="font-bold">Address:</div>
                  <div>location</div>
                </div>
                <div className="sm:flex gap-1 sm:gap-2 mb-2">
                  <div className="font-bold">Bio:</div>
                  <div>Bio</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {" "}
            <div className=" gap-1 sm:gap-2 mb-2 ">
              <h1 className="font-bold text-2xl mb-4 text-start">
                Attachments
              </h1>
              {/* <div className="flex  gap-4">
                <div className="bg-[#B4B8BD] h-[116px] w-[92px] p-2  cursor-pointer">
                  <div className="bg-secondary-color rounded-full w-[76px] aspect-square flex justify-center items-center ">
                    <img src={AllImages.PDFImage} alt="" />
                  </div>
                  <p className="text-black  text-nowrap text-xs">Resume.pdf</p>
                </div>
                <div className="bg-[#B4B8BD] h-[116px] w-[92px] p-2  cursor-pointer ">
                  <div className="bg-secondary-color rounded-full w-[76px] aspect-square flex justify-center items-center ">
                    <img src={AllImages.PDFImage} alt="" />
                  </div>{" "}
                  <p className="text-black  text-nowrap text-xs">Resume.pdf</p>
                </div>
              </div> */}
              <div className="flex gap-2.5">
                <img
                  src={AllImages.doc1}
                  className="rounded-lg w-28 aspect-square object-cover"
                  alt=""
                />
                <img
                  src={AllImages.doc2}
                  className="rounded-lg w-28 aspect-square object-cover"
                  alt=""
                />
                <img
                  src={AllImages.doc3}
                  className="rounded-lg w-28 aspect-square object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueSeeDetails;
