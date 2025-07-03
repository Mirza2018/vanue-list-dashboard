/* eslint-disable react/prop-types */
import { Modal } from "antd";

const ViewMauritiusModal = ({
  isCompanyViewModalVisible,
  handleCancel,
  currentCompanyRecord,
  handleCompanyBlock,
  showCompanyBlockModal,
}) => {
  return (
    <Modal
      title={
        <div className="pt-7 text-center">
          <h2 className="text-secondary-color text-4xl ">User Details</h2>
          <p className="text-[#989898] mt-3 text-xl">
            See all details about {currentCompanyRecord?.fullName}
          </p>
        </div>
      }
      open={isCompanyViewModalVisible}
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
              src={currentCompanyRecord?.profileImage}
              alt={currentCompanyRecord?.fullName}
              className="w-12 h-12 sm:w-16  sm:h-16 rounded-lg mr-4"
            />
            <div className="text-xl sm:text-2xl font-bold text-secondary-color">
              {currentCompanyRecord?.userName}
            </div>
          </div>

          <div className="mt-2">
            <h2 className=" font-bold text-3xl mb-5">User Information</h2>
            <div className="text-lg w-[90%] mx-auto">
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Name:</div>
                <div>{currentCompanyRecord?.fullName}</div>
              </div>

              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Email:</div>
                <div>{currentCompanyRecord?.email}</div>
              </div>
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Country:</div>
                <div>{currentCompanyRecord?.country}</div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Joining Date:</div>
                <div>{currentCompanyRecord?.createdAt?.split("T")[0]}</div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => (
            handleCompanyBlock(currentCompanyRecord), showCompanyBlockModal()
          )}
          className="bg-secondary-color text-primary-color py-3 text-xl font-semibold rounded-lg mt-8 w-full"
        >
          Block
        </button>
      </div>
    </Modal>
  );
};

export default ViewMauritiusModal;
