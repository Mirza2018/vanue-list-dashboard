import React from "react";

import { Link } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";

const VenuesRequestSingle = ({data}) => {
  return (
    <div className="flex  justify-center items-center gap-2">
      <img src={AllImages.kfc} alt="" className="w-20" />
      <div className="">
        <h1 className="text-xl font-semibold mb-3">{data?.venueName}</h1>
        <div className="flex justify-between items-center gap-2">
          <Link to={`deatils/${1}`}>
            <button
              className="font-semibold text-base bg-secondary-color rounded-tl-xl rounded-br-xl text-white px-3 py-2  hover:scale-105 transition delay-100  text-nowrap
            "
            >
              See Details
            </button>
          </Link>
          <button className="font-semibold text-base rounded-br-xl  rounded-tl-xl border border-secondary-color text-secondary-color  px-3 py-2 hover:scale-105 transition delay-100 ">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenuesRequestSingle;
