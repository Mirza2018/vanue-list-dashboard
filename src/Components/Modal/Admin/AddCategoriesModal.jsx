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

const AddCategoriesModal = ({ isAddCompanyModalVisible, handleCancel }) => {
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
              Category Name
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter Category Name",
                },
              ]}
              name="name"
              className=" "
            >
              <Input
                placeholder="Enter Category Name"
                className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Category Image
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Upload Category Image",
                },
              ]}
              name="image"
              className=" w-full"
            >
              {/* <Input
                placeholder="Enter Category Serial"
                className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
              /> */}
              {/* <Upload maxCount={1} className=""> */}
              <Dragger maxCount={1} accept="image/*" name="file">
                <div className="flex flex-col justify-center items-center text-black">
                  <p className="ant-upload-drag-icon ">
                    <FiUpload className="text-4xl" />
                  </p>
                  <p className="ant-upload-text">Upload your category image</p>
                </div>
              </Dragger>
              {/* </Upload> */}
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

export default AddCategoriesModal;
