/* eslint-disable react/prop-types */
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Typography,
  Upload,
} from "antd";
import { FiUpload } from "react-icons/fi";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useCreateSubscriptionMutation } from "../../../redux/api/adminApi";
import { toast } from "sonner";
import TextArea from "antd/es/input/TextArea";

const AddSubscribetionModal = ({ isAddSubscription, setIsAddSubscription }) => {
  const [createSubscription] = useCreateSubscriptionMutation();
  const [form] = Form.useForm();
  const { Dragger } = Upload;
  const [facilities, setFacilities] = useState([""]); // Array to store facility inputs

  const addFacilityInput = () => {
    setFacilities([...facilities, ""]);
  };

  const handleFacilityChange = (index, value) => {
    const newFacilities = [...facilities];
    newFacilities[index] = value;
    setFacilities(newFacilities);
  };

  const onFinish = async (values) => {
    const toastId = toast.loading("Subscription is creating...");
    const data = {
      name: values.name,
      price: values.price,
      duration: values.duration,
      type: values.type,
      durationType: values.durationType,
      features: facilities,
    };

    console.log("subscription:", data);

    try {
      const res = await createSubscription(data).unwrap();
      console.log(res);
      toast.success("Subscription create Successfully", {
        id: toastId,
        duration: 2000,
      });
      form.resetFields();
      setFacilities([""]);
      setIsAddSubscription(false);
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
        open={isAddSubscription}
        onCancel={() => setIsAddSubscription(false)}
        footer={[]}
        centered
        style={{ textAlign: "center" }}
        className="lg:!w-[700px]"
      >
        <div className="p-10">
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full text-start"
          >
            <div className="flex sm:flex-row flex-col sm:gap-5">
              <div className="flex-1">
                <Typography.Title level={4} style={{ color: "#222222" }}>
                  Plan Name
                </Typography.Title>
                <Form.Item
                  rules={[
                    { required: true, message: "Please enter Plan Name" },
                  ]}
                  name="name"
                >
                  <Input
                    placeholder="Enter Plan Name"
                    className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
                  />
                </Form.Item>
              </div>
              <div className="flex-1">
                <Typography.Title level={4} style={{ color: "#222222" }}>
                  Plan Price
                </Typography.Title>
                <Form.Item
                  rules={[
                    { required: true, message: "Please enter Plan Price" },
                  ]}
                  name="price"
                >
                  <InputNumber
                    controls={false}
                    placeholder="Enter Plan Price"
                    className="px-3 text-xl border !border-input-color !bg-transparent w-full"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col sm:gap-5">
              <div className="flex-1">
                <Typography.Title
                  className="whitespace-nowrap"
                  level={4}
                  style={{ color: "#222222" }}
                >
                  Plan Duration Type
                </Typography.Title>
                <Form.Item
                  rules={[
                    { required: true, message: "Please enter Plan duration " },
                  ]}
                  name="durationType"
                >
                  {/* <Input
                    placeholder="Enter Plan duration in months"
                    className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
                  /> */}
                  <Select
                    placeholder="Plan type"
                    className="text-xl "
                    options={[
                      { value: "Each", label: "Each" },
                      { value: "Video", label: "Video" },
                      { value: "Day", label: "Day" },
                      { value: "Week", label: "Week" },
                      { value: "Month", label: "Month" },
                      { value: "Year", label: "Year" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex-1">
                <Typography.Title level={4} style={{ color: "#222222" }}>
                  Plan Duration
                </Typography.Title>
                <Form.Item
                  rules={[
                    { required: true, message: "Please enter Plan duration " },
                  ]}
                  name="duration"
                >
                  <InputNumber
                    controls={false}
                    placeholder="Enter Plan duration in months"
                    className="w-full px-3 text-xl border !border-input-color !bg-transparent"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col sm:gap-5">
              <div className="flex-1">
                <Typography.Title
                  className="whitespace-nowrap"
                  level={4}
                  style={{ color: "#222222" }}
                >
                  Plan Type
                </Typography.Title>
                <Form.Item
                  rules={[
                    { required: true, message: "Please enter Plan type " },
                  ]}
                  name="type"
                >
                  <Select
                    placeholder="Plan type"
                    className="text-xl "
                    options={[
                      {
                        value: "essentialVisibility",
                        label: "essentialVisibility",
                      },
                      { value: "starterDiscovery", label: "starterDiscovery" },
                      { value: "enhancedPresence", label: "enhancedPresence" },
                      { value: "premiumPartner", label: "premiumPartner" },
                      { value: "premiumPlus", label: "premiumPlus" },
                      { value: "smartExpansion", label: "smartExpansion" },
                      { value: "smartCorporate", label: "smartCorporate" },
                      {
                        value: "corporatePrestige",
                        label: "corporatePrestige",
                      },
                      { value: "pushNotification", label: "pushNotification" },
                      {
                        value: "promoVideoOnProfile",
                        label: "promoVideoOnProfile",
                      },
                      { value: "homepageVideo", label: "homepageVideo" },
                      {
                        value: "featuredTodayBanner",
                        label: "featuredTodayBanner",
                      },
                      {
                        value: "top5OfTheWeekBadge",
                        label: "top5OfTheWeekBadge",
                      },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Facilities
            </Typography.Title>
            {facilities.map((facility, index) => (
              <Form.Item
                key={index}
                name={`facility-${index}`}
                rules={[{ required: true, message: "Please enter a facility" }]}
              >
                <Input
                  placeholder="Enter Plan Facility"
                  value={facility}
                  onChange={(e) => handleFacilityChange(index, e.target.value)}
                  className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
                />
              </Form.Item>
            ))}
            <Button
              type="dashed"
              onClick={addFacilityInput}
              icon={<PlusOutlined />}
              className="w-full mb-4"
            >
              Add another Facility
            </Button>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Description
            </Typography.Title>
            <Form.Item
              rules={[{ required: true, message: "Please enter  Description" }]}
              name="lastDescription"
            >
              <TextArea
                placeholder="Enter  Description"
                className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded mt-3"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AddSubscribetionModal;
