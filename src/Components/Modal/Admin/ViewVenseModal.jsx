/* eslint-disable react/prop-types */
import { Button, Modal, Tooltip } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../../redux/getBaseUrl";

const ViewVenseModal = ({
  isVenueViewModalVisible,
  handleCancel,
  currentVenueRecord,
  handleVenueBlock,
  showVenueBlockModal,
}) => {
  console.log(currentVenueRecord);

  return (
    <Modal
      title={
        <div className="pt-7 text-center">
          <h2 className="text-secondary-color text-4xl ">Venue Details</h2>
          <p className="text-[#989898] mt-3 text-xl">
            See all details about {currentVenueRecord?.venueName}
          </p>
        </div>
      }
      open={isVenueViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:!w-[500px]"
    >
      <div className="px-5 pb-5">
        <div className="">
          <div className="flex justify-center items-center p-4">
            {/* Avatar */}
            <img
              src={currentVenueRecord?.profileImage}
              alt={currentVenueRecord?.name}
              className="w-12 h-12 sm:w-16  sm:h-16 rounded-lg mr-4"
            />
            <div className="text-xl sm:text-2xl font-bold text-secondary-color">
              {currentVenueRecord?.name}
            </div>
          </div>

          <div className="mt-2">
            <h2 className=" font-bold text-3xl mb-5">Vense Information</h2>
            <div className="text-lg w-[90%] mx-auto">
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Name:</div>
                <div>{currentVenueRecord?.name}</div>
              </div>

              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Phone:</div>
                <div>{currentVenueRecord?.phone}</div>
              </div>
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Email:</div>
                <div>{currentVenueRecord?.email}</div>
              </div>
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Adress:</div>
                <div>{currentVenueRecord?.postalAddress}</div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Description:</div>
                <div>{currentVenueRecord?.description}</div>
              </div>
            </div>
          </div>
        </div>
        {/* <button
          onClick={() => (
            handleVenueBlock(currentVenueRecord), showVenueBlockModal()
          )}
          className="bg-secondary-color text-primary-color py-3 text-xl font-semibold rounded-lg mt-8 w-full"
        >
          Block
        </button> */}
      </div>
    </Modal>
  );
};

export default ViewVenseModal;
