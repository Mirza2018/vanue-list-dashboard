/* eslint-disable react/prop-types */
import { ConfigProvider, Modal } from "antd";
import { toast } from "sonner";
import { useDeleteSubscriptionMutation } from "../../../redux/api/adminApi";

const DeleteSubscribtion = ({
  isAddSubscription,
  setIsAddSubscription,
  plan,
}) => {
  const [deleteSubscription] = useDeleteSubscriptionMutation();

  const onFinish = async () => {
    const toastId = toast.loading("Subscription is deleting...");

    //   return
    try {
      const res = await deleteSubscription(plan?._id).unwrap();
      toast.success("Subscription delete successfully", {
        id: toastId,
        duration: 2000,
      });

      setIsAddSubscription(false);
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
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#E8EBEC",
            headerBg: "#E8EBEC",
          },
        },
      }}
    >
      <Modal
        open={isAddSubscription}
        onCancel={() => setIsAddSubscription(false)}
        footer={[]}
        centered
        style={{ textAlign: "center" }}
        className=""
      >
        <div className="p-10">
          <h1 className="text-2xl font-medium">
            Do you want to delete this Subscription Plan?
          </h1>
          <div className="flex justify-center gap-5 mt-8">
            <button
              className="bg-green-500 text-white px-10 py-1 rounded-md text-xl"
              onClick={onFinish}
            >
              Yes
            </button>
            <button
              className="bg-red-500 text-white px-10 py-1 rounded-md text-xl"
              onClick={() => setIsAddSubscription(false)}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default DeleteSubscribtion;
