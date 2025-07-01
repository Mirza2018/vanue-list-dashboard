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
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useUpdateSubscriptionMutation } from "../../../redux/api/adminApi";
import { toast } from "sonner";

const EditSubscribtion = ({
  isAddSubscription,
  setIsAddSubscription,
  plan,
}) => {
  const [editSubscription] = useUpdateSubscriptionMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (plan) {
      form.setFieldsValue({
        name: plan.name,
        price: plan.price,
        duration: plan.duration,
        type: plan.type,
        durationType: plan.durationType,
        facilities: plan.features || [""], // Ensure at least one empty facility
      });
    }
  }, [plan, form]);

  const onFinish = async (values) => {
    const toastId = toast.loading("Subscription is editing...");
    const data = {
      name: values.name,
      price: values.price,
      duration: values.duration,
      type: values.type,
      durationType: values.durationType,
      features: values.facilities.filter((f) => f), // Remove empty strings
    };

    console.log(data);

    //   return
    try {
      const res = await editSubscription({
        data: data,
        id: plan?._id,
      }).unwrap();
      toast.success("Subscription edited successfully", {
        id: toastId,
        duration: 2000,
      });
      form.resetFields();
      setIsAddSubscription(false);
    } catch (error) {
      toast.error(
        error?.data?.message || "There was a problem, please try later",
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
            <Form.List
              name="facilities"
              rules={[
                {
                  validator: async (_, facilities) => {
                    if (!facilities || facilities.length < 1) {
                      return Promise.reject(
                        new Error("At least one facility is required")
                      );
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="flex items-center gap-2">
                      <Form.Item
                        {...restField}
                        name={name}
                        rules={[
                          {
                            required: true,
                            message: "Please enter a facility",
                          },
                        ]}
                        className="flex-1"
                      >
                        <Input
                          placeholder="Enter Plan Facility"
                          className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
                        />
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button
                          type="text"
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                          className="text-red-500"
                        />
                      )}
                    </div>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    className="w-full mb-4"
                  >
                    Add another Facility
                  </Button>
                </>
              )}
            </Form.List>

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

export default EditSubscribtion;
