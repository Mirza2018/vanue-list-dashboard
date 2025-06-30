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
import {
  useCreateSubscriptionMutation,
  useCreateVenueMutation,
  useGetCategoryQuery,
  useGetCustomersQuery,
} from "../../../redux/api/adminApi";
import { toast } from "sonner";
import { AllImages } from "../../../../public/images/AllImages";
import { IoCameraOutline } from "react-icons/io5";
const { Option } = Select;
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import TextArea from "antd/es/input/TextArea";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const libraries = ["places"];
const Addvenue = ({ isVenue, setIsVenue }) => {
  const [createVenue] = useCreateVenueMutation();
  const { data } = useGetCategoryQuery({ limit: 100 });
  const { data: dataUser } = useGetCustomersQuery({ limit: 100 });

  const [form] = Form.useForm();
  const { Dragger } = Upload;
  const categoryData = data?.data?.result;
  const usersData = dataUser?.data;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyATSv5h_egKxfkIHDob5a48AH2E85QrEpU",
    libraries,
  });

  const [markerPosition, setMarkerPosition] = useState(null);
  const [searchAddress, setSearchAddress] = useState("");
  console.log(searchAddress);

  const handleMapClick = (event) => {
    console.log(event);

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    form.setFieldsValue({ latitude: lat, longitude: lng });
  };

  const handleSelect = async (address) => {
    setSearchAddress(address);
    console.log(address);

    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      console.log(latLng);

      setMarkerPosition(latLng);
      form.setFieldsValue({ latitude: latLng.lat, longitude: latLng.lng });
    } catch (error) {
      console.error("Error selecting address:", error);
    }
  };

  //   console.log(dataUser);
  const normFileEvent = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      console.log(`${info.file.name} file upload failed.`);
    }
  };

  const onFinish = async (values) => {
    const toastId = toast.loading("Venue is creating...");
    const data = { ...values };
    delete data.profile;
    delete data.photos;
    delete data.menuPhotos;

    console.log("Venue:", data);
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));

    if (!values?.profile) {
      return toast.error("please selete a profile Image", {
        id: toastId,
        duration: 2000,
      });
    }
    if (!values?.photos) {
      return toast.error("Please select at least one photo.", {
        id: toastId,
        duration: 2000,
      });
    }

    const photos = values.photos || []; // Assuming images come from form values
    photos.forEach((image, index) => {
      if (image.originFileObj) {
        console.log(image.originFileObj);

        formData.append("photos", image.originFileObj);
      }
    });
    const menuPhotos = values.menuPhotos || []; // Assuming images come from form values

    menuPhotos.forEach((image, index) => {
      if (image.originFileObj) {
        console.log(image.originFileObj);

        formData.append("menuPhotos", image.originFileObj);
      }
    });

    if (values?.profile?.fileList?.[0].originFileObj) {
      const profile = values.profile.fileList[0].originFileObj;
      console.log(profile);
      formData.append("profile", profile);
    }

    try {
      const res = await createVenue(formData).unwrap();
      console.log(res);
      toast.success("Venue create Successfully", {
        id: toastId,
        duration: 2000,
      });
      form.resetFields();

      setIsVenue(false);
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
        open={isVenue}
        onCancel={() => setIsVenue(false)}
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
            <div className="mt-5 flex flex-col justify-center items-center gap-x-4">
              <Typography.Title level={4} style={{ color: "#222222" }}>
                Profile Image
              </Typography.Title>
              <div className=" relative">
                <img
                  className="h-40 w-40 relative rounded-full border border-secondary-color object-contain"
                  src={AllImages.userImage}
                  alt=""
                />
                <Form.Item name="profile">
                  <Upload
                    beforeUpload={() => false} // Prevent automatic upload to server
                    //   onChange={handleImageUpload}
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
            </div>
            <div className="flex sm:flex-row flex-col sm:gap-5">
              <div className="flex-1">
                <Typography.Title level={4} style={{ color: "#222222" }}>
                  Venue name
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
                  Email
                </Typography.Title>
                <Form.Item
                  rules={[{ required: true, message: "Please enter email" }]}
                  name="email"
                >
                  <Input
                    placeholder="Enter Plan email"
                    className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col sm:gap-5">
              <div className="flex-1">
                <Typography.Title level={4} style={{ color: "#222222" }}>
                  User
                </Typography.Title>
                <Form.Item
                  rules={[{ required: true, message: "Please select user" }]}
                  name="userId"
                >
                  <Select
                    className="sm:!h-10"
                    placeholder="Select a User"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.find.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {usersData?.map((user) => (
                      <Option
                        key={user?._id}
                        find={user?.fullName}
                        value={user?._id}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <span>{user?.fullName}</span>
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="flex-1">
                <Typography.Title level={4} style={{ color: "#222222" }}>
                  Category
                </Typography.Title>
                <Form.Item
                  rules={[{ required: true, message: "Please select user" }]}
                  name="category"
                >
                  {/* <Input
                    placeholder="select user"
                    className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
                  /> */}
                  <Select
                    className="sm:!h-10"
                    placeholder="Select a Category"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.find.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {categoryData?.map((category) => (
                      <Option
                        key={category?._id}
                        find={category?.name}
                        value={category?._id}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <span>{category?.name}</span>
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Description
            </Typography.Title>
            <Form.Item
              rules={[{ required: true, message: "Please enter description" }]}
              name="description"
            >
              <TextArea
                placeholder="Enter description"
                className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
              />
            </Form.Item>
            <div className="flex sm:flex-row flex-col sm:gap-5">
              <div className="flex-1">
                <Typography.Title level={4} style={{ color: "#222222" }}>
                  Phone
                </Typography.Title>
                <Form.Item
                  rules={[{ required: true, message: "Please enter phone" }]}
                  name="phone"
                >
                  <Input
                    placeholder="Enter phone number"
                    className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
                  />
                </Form.Item>
              </div>
              <div className="flex-1">
                <Typography.Title level={4} style={{ color: "#222222" }}>
                  Country
                </Typography.Title>
                <Form.Item
                  rules={[{ required: true, message: "Please enter country" }]}
                  name="country"
                >
                  <Input
                    placeholder="Enter Plan country"
                    className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col sm:gap-5">
              <div className="flex-1">
                <Typography.Title level={4} style={{ color: "#222222" }}>
                  City Town
                </Typography.Title>
                <Form.Item
                  rules={[{ required: true, message: "Please enter cityTown" }]}
                  name="cityTown"
                >
                  <Input
                    placeholder="Enter cityTown"
                    className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
                  />
                </Form.Item>
              </div>
              <div className="flex-1">
                <Typography.Title level={4} style={{ color: "#222222" }}>
                  Postal Address
                </Typography.Title>
                <Form.Item
                  rules={[
                    { required: true, message: "Please enter postalAddress" },
                  ]}
                  name="postalAddress"
                >
                  <Input
                    placeholder="Enter postalAddress"
                    className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
                  />
                </Form.Item>
              </div>
            </div>

            <div>
              <Typography.Title level={4} style={{ color: "#222222" }}>
                Search Location
              </Typography.Title>
              <Form.Item>
                <PlacesAutocomplete
                  value={searchAddress}
                  onChange={setSearchAddress}
                  onSelect={handleSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <Input
                        {...getInputProps({
                          placeholder: "Search for a location",
                        })}
                      />
                      <div
                        style={{
                          position: "absolute",
                          zIndex: 1000,
                          background: "white",
                          width: "100%",
                        }}
                      >
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => (
                          <div
                            {...getSuggestionItemProps(suggestion)}
                            style={{
                              padding: "10px",
                              cursor: "pointer",
                              background: suggestion.active
                                ? "#f0f0f0"
                                : "#fff",
                            }}
                            key={suggestion.placeId}
                          >
                            {suggestion.description}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </Form.Item>

              {isLoaded && (
                <Form.Item label="Map">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={markerPosition || center}
                    zoom={13}
                    onClick={handleMapClick}
                  >
                    {markerPosition && <Marker position={markerPosition} />}
                  </GoogleMap>
                </Form.Item>
              )}

              <Form.Item
                label="Latitude"
                name="latitude"
                rules={[
                  { required: true, message: "Please select a location" },
                ]}
              >
                <Input readOnly />
              </Form.Item>

              <Form.Item
                label="Longitude"
                name="longitude"
                rules={[
                  { required: true, message: "Please select a location" },
                ]}
              >
                <Input readOnly />
              </Form.Item>
            </div>
            <div className="flex sm:flex-row flex-col sm:gap-5">
              <div className="flex-1">
                <Typography.Title level={4} style={{ color: "#222222" }}>
                  WebsiteUrl
                </Typography.Title>
                <Form.Item
                  rules={[
                    { required: true, message: "Please enter websiteUrl" },
                  ]}
                  name="websiteUrl"
                >
                  <Input
                    placeholder="Enter Plan websiteUrl"
                    className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
                  />
                </Form.Item>
              </div>
            </div>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Photos
            </Typography.Title>
            <Form.Item
              name="photos"
              valuePropName="fileList"
              getValueFromEvent={normFileEvent}
              noStyle
            >
              <Upload.Dragger
                multiple="true"
                // onChange={handleUploadChange}
                name="files"
                maxCount={10}
                // action="/upload.do"
              >
                {/* <p className="flex justify-center items-center">
                  <img
                    src={AllImages?.}
                    width={48}
                    height={48}
                    alt="Drag and Drop Icon"
                  />
                </p> */}
                <p className="ant-upload-text">
                  Drag and drop up to 10 image here
                </p>
                <p className="ant-upload-text">or click to upload.</p>
              </Upload.Dragger>
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Menu Photos (Optional)
            </Typography.Title>
            <Form.Item
              name="menuPhotos"
              valuePropName="fileList"
              getValueFromEvent={normFileEvent}
              noStyle
            >
              <Upload.Dragger
                multiple="true"
                // onChange={handleUploadChange}
                name="files"
                maxCount={5}
                // action="/upload.do"
              >
                {/* <p className="flex justify-center items-center">
                  <img
                    src={AllImages?.}
                    width={48}
                    height={48}
                    alt="Drag and Drop Icon"
                  />
                </p> */}
                <p className="ant-upload-text">
                  Drag and drop up to 5 image here
                </p>
                <p className="ant-upload-text">or click to upload.</p>
              </Upload.Dragger>
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

export default Addvenue;
