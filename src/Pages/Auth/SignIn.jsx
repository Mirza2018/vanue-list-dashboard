import { Link, useNavigate } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { Button, Checkbox, Form, Input, Select, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Password from "antd/es/input/Password";
import { useUserLoginMutation } from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { setAccessToken, setUserInfo } from "../../redux/slices/authSlice";

const SignIn = () => {
  const [userLogin] = useUserLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook for navigation
  const cookies = new Cookies();
  const onFinish = async (values) => {
    const toastId = toast.loading(" Logging in...");
    console.log("tiktok_voteing:", values);

    try {
      const res = await userLogin(values).unwrap();
      const decodeToken = jwtDecode(res?.data?.accessToken);

      dispatch(setAccessToken(res?.data?.accessToken));
      dispatch(setUserInfo(decodeToken));
      console.log("res: ", res, decodeToken);
      cookies.set("tiktok_voteing_accessToken", res?.data?.accessToken);
      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error); // Log the error for debugging

      toast.error(
        error?.data?.message ||
          error?.error ||
          "An error occurred during Login",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }

    return;
  };
  return (
    <div className="">
      <div className="max-w-[1350px] w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-10 min-h-screen py-10">
        <div className="">
          <img src={AllImages.logo} alt="logo" className=" mx-auto w-96" />
        </div>
        <div className="w-full md:w-[80%] lg:w-full mx-auto">
          {/* -------- Sign In Page Header ------------ */}
          <div className="flex flex-col justify-center items-center">
            <div className="text-center mt-5 mb-8">
              <h1 className="text-3xl sm:text-4xl font-medium mb-4">
                Login to Account!
              </h1>
              <p className="text-lg sm:text-xl mb-2 ">
                Please enter your email and password to continue.
              </p>
            </div>
          </div>
          {/* -------- Form Start ------------ */}

          <Form
            layout="vertical"
            className="bg-transparent w-full"
            onFinish={onFinish}
          >
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Email
            </Typography.Title>
            <Form.Item
              name="email"
              className=""
              rules={[
                {
                  required: true,
                  message: "Email is Required",
                },
              ]}
            >
              <Input
                placeholder="Enter your email"
                className="py-2 px-3 text-xl bg-site-color border !border-secondary-color "
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
        
            <div className="flex justify-between items-center mt-10">
              <Checkbox className="">Remember me</Checkbox>
              <Link
                to="/forgot-password"
                className="!text-secondary-color !underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                className="w-full py-6 border border-secondary-color hover:border-secondary-color text-xl text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
                htmlType="submit"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
