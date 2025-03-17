/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Form, Input, Modal, Typography } from "antd";

const AddCarerModal = ({ isAddModalVisible, handleCancel }) => {
  const onFinish = (values) => {
    console.log("Carer:", values);
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
        open={isAddModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        style={{ textAlign: "center" }}
        className="lg:!w-[1000px]"
      >
        <div className="p-10">
          <Form
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full text-start"
          >
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Name
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter carer name",
                },
              ]}
              name="name"
              className=" "
            >
              <Input
                placeholder="Enter Carer Name"
                className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Contact number
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter carer contact number",
                },
              ]}
              name="phone"
              className=" "
            >
              <Input
                placeholder="Enter Carer Contact Number"
                className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Email
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter carer Email",
                },
              ]}
              name="email"
              className=" "
            >
              <Input
                placeholder="Enter Carer Email"
                className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Address
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter carer address",
                },
              ]}
              name="address"
              className=" "
            >
              <Input
                placeholder="Enter Carer Address"
                className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
              />
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

export default AddCarerModal;
