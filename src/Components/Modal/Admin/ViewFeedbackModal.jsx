/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";

const ViewFeedbackModal = ({
  isFeedbackViewModalVisible,
  handleCancel,
  handleRemove,
  currentRecord,
}) => {
  return (
    <Modal
      title={
        <div className="pt-7 text-center">
          <h2 className="text-secondary-color text-4xl ">Company Feedback</h2>
          <p className="text-[#989898] mt-3 text-xl">
            See full details feedback from {currentRecord?.companyName}
          </p>
        </div>
      }
      open={isFeedbackViewModalVisible}
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
              src={AllImages.yellow}
              alt={currentRecord?.companyName}
              className="w-12 h-12 sm:w-16  sm:h-16 rounded-lg mr-4"
            />
            <div className="text-xl sm:text-2xl font-bold">
              {currentRecord?.companyName}
            </div>
          </div>

          <div className="mt-2">
            <div className="text-lg w-[90%] mx-auto">
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Company Name:</div>
                <div> {currentRecord?.companyName}</div>
              </div>

              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Email:</div>
                <div>{currentRecord?.email}</div>
              </div>

              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Date:</div>
                <div>{currentRecord?.date}</div>
              </div>

              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Review:</div>
                <div className="text-justify pt-0 ">
                  {currentRecord?.review}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => handleRemove(currentRecord)}
        className="bg-secondary-color text-primary-color py-3 text-lg font-semibold rounded-lg mt-8 w-full"
      >
        Delete
      </button>
    </Modal>
  );
};

export default ViewFeedbackModal;
