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
  useGetVenueQuery,
  useUpdateMauritiusMutation,
} from "../../../redux/api/adminApi";
import { toast } from "sonner";
import { useEffect } from "react";
const { Option } = Select;
const EditMauritius = ({
  isAddCompanyModalVisible,
  handleCancel,
  currentCompanyRecord,
}) => {
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useGetVenueQuery();
  const displayedData = data ?? currentData;
  const [UpdateMauritius] = useUpdateMauritiusMutation();
  const [form] = Form.useForm();
  const { Dragger } = Upload;

  useEffect(() => {
    if (currentCompanyRecord) {
      form.setFieldsValue({
        venueId: currentCompanyRecord?.venueId?.name,
      });
    }
  }, [currentCompanyRecord, form]);

  console.log(currentCompanyRecord);

  const normFileEvent = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const onFinish = async (values) => {
    const toastId = toast.loading("Discover Mauritius is updateing...");
    console.log(values);
    const formData = new FormData();
    if (
      Array.isArray(values?.thumbnailImage) &&
      values.thumbnailImage.length > 0 &&
      values.thumbnailImage[0]?.originFileObj
    ) {
      formData.append("thumbnailImage", values.thumbnailImage[0].originFileObj);
      console.log(2);
    } else {
      formData.append("thumbnailImage", currentCompanyRecord?.thumbnailImage);
      console.log(1);
    }

    if (
      !values?.video?.fileList?.length ||
      !values?.video?.fileList[0]?.originFileObj
    ) {
      formData.append("video", currentCompanyRecord?.videoUrl);
    } else {
      formData.append("video", values.video.fileList[0].originFileObj);
    }

    let data;
    if (!values?.venueId) {
      data = currentCompanyRecord?.venueId?._id;
    } else {
      data = { venueId: values.venueId };
    }

    formData.append("data", JSON.stringify(data));


    try {
      const res = await UpdateMauritius({
        formData: formData,
        id: currentCompanyRecord?._id,
      }).unwrap();
      console.log(res);
      toast.success("Discover Mauritius is update successfully", {
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
            <Form.Item name="venueId" className=" ">
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
            <Form.Item name="video" className=" w-full">
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

export default EditMauritius;
