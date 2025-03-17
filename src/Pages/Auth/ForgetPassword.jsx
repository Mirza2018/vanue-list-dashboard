import { Button, Form, Input } from "antd";

import { useNavigate } from "react-router-dom";
import { AuthImages } from "../../../public/images/AllImages";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/verify-otp");
  };
  return (
    <div className="">
      <div className="max-w-[1350px] w-[90%] mx-auto flex flex-col lg:flex-row justify-center gap-10 items-center min-h-screen bg-site-color py-10">
        <div className="w-full md:w-[80%] lg:w-[50%] flex justify-center items-center">
          <img
            src={AuthImages.ForgotPassword}
            alt="forgot_Password_Img"
            width={0}
            height={0}
            sizes="100vw"
            className="h-[320px] w-[320px] md:h-[380px] md:w-[380px] lg:h-[520px] lg:w-[520px]"
          />
        </div>
        <div className="h-[80vh] w-[2px] bg-[#19363D] hidden lg:block"></div>
        <div className="w-full md:w-[80%] lg:w-[50%]">
          <div className="">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
                Forget password
              </h1>
              <p className="md:text-lg lg:text-xl mb-2 ">
                Enter your email address to get a verification code for
                resetting your password.
              </p>
            </div>

            <Form
              layout="vertical"
              className="bg-transparent w-full"
              onFinish={onFinish}
            >
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Email is Required",
                  },
                ]}
                name="email"
                className=""
              >
                <Input
                  placeholder="Enter your email"
                  type="email"
                  className="py-2 px-3 text-xl bg-site-color border !border-input-color  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-6 border border-secondary-color hover:border-secondary-color text-xl text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
                  htmlType="submit"
                >
                  Get OTP
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
