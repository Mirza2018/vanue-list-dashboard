/* eslint-disable no-unused-vars */
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Spin,
  Typography,
  Upload,
} from "antd";
import profileImage from "/images/profileImage.png";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { MdOutlineEdit } from "react-icons/md";
import { IoCameraOutline, IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import {
  useGetProfileQuery,
  useProfileUpdateMutation,
} from "../../redux/api/profileApi";
import { toast } from "sonner";

const EditProfile = () => {
  const navigate = useNavigate();
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useGetProfileQuery();
  const [updateProfile] = useProfileUpdateMutation();
  const displayedData = data ?? currentData;
  console.log(displayedData);
  const [imageUrl, setImageUrl] = useState(profileImage);
  useEffect(() => {
    setImageUrl(displayedData?.data?.profileImage);
  }, [displayedData?.data]);
  const handleImageUpload = (info) => {
    if (info.file.status === "removed") {
      setImageUrl(profileImage); // Reset to null or fallback image
    } else {
      const file = info.file.originFileObj || info.file; // Handle the file object safely
      if (file) {
        setImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };
  const dobDate = new Date(displayedData?.data?.dateOfBirth).toDateString();
  const onFinish = async (values) => {
    const toastId = toast.loading("Updateing user profile...");

    const data = { ...values };

    delete data.image;
    console.log(data);

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (values?.image?.fileList?.[0].originFileObj) {
      const profileImage = values.image.fileList[0].originFileObj;

      console.log(profileImage);
      formData.append("image", profileImage);
    }
    // return;
    try {
      const res = await updateProfile(formData).unwrap();
      console.log(res);
      toast.success("Update user profile successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate("/admin/profile");
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
  if (isLoading)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (!isLoading && isFetching)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (isSuccess && displayedData)
    return (
      <div
        className="bg-highlight-color min-h-[90vh]  rounded-xl"
        style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
      >
        <div className=" w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div>
            <button
              onClick={() => window.history.back()}
              className=" w-[95%] mx-auto  flex items-center "
            >
              <IoChevronBackOutline className="text-4xl cursor-pointer  font-semibold" />
              <p className="text-3xl text-black font-semibold">Edit Profile</p>
            </button>
          </div>
        </div>
        <div className=" ">
          <Form
            initialValues={displayedData?.data}
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent py-10  h-full w-full p-10"
          >
            <div className=" rounded-lg h-full w-full md:grid grid-cols-3">
              <div className="mt-5 flex flex-col justify-center items-center gap-x-4">
                <div className=" relative">
                  <img
                    className="h-40 w-40 relative rounded-full border border-secondary-color object-contain"
                    src={imageUrl}
                    alt=""
                  />
                  <Form.Item name="image">
                    <Upload
                      beforeUpload={() => false} // Prevent automatic upload to server
                      onChange={handleImageUpload}
                      maxCount={1}
                      accept="image/*"
                      className="absolute -top-10 !right-3 text-end noText"
                      style={{
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        cursor: "pointer",
                      }}
                    >
                      <Button
                        style={{
                          zIndex: 1,
                        }}
                        className="bg-white p-2 w-fit h-fit rounded-full shadow !border-none"
                      >
                        <IoCameraOutline
                          className="w-5 h-5"
                          style={{ color: "#19363D" }}
                        />
                      </Button>
                    </Upload>
                  </Form.Item>
                </div>
                <p className="text-center text-2xl font-medium">Admin</p>
                <p className="text-3xl font-medium">
                  {displayedData?.data?.fullName}
                </p>
              </div>

              <div className=" col-span-2 text-white mt-5">
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  Name
                </Typography.Title>
                <Form.Item name="fullName" className="text-white ">
                  <Input
                    suffix={<MdOutlineEdit />}
                    type="text"
                    placeholder="Enter your first name"
                    className="py-2 px-3 text-xl border  ! !bg-transparent"
                  />
                </Form.Item>

                {/* <Typography.Title level={5} style={{ color: "#222222" }}>
                Email
              </Typography.Title>
              <Form.Item
                initialValue={profileData.email}
                name="email"
                className="text-white "
              >
                <Input
                  suffix={<MdOutlineEdit />}
                  type="email"
                  placeholder="Enter your email"
                  className="py-2 px-3 text-xl border  ! !bg-transparent"
                />
              </Form.Item> */}
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  Contact number
                </Typography.Title>

                <Form.Item name="phone" className="text-white">
                  <PhoneInput className="" enableSearch={true} />
                </Form.Item>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  Address
                </Typography.Title>
                <Form.Item name="country" className="text-white">
                  <Input
                    suffix={<MdOutlineEdit />}
                    placeholder="Enter Address"
                    className="py-2 px-3 text-xl border  ! !bg-transparent"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
                    htmlType="submit"
                  >
                    Save & Change
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
};
export default EditProfile;
