/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { useActionRecommentedContentMutation } from "../../redux/api/adminApi";
import { toast } from "sonner";

const ContentApproveModal = ({ setIsApprove, isApprove }) => {
  const [actionContent] = useActionRecommentedContentMutation();
  const onApprove = async () => {
    const toastId = toast.loading("Content is accepteing...");
    const data = {
      status: "accepted",
    };
    //   return
    try {
      const res = await actionContent({ data: data, id: id }).unwrap();
      console.log(res);

      toast.success("Content is accepted successfully", {
        id: toastId,
        duration: 2000,
      });
      setIsApprove(false);
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
      open={isApprove}
      onOk={() => setIsApprove(false)}
      onCancel={() => setIsApprove(false)}
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
            onClick={() => setIsApprove(false)}
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
            // onClick={() => setIsApprove(false)}
            onClick={onApprove}
          >
            yes
          </Button>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4 text-center text-black">
        Do you want to Approve this Content?
      </p>
    </Modal>
  );
};

export default ContentApproveModal;
