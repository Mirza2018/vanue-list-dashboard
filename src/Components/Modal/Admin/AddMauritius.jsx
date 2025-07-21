/* eslint-disable react/prop-types */
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Select,
  Typography,
  Upload,
} from "antd";
import { FiUpload } from "react-icons/fi";
import {
  useCreateMauritiusMutation,
  useCreateRecommentMutation,
  useGetVenueQuery,
} from "../../../redux/api/adminApi";
import { toast } from "sonner";
const { Option } = Select;
const AddMauritius = ({ isAddCompanyModalVisible, handleCancel }) => {
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useGetVenueQuery();
  const displayedData = data ?? currentData;
  const [addMauritius] = useCreateMauritiusMutation();
  const [form] = Form.useForm();
  const { Dragger } = Upload;

  const normFileEvent = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const onFinish = async (values) => {
    const toastId = toast.loading("Discover Mauritius is adding...");
    console.log(values);

    if (!values?.thumbnailImage[0]?.originFileObj) {
      return toast.error("Please select an image", {
        id: toastId,
        duration: 2000,
      });
    }
    if (
      !values?.video?.fileList?.length ||
      !values?.video?.fileList[0]?.originFileObj
    ) {
      return toast.error("Please select an video", {
        id: toastId,
        duration: 2000,
      });
    }

    if (!values?.venueId) {
      return toast.error("Please selete a venue", {
        id: toastId,
        duration: 2000,
      });
    }

    const data = { venueId: values.venueId };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    formData.append("thumbnailImage", values?.thumbnailImage[0]?.originFileObj);
    formData.append("video", values.video.fileList[0].originFileObj);

    try {
      const res = await addMauritius(formData).unwrap();
      console.log(res);
      toast.success("Discover Mauritius is added successfully", {
        id: toastId,
        duration: 2000,
      });
      handleCancel();
      form.resetFields();
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
        open={isAddCompanyModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        style={{ textAlign: "center" }}
        className="lg:!w-[500px]"
      >
        <div className="p-10">
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full text-start"
          >
            <Typography.Title level={4} style={{ color: "#222222" }}>
              venue
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please selete venue",
                },
              ]}
              name="venueId"
              className=" "
            >
              <Select
                className="sm:!h-10"
                placeholder="Select a venue"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.find.toLowerCase().includes(input.toLowerCase())
                }
              >
                {displayedData?.data?.map((data) => (
                  <Option key={data?._id} find={data?.name} value={data?._id}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span>{data?.name}</span>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Thumbnail Image
            </Typography.Title>
            <Form.Item
              name="thumbnailImage"
              valuePropName="fileList"
              getValueFromEvent={normFileEvent}
              noStyle
            >
              <Upload.Dragger
                multiple="true"
                // onChange={handleUploadChange}
                name="files"
                maxCount={1}
                // action="/upload.do"
              >
                <div className="flex flex-col justify-center items-center text-black">
                  <p className="ant-upload-drag-icon">
                    <FiUpload className="text-4xl" />
                  </p>
                  <p className="ant-upload-text">Upload Thumbnail Image</p>
                </div>
              </Upload.Dragger>
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              video
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Upload video",
                },
              ]}
              name="video"
              className=" w-full"
            >
              <Dragger maxCount={1} accept="video/*" name="file">
                <div className="flex flex-col justify-center items-center text-black">
                  <p className="ant-upload-drag-icon">
                    <FiUpload className="text-4xl" />
                  </p>
                  <p className="ant-upload-text">Upload video</p>
                </div>
              </Dragger>
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded mt-3"
                htmlType="submit"
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AddMauritius;
