import {
  Button,
  Checkbox,
  Form,
  Input,
  List,
  Radio,
  Select,
  Upload,
} from "antd";
import React from "react";
import { FiUpload } from "react-icons/fi";
const { Option } = Select;
const { Dragger } = Upload;

const AddContent = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    //    form.resetFields();
  };
  const existingContents = ["Welcome to Mauritius!", "Our City"];
  return (
    <div>
      {" "}
      <Form form={form} onFinish={onFinish}>
        <h1 className="text-lg font-semibold mb-2">Select Category</h1>
        <Form.Item
          name="category"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue="Please Select one"
            options={[
              {
                value: "discoverMauritius",
                label: "Discover Mauritius",
              },
              {
                value: "happyMauritius",
                label: "Happy Mauritius",
              },
            ]}
          />
        </Form.Item>

        <h3 className="text-lg font-semibold mb-2">Existing Contents</h3>
        <List
          bordered
          dataSource={existingContents}
          className="rounded-lg border border-black mb-3" // Tailwind for border and rounded corners
          renderItem={(item, index) => (
            <List.Item
              className={`flex justify-between items-center ${
                index === existingContents.length - 1
                  ? ""
                  : "border-b border-black"
              }`}
              actions={[
                <Button
                  type="danger"
                  className="bg-red-500 text-white border-none rounded-md"
                >
                  Remove
                </Button>,
              ]}
            >
              <span>{item}</span>
            </List.Item>
          )}
        />
        <h1 className="text-lg font-semibold mb-2">Add New Content Type</h1>
        <Form.Item
          name="contentType"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue="Please Select one"
            options={[
              {
                value: "image",
                label: "Image",
              },
              {
                value: "video",
                label: "Video",
              },
            ]}
          />
        </Form.Item>

        <h1 className="text-lg font-semibold mb-2">Title</h1>
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
        <h1 className="text-lg font-semibold mb-2">Description</h1>
        <Form.Item name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <button
          className={`text-lg font-normal  py-3 px-[18px] rounded-lg flex items-center gap-4 w-fit cursor-pointer select-none bg-secondary-color text-white`}
        >
          Add Content
        </button>
      </Form>
    </div>
  );
};

export default AddContent;
