/* eslint-disable react/prop-types */
import { Button, Modal, Tooltip } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";

const ViewAccountRecovery = ({
  isCompanyViewModalVisible,
  handleCancel,
  currentCompanyRecord,
  handleCompanyBlock,
  showCompanyBlockModal,
}) => {
  console.log(currentCompanyRecord);

  return (
    <Modal
      title=""
      open={isCompanyViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:!w-[800px]"
    >
      <section className="grid md:grid-cols-5 grid-cols-1 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold text-start mt-5">
            User Information
          </h1>
          <div className="grid grid-cols-2 gap-2 text-start mt-2">
            <h1 className="text-lg">Name :</h1>
            <p className="text-lg">{currentCompanyRecord?.userId?.fullName}</p>
            <h1 className="text-lg">Email :</h1>
            <p className="text-lg">{currentCompanyRecord?.email}</p>
            <h1 className="text-lg">Address :</h1>
            <p className="text-lg">{currentCompanyRecord?.userId?.address}</p>
            {/* <h1 className="text-lg">Registration Date </h1>
            <p className="text-lg">: {currentCompanyRecord?.joiningDate}</p>
            <h1 className="text-lg">Last Login</h1>
            <p className="text-lg"> : {currentCompanyRecord?.joiningDate}</p> */}
          </div>
        </div>
        <div className="md:col-span-3">
          <h1 className="text-2xl font-bold text-start mt-5">
            Request Details
          </h1>
          <div className="grid grid-cols-2 gap-2 text-start mt-2">
            <h1 className="text-lg">Request ID :</h1>
            <p className="text-lg">{currentCompanyRecord?._id}</p>
            <h1 className="text-lg">Request Date :</h1>
            <p className="text-lg">
              {currentCompanyRecord?.createdAt.split("T")[0]}
            </p>
            <h1 className="text-lg">Status :</h1>
            <p className="text-lg">{currentCompanyRecord?.status}</p>
            <h1 className="text-lg">Reason for Request :</h1>
            <p className="text-lg">{currentCompanyRecord?.reasonForRequest}</p>
            <h1 className="text-lg">Supporting Documents :</h1>
           
            <div className="flex gap-2.5 flex-wrap ">
              {currentCompanyRecord?.supportingDocuments?.map((img) => (
                <img
                  key={img} // Add a unique key for each mapped element
                  src={img}
                  className="rounded-lg w-16 aspect-square object-cover"
                  alt=""
                />
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-5">
          <button
            onClick={handleCancel}
            className="text-xl rounded-2xl text-white bg-[#8C8C8C] py-[10px] px-44"
          >
            Close
          </button>
        </div>
      </section>
    </Modal>
  );
};

export default ViewAccountRecovery;
