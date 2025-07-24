/* eslint-disable react/prop-types */
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Select,
  Typography,
  Upload,
} from "antd";
import { toast } from "sonner";
import { useAddCustomersMutation } from "../../../redux/api/adminApi";
const { Option } = Select;
const AddVisitor = ({ isAddCompanyModalVisible, handleCancel }) => {
  const [addCustomers] = useAddCustomersMutation();
  const [form] = Form.useForm();
  const { Dragger } = Upload;

  const onFinish = async (values) => {
    const toastId = toast.loading("Creating vistor...");
    console.log(values);

    try {
      const res = await addCustomers(values).unwrap();
      console.log(res);
      toast.success("Visitor create successfully", {
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
          <h1 className="text-3xl font-bold">Add Visitoe</h1>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full text-start"
          >
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Name
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter fullName",
                },
              ]}
              name="fullName"
              className="text-white "
            >
              <Input
                type="text"
                placeholder="Enter your  name"
                className="py-2 px-3 text-xl border  ! !bg-transparent"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Email
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter email",
                },
              ]}
              name="email"
              className="text-white "
            >
              <Input
                type="text"
                placeholder="Enter Email"
                className="py-2 px-3 text-xl border  ! !bg-transparent"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Gender
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter gender",
                },
              ]}
              name="gender"
              className="text-white "
            >
              {/* <Input
                type="text"
                placeholder="Enter gender "
                className="py-2 px-3 text-xl border  ! !bg-transparent"
              /> */}
              <Select placeholder="Selete gender">
                <Option value="male">Male</Option>
                <Option value="female">female</Option>
                <Option value="others">others</Option>
              </Select>
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Address
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter address",
                },
              ]}
              name="address"
              className="text-white "
            >
              <Input
                type="text"
                placeholder="Enter address "
                className="py-2 px-3 text-xl border  ! !bg-transparent"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Password
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Password is Required",
                },
              ]}
              name="password"
              className=""
            >
              <Input.Password
                placeholder="Enter your password"
                className="py-2 px-3 text-xl bg-site-color border !border-secondary-color "
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

export default AddVisitor;
