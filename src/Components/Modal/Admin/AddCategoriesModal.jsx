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
import { useCreateCategoryMutation } from "../../../redux/api/adminApi";
import { toast } from "sonner";

const AddCategoriesModal = ({ isAddCompanyModalVisible, handleCancel }) => {
  const [addCategoty] = useCreateCategoryMutation();
  const [form] = Form.useForm();
  const { Dragger } = Upload;
  const onFinish = async (values) => {
    const toastId = toast.loading("Category is adding...");


    if (
      !values?.image?.fileList?.length ||
      !values?.image?.fileList[0]?.originFileObj
    ) {
      return toast.error("Please select an image", {
        id: toastId,
        duration: 2000,
      });
    }
    if (!values?.name) {
      return toast.error("Please selete a name", {
        id: toastId,
        duration: 2000,
      });
    }
    const formData = new FormData();
    formData.append("name", values.name);

    formData.append("image", values.image.fileList[0].originFileObj);


    try {
      const res = await addCategoty(formData).unwrap();
      console.log(res);
      toast.success("Category is added successfully", {
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
