/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { useRecoveryAccountRequestMutation } from "../../../redux/api/adminApi";
import { toast } from "sonner";

const AproveAccountModal = ({
  setApproveAccount,
  approveAccount,
  approveAccountRecord,
}) => {
  const [recoveryAccountRequest] = useRecoveryAccountRequestMutation();
  // console.log(approveAccountRecord);
  const handleAccept = async () => {
    // console.log("reject Company:", {
    //   id: data?._id,
    // });

    const toastId = toast.loading("Request rejecting...");
    const data = {
      status: "approved",
    };
    try {
      const res = await recoveryAccountRequest({
        id: approveAccountRecord?._id,
        data: data,
      }).unwrap();
      console.log(res);
      toast.success("Request reject Successfully", {
        id: toastId,
        duration: 2000,
      });

      setApproveAccount(false);
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
    <Modal
      // title="Confirm Delete"
      open={approveAccount}
      onOk={() => setApproveAccount(false)}
      onCancel={() => setApproveAccount(false)}
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
            onClick={() => setApproveAccount(false)}
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
            style={{ background: "#3AD800" }}
            onClick={handleAccept}
          >
            yes
          </Button>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4 text-center text-black">
        Do you want to Approve this request?
      </p>
    </Modal>
  );
};

export default AproveAccountModal;
