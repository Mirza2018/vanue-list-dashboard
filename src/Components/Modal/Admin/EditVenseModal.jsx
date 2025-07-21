/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal, Typography } from "antd";
import { toast } from "sonner";
import {
  useEditVenueMutation,
  useVenueActionMutation,
} from "../../../redux/api/adminApi";
import { useEffect } from "react";
import { data } from "autoprefixer";

const EditVenseModal = ({
  isVenueEditModalVisible,
  handleCancel,
  currentVenueRecord,
}) => {
  console.log(currentVenueRecord);
  const [editVanue] = useEditVenueMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    if (currentVenueRecord) {
      form.setFieldsValue({
        websiteUrl: currentVenueRecord?.websiteUrl,
      });
    }
  }, [currentVenueRecord, form]);

  const onFinish = async (values) => {
    console.log(values);

    const toastId = toast.loading(`Business User Website is Editing...`);
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    //   return
    try {
      const res = await editVanue({
        id: currentVenueRecord?._id,
        data: formData,
      }).unwrap();
      toast.success("Business User website edit successfully", {
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
      open={isVenueEditModalVisible}
      onOk={handleCancel}
      onCancel={handleCancel}
      okText="block"
      cancelText="Cancel"
      centered
      style={{ textAlign: "center" }}
      // styles.body={{ textAlign: "center" }}
      width={400}
      footer={[]}
    >
      <div>
        <p className="text-3xl font-semibold pt-10 pb-4 text-center text-black">
          Edit Business User
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="bg-transparent w-full"
        >
          <Typography.Title
            className="text-start !text-xl"
            style={{ color: "#222222" }}
          >
            website Url
          </Typography.Title>
          <Form.Item name="websiteUrl" className="">
            <Input
              placeholder="Enter your website Url"
              className="py-2 px-3 text-xl bg-site-color border !border-secondary-color "
            />
          </Form.Item>
          <Form.Item>
            <button
              className="text-xl py-3 px-8 !text-white rounded-lg bg-[#075B5D]"
              type="primary"
              // onClick={handleCancel}
            >
              Update
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default EditVenseModal;
