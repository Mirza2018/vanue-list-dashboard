/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { toast } from "sonner";
import { useBlockCustomersMutation } from "../../../redux/api/adminApi";

const BlockUserModal = ({
  isCompanyBlockModalVisible,
  handleCompanyBlock,
  handleCancel,
  currentCompanyRecord,
}) => {
  const [blockUser] = useBlockCustomersMutation();
  // console.log(currentCompanyRecord?._id);

  const handleBlock = async (block) => {
    const toastId = toast.loading(
      `User is ${currentCompanyRecord?.isBlocked ? "Unblock" : "block"}ing...`
    );
 
    console.log(currentCompanyRecord?._id, block);

    // return;
    try {
      const res = await blockUser({
        id: currentCompanyRecord?._id,
        action: block,
      }).unwrap();
      console.log(res);
      toast.success(res?.message || "User is block successfully", {
        id: toastId,
        duration: 2000,
      });
      handleCancel();
    } catch (error) {
      console.log(error);
      toast.error("There is an problem, please try later", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Modal
      // title="Confirm Delete"
      open={isCompanyBlockModalVisible}
      onOk={handleCompanyBlock}
      onCancel={handleCancel}
      okText="block"
      cancelText="Cancel"
      centered
      style={{ textAlign: "center" }}
      // styles.body={{ textAlign: "center" }}
      width={400}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "40px",
            marginTop: "30px",
          }}
        >
          <Button
            className="text-xl py-5 px-8 !text-black"
            type="primary"
            onClick={handleCancel}
            style={{
              marginRight: 12,
              background: "rgba(221, 221, 221, 1)",
            }}
          >
            Cancel
          </Button>
          {currentCompanyRecord?.isBlocked ? (
            <Button
              className="text-xl py-5 px-8"
              type="primary"
              style={{ background: "#ff9966" }}
              onClick={() => handleBlock("unblock")}
            >
              UnBlock
            </Button>
          ) : (
            <Button
              className="text-xl py-5 px-8"
              type="primary"
              style={{ background: "#CE0000" }}
              onClick={() => handleBlock("block")}
            >
              Block
            </Button>
          )}
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4 text-center text-black">
        Do you want to {currentCompanyRecord?.isBlocked ? "Unblock" : "block"}{" "}
        this user?
      </p>
    </Modal>
  );
};

export default BlockUserModal;
