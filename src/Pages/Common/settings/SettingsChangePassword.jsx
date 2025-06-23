import { Button, Form, Input, Typography } from "antd";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../../redux/api/authApi";
import { toast } from "sonner";
const SettingsChangePassword = () => {
  const [changePass] = useChangePasswordMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    const data = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    const toastId = toast.loading("Password is changing...");

    try {
      const res = await changePass(data).unwrap();
      console.log(res);
      toast.success(res?.message || "Password is change successfully", {
        id: toastId,
        duration: 2000,
      });
      form.resetFields();
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || "There is an problem changeing problem",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };
  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-secondary-color text-white w-full p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center ">
          <p className="text-2xl  font-semibold flex ">
            <IoChevronBackOutline
              className="text-4xl cursor-pointer  font-semibold"
              onClick={() => window.history.back()}
            />
            Change Password
          </p>
        </div>
      </div>
      <div className="md:p-14 lg:p-20 flex justify-center items-center">
        <div className="w-full">
          <Form
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full"
          >
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Current password
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your current password!",
                },
              ]}
              name="oldPassword"
              className="text-white "
            >
              <Input.Password
                placeholder="Enter your password"
                className="py-2 px-3 text-xl border !border-input-color  !bg-transparent"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#222222" }}>
              New password
            </Typography.Title>
            <Form.Item
              rules={[
                { required: true, message: "Please enter your new password!" },
              ]}
              name="newPassword"
              className="text-white"
            >
              <Input.Password
                placeholder="Enter your password"
                className="py-2 px-3 text-xl border !border-input-color  !bg-transparent"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Re-enter new Password
            </Typography.Title>
            <Form.Item
              name="confirmPassword"
              className="text-white"
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="py-2 px-3 text-xl border !border-input-color  !bg-transparent"
              />
            </Form.Item>
            <div className=" text-end">
              <Link
                to={`/admin/settings/forgot-password`}
                className="!text-secondary-color text-lg !underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Form.Item>
              <Button
                className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded mt-8"
                htmlType="submit"
              >
                Change password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SettingsChangePassword;
