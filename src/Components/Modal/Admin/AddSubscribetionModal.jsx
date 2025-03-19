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

const AddSubscribetionModal = ({ isAddSubscription, setIsAddSubscription }) => {
  const [form] = Form.useForm();
  const { Dragger } = Upload;
  const onFinish = (values) => {
    console.log("Service User:", values);
    handleCancel();
    form.resetFields();
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
              Plan Name
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter Plan Name",
                },
              ]}
              name="name"
              className=" "
            >
              <Input
                placeholder="Enter Plan Name"
                className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Plan Price
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter Plan Price",
                },
              ]}
              name="name"
              className=" "
            >
              <Input
                placeholder="Enter Plan Price"
                className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Facilities
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter Plan Facilities",
                },
              ]}
              name="facilities"
              className=" "
            >
              <Input
                placeholder="Enter Plan Facilities"
                className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded mt-3"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AddSubscribetionModal;
