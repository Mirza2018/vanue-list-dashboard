import { Button, Form, Input, Typography } from "antd";
import { IoChevronBackOutline } from "react-icons/io5";

const SettingsUpdatePassword = () => {
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
      <div className="bg-secondary-color w-full p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center ">
          <IoChevronBackOutline
            className="text-4xl cursor-pointer text-primary-color font-semibold"
            onClick={() => window.history.back()}
          />
          <p className="text-2xl text-primary-color font-semibold">
            Update Password
          </p>
        </div>
      </div>
      <div className="md:p-14 lg:p-20 flex justify-center items-center">
        <div className="w-full ">
          <div className="mb-10">
            <p className="text-3xl lg:text-[40px]  font-medium mb-8">
              Update Password
            </p>
            <p className="md:text-xl ">
              To update your password, check email for OTP being sent. Enter it
              in designated field to complete reset process.
            </p>
          </div>
          <Form
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full"
          >
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
                className="py-2 px-3 text-xl border !border-input-color ! !bg-transparent"
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
                className="py-2 px-3 text-xl border !border-input-color ! !bg-transparent"
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded mt-8"
                htmlType="submit"
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SettingsUpdatePassword;
