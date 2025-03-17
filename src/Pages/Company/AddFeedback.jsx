import { Button, Form, Input, Typography } from "antd";

const AddFeedback = () => {
  const { TextArea } = Input;
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-secondary-color w-full p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center ">
          <p className="text-2xl text-primary-color font-semibold">Feedback</p>
        </div>
      </div>
      <div className="md:p-10 lg:p-16 flex justify-center items-center">
        <div className="w-full">
          <Form
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full"
          >
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Title
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your Feedback Title!",
                },
              ]}
              name="title"
              className="text-white "
            >
              <Input
                placeholder="Enter your title"
                className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Description
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your Feedback Description!",
                },
              ]}
              name="description"
              className="text-white "
            >
              <TextArea
                rows={6}
                placeholder="Enter your description"
                className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded mt-8"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddFeedback;
