import { Checkbox, Form, Input, Radio, Select, Upload } from "antd";
import React from "react";
import { FiUpload } from "react-icons/fi";
const { Option } = Select;
const { Dragger } = Upload;
const NotificationsPage = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    //    form.resetFields();
  };
  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">
            Notifications
          </p>
        </div>
      </div>

      <main className="p-5">
        <h1 className="text-2xl">Select User</h1>

        <Form form={form} onFinish={onFinish}>
          <h1 className="text-lg">Recipient</h1>
          <Form.Item
            name="user"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group
              className="flex flex-col gap-2"
              options={[
                { value: "allUsers", label: "All Users" },
                { value: "specificUser", label: "Specific User" },
              ]}
            />
          </Form.Item>
          <h1 className="text-lg">Title</h1>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <h1 className="text-lg">Message</h1>
          <Form.Item name="message">
            <Input.TextArea rows={4} />
          </Form.Item>
          <h1 className="text-lg">Attachment</h1>
          <Form.Item name="image">
            <Dragger maxCount={1} accept="image/*" name="file">
              <div className="flex flex-col justify-center items-center text-black">
                <p className="ant-upload-drag-icon ">
                  <FiUpload className="text-4xl" />
                </p>
                <p className="ant-upload-text">Upload Picture/Poster</p>
              </div>
            </Dragger>
          </Form.Item>
          <h1 className="text-lg">Notification Type</h1>
          <Form.Item name="notifyType">
            <Checkbox.Group className="flex flex-col gap-3">
              <Checkbox value="inApp">In-App</Checkbox>
              <Checkbox value="email">Email</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <button
            className={`text-lg font-normal  py-3 px-[18px] rounded-lg flex items-center gap-4 w-fit cursor-pointer select-none bg-secondary-color text-white`}
          >
            Send Notification
          </button>
        </Form>
      </main>
    </div>
  );
};

export default NotificationsPage;
