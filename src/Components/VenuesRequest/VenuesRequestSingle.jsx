import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { toast } from "sonner";
import { useVenueActionMutation } from "../../redux/api/adminApi";

const VenuesRequestSingle = ({ data }) => {
  const [venueAction] = useVenueActionMutation();
  // console.log(data);
  const navigate=useNavigate()

  const handleVenueDelete = async () => {
    const toastId = toast.loading("Venue deleteing...");

    try {
      const res = await venueAction({
        id: data?._id,
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

  return (
    <div className="flex  justify-start items-center gap-2">
      <img src={data?.profileImage} alt="" className="w-20" />
      <div className="">
        <h1 className="text-xl font-semibold mb-3">{data?.name}</h1>
        <div className="flex justify-start items-center gap-2">
          <Link to={`deatils/${data?._id}`}>
            <button
              className="font-semibold text-base bg-secondary-color rounded-tl-xl rounded-br-xl text-white px-3 py-2  hover:scale-105 transition delay-100  text-nowrap
            "
            >
              See Details
            </button>
          </Link>
          <button
            onClick={handleVenueDelete}
            className="font-semibold text-base rounded-br-xl  rounded-tl-xl border border-secondary-color text-secondary-color  px-3 py-2 hover:scale-105 transition delay-100 "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenuesRequestSingle;
