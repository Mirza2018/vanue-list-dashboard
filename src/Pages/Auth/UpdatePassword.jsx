import { Button, Form, Input, Typography } from "antd";

import { useNavigate } from "react-router-dom";
import { AuthImages } from "../../../public/images/AllImages";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/signin");
  };

  return (
    <div className="container w-[90%] mx-auto flex flex-col lg:flex-row justify-center gap-20 items-center min-h-screen  py-20">
      <div className="">
        <img
          src={AuthImages.updatePass}
          alt="logo"
          className="h-[520px] w-[520px]"
        />
      </div>
      <div className="h-[80vh] w-[2px] bg-[#19363D] hidden lg:block"></div>
      <div className="w-full md:w-[80%] lg:w-[50%]">
        {/* -------- update Password Page Header ------------ */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-medium mb-4">
            Set new password
          </h1>
        </div>
        {/* -------- Form Start ------------ */}
        <Form
          layout="vertical"
          className="bg-transparent w-full"
          onFinish={onFinish}
        >
          <Typography.Title level={4} style={{ color: "#222222" }}>
            Password
          </Typography.Title>
          <Form.Item
            rules={[
              {
                required: true,
                message: "New Password is Required",
              },
            ]}
            name="password"
            className=""
          >
            <Input.Password
              placeholder="Enter new password"
              className="py-2 px-3 text-xl bg-site-color border !border-input-color  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
            />
          </Form.Item>
          <Typography.Title level={4} style={{ color: "#222222" }}>
            Confirm Password
          </Typography.Title>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
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
            className=""
          >
            <Input.Password
              placeholder="Enter your password"
              className="py-2 px-3 text-xl bg-site-color border !border-input-color  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="w-full py-6 border border-secondary-color hover:border-secondary-color text-xl text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
              htmlType="submit"
            >
              Change password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default UpdatePassword;
