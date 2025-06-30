/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { useActionRecommentedContentMutation } from "../../redux/api/adminApi";
import { toast } from "sonner";

const ContentRemoveModal = ({ setIsRemove, isRemove,id }) => {
  const [actionContent] = useActionRecommentedContentMutation();
  const onReject = async () => {
    const toastId = toast.loading("Content is Deleteing...");
    const data = {
      status: "deleted",
    };
    //   return
    try {
      const res = await actionContent({ data: data, id: id }).unwrap();
      console.log(res);

      toast.success("Content is delete successfully", {
        id: toastId,
        duration: 2000,
      });

      setIsRemove(false);
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
      open={isRemove}
      onOk={() => setIsRemove(false)}
      onCancel={() => setIsRemove(false)}
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
            onClick={() => setIsRemove(false)}
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
            style={{ background: "#C70000" }}
            onClick={onReject}
          >
            yes
          </Button>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4 text-center text-black">
        Do you want to Remove this Content?
      </p>
    </Modal>
  );
};

export default ContentRemoveModal;
