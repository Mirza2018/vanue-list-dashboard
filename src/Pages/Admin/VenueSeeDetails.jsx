import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { FaChevronLeft } from "react-icons/fa";
import {
  usePendingVenueQuery,
  useVenueActionMutation,
} from "../../redux/api/adminApi";
import { toast } from "sonner";

const VenueSeeDetails = () => {
  const { data, currentData, isLoading, isFetching, isSuccess } =
    usePendingVenueQuery();
  const displayedData = data ?? currentData;
  const [venueAction] = useVenueActionMutation();
  const [detailsVenue, setDetailsVenue] = useState();
  const params = useParams();

  useEffect(() => {
    const findVenue = displayedData?.data?.find((p) => p._id == params.id);

    setDetailsVenue(findVenue);
  }, [isLoading, isFetching, isSuccess, displayedData]);
  const navigate = useNavigate();
  console.log(detailsVenue);
  const handleVenueDelete = async () => {
    const toastId = toast.loading("Venue deleteing...");

    try {
      const res = await venueAction({
        id: detailsVenue?._id,
        action: "deleted",
      }).unwrap();
      console.log(res);
      toast.success("Venue deleted Successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate(`/admin/all-venues`);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || "There is an problem ,please try later",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };
  const handleVenueAccept = async () => {
    const toastId = toast.loading("Venue accepting...");

    try {
      const res = await venueAction({
        id: detailsVenue?._id,
        action: "accepted",
      }).unwrap();
      console.log(res);
      toast.success("Venue accepted Successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate(`/admin/admin/all-venues`);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || "There is an problem ,please try later",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };
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
          <img src={detailsVenue?.profileImage} className="w-20" alt="" />
          <div className="">
            <h1 className="text-xl font-semibold">{detailsVenue?.name}</h1>
            <div className="flex justify-start items-center gap-4">
              {/* <Link to={`accepted`}> */}
              <button
                onClick={handleVenueAccept}
                className="font-semibold text-base bg-secondary-color rounded-tl-xl rounded-br-xl text-white px-3 py-2  hover:scale-105 transition delay-100  text-nowrap
                     "
              >
                Accept
              </button>
              {/* </Link> */}
              <button
                onClick={handleVenueDelete}
                className="font-semibold text-base rounded-br-xl  rounded-tl-xl border border-secondary-color text-secondary-color  px-3 py-2 hover:scale-105 transition delay-100 "
              >
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
                  <div>{detailsVenue?.name}</div>
                </div>
                <div className="sm:flex gap-1 sm:gap-2 mb-2">
                  <div className="font-bold">Phone:</div>
                  <div>{detailsVenue?.phone}</div>
                </div>
                {/* <div className="sm:flex gap-1 sm:gap-2 mb-2">
                  <div className="font-bold">Email:</div>
                  <div>email</div>
                </div> */}

                <div className="sm:flex gap-1 sm:gap-2 mb-2">
                  <div className="font-bold">Address:</div>
                  <div>{detailsVenue?.postalAddress}</div>
                </div>
                <div className="sm:flex gap-1 sm:gap-2 mb-2">
                  <div className="font-bold">Description:</div>
                  <div>{detailsVenue?.description}</div>
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
              <div className="flex gap-2.5">
                {detailsVenue?.photos?.map((pic) => (
                  <img
                    src={pic}
                    className="rounded-lg w-28 aspect-square object-cover"
                    alt=""
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueSeeDetails;
