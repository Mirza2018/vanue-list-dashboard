import { Button, Form } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { AuthImages } from "../../../public/images/AllImages";

const OtpPage = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handleOTPSubmit = () => {
    console.log("OTP:", otp);
    navigate("/update-password");
  };

  return (
    <div className="">
      <div className="max-w-[1350px] w-[90%] mx-auto flex flex-col lg:flex-row justify-center gap-10 items-center min-h-screen bg-site-color py-10">
        <div className="w-full md:w-[80%] lg:w-[50%] flex justify-center items-center">
          <img
            src={AuthImages.otp}
            alt="forgot_Password_Img"
            className="h-[280px] w-[320px] md:h-[340px] md:w-[380px] lg:h-[480px] lg:w-[520px]"
          />
        </div>
        <div className="h-[80vh] w-[2px] bg-[#19363D] hidden lg:block"></div>
        <div className="w-full md:w-[80%] lg:w-[50%] ">
          <div className="">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
                Verify OTP
              </h1>
              <p className="md:text-lg lg:text-xl mb-2 ">
                Please check your email. We have sent a code to contact
                @gmail.com
              </p>
            </div>

            <Form layout="vertical" className="bg-transparent w-full">
              <Form.Item className="">
                <div className="flex justify-center items-center">
                  <OTPInput
                    inputStyle="!w-[55px] h-[45px] !sm:w-[76px] sm:h-[64px] text-[20px] sm:text-[30px] bg-transparent border border-input-color
                      hover:border-input-color focus:bg-transparent focus:border-input-color rounded-lg mr-[10px] sm:mr-[20px] "
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>
              <div className="flex justify-between py-1">
                <p>Didn’t receive code?</p>
                <Link
                  href="/otp-verification"
                  className="!text-[#19363D] !underline font-semibold"
                >
                  Resend
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-6 border border-secondary-color hover:border-secondary-color text-xl text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
                  onClick={handleOTPSubmit}
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
export default OtpPage;
