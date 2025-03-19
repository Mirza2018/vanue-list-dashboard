import { Button, Form, Input, Typography } from "antd";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
 
const SettingsChangePassword = () => {
  const user = JSON.parse(localStorage.getItem("home_care_user"));
  const onFinish = (values) => {
    console.log("Success:", values);
    localStorage.removeItem("home_care_user");
    window.location.reload();
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
              name="currentPassword"
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
              name="reEnterPassword"
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
                to={`/${user?.role}/settings/forgot-password`}
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
