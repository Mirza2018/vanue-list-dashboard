/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";

const ViewReportModal = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  handleBlock,
}) => {
  return (
    <Modal
      title={
        <div className="pt-7 text-center">
          <h2 className="text-secondary-color text-4xl ">Report Details</h2>
          <p className="text-[#989898] mt-3 text-xl">
            See report details of {currentRecord?.name}
          </p>
        </div>
      }
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:!w-[500px]"
    >
      <div className="p-5">
        <div className="">
          <div className="flex justify-start items-center p-4">
            {/* Avatar */}
            <img
              src={AllImages.userImage}
              alt={currentRecord?.userName}
              className="w-12 h-12 sm:w-16  sm:h-16 rounded-lg mr-4"
            />
            <div className="text-xl sm:text-2xl font-bold">
              {currentRecord?.name}
            </div>
          </div>

          <div className="mt-2">
            <div className="text-lg w-[90%] mx-auto">
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Name:</div>
                <div>{currentRecord?.name}</div>
              </div>
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Report Against::</div>
                <div>{currentRecord?.reportAgainst?.name}</div>
              </div>
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Date:</div>
                <div>{currentRecord?.date}</div>
              </div>
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">User Type:</div>
                <div>{currentRecord?.userType}</div>
              </div>
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Description:</div>
                <div className="text-justify pt-2 text-sm">
                  {currentRecord?.description}
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => handleBlock(currentRecord)}
          className="bg-secondary-color text-primary-color py-3 text-xl font-semibold rounded-lg mt-8 w-full"
        >
          Block
        </button>
      </div>
    </Modal>
  );
};

export default ViewReportModal;
