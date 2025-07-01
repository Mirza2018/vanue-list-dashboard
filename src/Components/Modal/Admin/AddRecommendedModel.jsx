/* eslint-disable react/prop-types */
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Typography,
  Upload,
} from "antd";
import { FiUpload } from "react-icons/fi";
import { useCreateRecommentMutation } from "../../../redux/api/adminApi";
import { toast } from "sonner";

const AddRecommendedModel = ({ isAddCompanyModalVisible, handleCancel }) => {
  const [addRecomanded] = useCreateRecommentMutation();
  const [form] = Form.useForm();
  const { Dragger } = Upload;
  const onFinish = async (values) => {
    const toastId = toast.loading("Content is adding...");
    console.log(values.title);

    if (
      !values?.video?.fileList?.length ||
      !values?.video?.fileList[0]?.originFileObj
    ) {
      return toast.error("Please select an video", {
        id: toastId,
        duration: 2000,
      });
    }
    if (!values?.title) {
      return toast.error("Please selete a Title", {
        id: toastId,
        duration: 2000,
      });
    }

    const data = { title: values.title };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    formData.append("video", values.video.fileList[0].originFileObj);

    try {
      const res = await addRecomanded(formData).unwrap();
      console.log(res);
      toast.success("Content is added successfully", {
        id: toastId,
        duration: 2000,
      });
      handleCancel();
      form.resetFields();
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
        open={isAddCompanyModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        style={{ textAlign: "center" }}
        className="lg:!w-[500px]"
      >
        <div className="p-10">
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full text-start"
          >
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Content title
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter content title",
                },
              ]}
              name="title"
              className=" "
            >
              <Input
                placeholder="Enter content title"
                className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              video
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Upload video",
                },
              ]}
              name="video"
              className=" w-full"
            >
              <Dragger maxCount={1} accept="video/*" name="file">
                <div className="flex flex-col justify-center items-center text-black">
                  <p className="ant-upload-drag-icon">
                    <FiUpload className="text-4xl" />
                  </p>
                  <p className="ant-upload-text">Upload your content video</p>
                </div>
              </Dragger>
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded mt-3"
                htmlType="submit"
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AddRecommendedModel;
