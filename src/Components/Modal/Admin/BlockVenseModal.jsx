/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { toast } from "sonner";
import { useVenueActionMutation } from "../../../redux/api/adminApi";

const BlockVenseModal = ({
  isVenueBlockModalVisible,
  handleVenueBlock,
  handleCancel,
  currentVenueRecord,
}) => {
  console.log(currentVenueRecord);
  const [deleteSubscription] = useVenueActionMutation();

  const onFinish = async (block) => {
    const toastId = toast.loading(
      `Business User is ${
        currentVenueRecord?.isBlocked ? "Unblock" : "block"
      }ing...`
    );

    //   return
    try {
      const res = await deleteSubscription({
        id: currentVenueRecord?._id,
        action: block,
      }).unwrap();
      toast.success("Business User is blocked successfully", {
        id: toastId,
        duration: 2000,
      });

      handleCancel();
    } catch (error) {
      toast.error(
        error?.data?.message || "There was a problem, please try later",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  return (
    <Modal
      // title="Confirm Delete"
      open={isVenueBlockModalVisible}
      onOk={handleVenueBlock}
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
          {/* <Button
            className="text-xl py-5 px-8"
            type="primary"
            style={{ background: "#CE0000" }}
            onClick={onFinish}
          >
            Block
          </Button> */}

          {currentVenueRecord?.isBlocked ? (
            <Button
              className="text-xl py-5 px-8"
              type="primary"
              style={{ background: "#ff9966" }}
              onClick={() => onFinish("unblocked")}
            >
              UnBlock
            </Button>
          ) : (
            <Button
              className="text-xl py-5 px-8"
              type="primary"
              style={{ background: "#CE0000" }}
              onClick={() => onFinish("blocked")}
            >
              Block
            </Button>
          )}
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4 text-center text-black">
        Do you want to {currentVenueRecord?.isBlocked ? "Unblock" : "block"}{" "}
        this Business User?
      </p>
    </Modal>
  );
};

export default BlockVenseModal;
