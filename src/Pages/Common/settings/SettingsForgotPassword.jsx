import { Button, Form, Input, Typography } from "antd";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SettingsForgotPassword = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("home_care_user"));
  const onFinish = (values) => {
    console.log("Success:", values);
    navigate(`/${user.role}/settings/otp-page`);
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
            Forget Password
          </p>
        </div>
      </div>
      <div className="md:p-14 lg:p-20 flex justify-center items-center">
        <div className="w-full">
          <div className="mb-10">
            <p className="text-3xl lg:text-[36px]  font-medium mb-8">
              Forgot Password
            </p>
            <p className="md:text-lg lg:text-xl ">
              Enter your email address to get a verification code for resetting
              your password.
            </p>
          </div>
          <Form
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full"
          >
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Email
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Email is Required",
                },
              ]}
              name="email"
              className=" "
            >
              <Input
                placeholder="Enter your mail"
                className="py-2 px-3 text-xl border !border-input-color  !bg-transparent"
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded mt-8"
                htmlType="submit"
              >
                Send OTP
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SettingsForgotPassword;
