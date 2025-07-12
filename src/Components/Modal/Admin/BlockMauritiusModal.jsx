/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { toast } from "sonner";
import {

  useDeleteMauritiusMutation,
} from "../../../redux/api/adminApi";

const BlockMauritiusModal = ({
  isCompanyViewModalVisible,
  handleCancel,
  currentCompanyRecord,
  handleCompanyBlock,
  showCompanyBlockModal,
}) => {
  const [deleteMauritius] = useDeleteMauritiusMutation();

  const onFinish = async () => {
    const toastId = toast.loading("Subscription is deleting...");

    console.log(currentCompanyRecord);

    // return;
    try {
      const res = await deleteMauritius(currentCompanyRecord?._id).unwrap();
      console.log(res);

      toast.success("Subscription delete successfully", {
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
      title={
        <div className="pt-7 text-center">
          <h2 className="text-secondary-color text-3xl ">
            Do you want to delete this Discover Mauritius?
          </h2>
        </div>
      }
      open={isCompanyViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:!w-[500px]"
    >
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
        <Button
          className="text-xl py-5 px-8"
          type="primary"
          style={{ background: "#CE0000" }}
          onClick={onFinish}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default BlockMauritiusModal;
