/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal, Select, Typography, Upload } from "antd";
import { toast } from "sonner";
import {
  useEditVenueMutation,
  useGetCategoryQuery,
  useGetUnCreatedCustomersQuery,
} from "../../../redux/api/adminApi";
import { useEffect, useState } from "react";
import { AllImages } from "../../../../public/images/AllImages";
import { IoCameraOutline } from "react-icons/io5";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
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

const containerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const libraries = ["places"];

const EditVenueModal = ({
  isVenueEditModalVisible,
  handleCancel,
  currentVenueRecord,
}) => {
  const { data } = useGetCategoryQuery({ limit: 100 });
  const { data: dataUser } = useGetUnCreatedCustomersQuery({ limit: 100 });
  const usersData = dataUser?.data;
  const categoryData = data?.data?.result;
  const [isShopping, setIsShopping] = useState(null);
  const [editVenue] = useEditVenueMutation();
  const [form] = Form.useForm();

  // Only state for profile image preview (synced from form)
  const [profileImage, setProfileImage] = useState(AllImages.userImage);

  // State for map
  const [markerPosition, setMarkerPosition] = useState(null);
  const [searchAddress, setSearchAddress] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAicZRwkffHVARNs1m6LKk_5lsA2LYAb6U",
    libraries,
  });

  useEffect(() => {
    if (currentVenueRecord) {
      // Map existing images to fileList format for form initialization
      const initialProfileFileList = currentVenueRecord?.profileImage
        ? [
            {
              uid: "-1",
              name: "profile.jpg",
              status: "done",
              url: currentVenueRecord.profileImage,
            },
          ]
        : [];
      const initialPhotosFileList =
        currentVenueRecord?.photos?.map((url, index) => ({
          uid: `photo-${index}`,
          name: `photo-${index}.jpg`,
          status: "done",
          url,
        })) || [];
      const initialMenuPhotosFileList =
        currentVenueRecord?.menuPhotos?.map((url, index) => ({
          uid: `menu-${index}`,
          name: `menu-${index}.jpg`,
          status: "done",
          url,
        })) || [];

      // Set all form fields (including fileLists)
      form.setFieldsValue({
        name: currentVenueRecord?.name,
        email: currentVenueRecord?.email,
        userId: currentVenueRecord?.userId,
        description: currentVenueRecord?.description,
        phone: currentVenueRecord?.phone,
        country: currentVenueRecord?.country,
        cityTown: currentVenueRecord?.cityTown,
        websiteUrl: currentVenueRecord?.websiteUrl,
        postalAddress: currentVenueRecord?.postalAddress,
        latitude: currentVenueRecord?.location?.coordinates[1],
        longitude: currentVenueRecord?.location?.coordinates[0],
        category: currentVenueRecord?.category,
        subcategory: currentVenueRecord?.subcategory,
        secondarySubcategory: currentVenueRecord?.secondarySubcategory,
        profile: initialProfileFileList,
        photos: initialPhotosFileList,
        menuPhotos: initialMenuPhotosFileList,
      });

      // Set preview states
      setProfileImage(currentVenueRecord?.profileImage || AllImages.userImage);
      setIsShopping(currentVenueRecord?.category);
      if (currentVenueRecord?.location?.coordinates) {
        setMarkerPosition({
          lat: currentVenueRecord.location.coordinates[1],
          lng: currentVenueRecord.location.coordinates[0],
        });
        setSearchAddress(currentVenueRecord?.postalAddress || "");
      }
    }
  }, [currentVenueRecord, form]);

  // Sync profileImage preview whenever the 'profile' form field changes
  useEffect(() => {
    const profileFileList = form.getFieldValue("profile");
    if (profileFileList && profileFileList.length > 0) {
      const file = profileFileList[0];
      if (file.originFileObj) {
        // New upload: create preview URL
        const previewUrl = URL.createObjectURL(file.originFileObj);
        setProfileImage(previewUrl);
      } else if (file.url) {
        // Existing or removed: use URL
        setProfileImage(file.url);
      }
    } else {
      // No profile: revert to default
      setProfileImage(AllImages.userImage);
    }
  }, [form]);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    form.setFieldsValue({ latitude: lat, longitude: lng });
  };

  const handleSelect = async (address) => {
    setSearchAddress(address);
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setMarkerPosition(latLng);

      // Extract address components
      const addressComponents = results[0].address_components;
      let country = "";
      let cityTown = "";
      let postalAddress = "";

      addressComponents.forEach((component) => {
        if (component.types.includes("country")) {
          country = component.long_name;
        }
        if (
          component.types.includes("locality") ||
          component.types.includes("administrative_area_level_1")
        ) {
          cityTown = component.long_name;
        }
        if (component.types.includes("postal_code")) {
          postalAddress = component.long_name;
        }
      });

      form.setFieldsValue({
        latitude: latLng.lat,
        longitude: latLng.lng,
        country: country || "Unknown",
        cityTown: cityTown || "Unknown",
        postalAddress: postalAddress || "Unknown",
      });
    } catch (error) {
      console.error("Error selecting address:", error);
    }
  };

  const normFileEvent = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // Simplified handlers: Just update form (let AntD handle previews)
  const handleProfileUploadChange = (info) => {
    form.setFieldsValue({ profile: info.fileList });
  };

  const handlePhotosUploadChange = (info) => {
    form.setFieldsValue({ photos: info.fileList });
  };

  const handleMenuPhotosUploadChange = (info) => {
    form.setFieldsValue({ menuPhotos: info.fileList });
  };

  const uploadCommonProps = {
    beforeUpload: () => false,
    accept: "image/*",
    listType: "picture-card",
    showUploadList: { showRemoveIcon: true },
  };

  const uploadCommonProps1 = {
    beforeUpload: () => false,
    maxCount: 1,
    accept: "image/*",
    listType: "text",
    showUploadList: { showRemoveIcon: true },
    onChange: handleProfileUploadChange,
  };

  const onFinish = async (values) => {
    const toastId = toast.loading("Business User Website is Editing...");
    const data = { ...values };
    delete data.profile;
    // delete data.photos;
    // delete data.menuPhotos;

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    // Handle profile image
    if (values?.profile?.length > 0 && values.profile[0].originFileObj) {
      formData.append("profile", values.profile[0].originFileObj);
    }

    // // Handle photos
    // if (values?.photos?.length > 0) {
    //   values.photos.forEach((image) => {
    //     if (image.originFileObj) {
    //       formData.append("photos", image.originFileObj);
    //     }
    //   });
    // }

    // // Handle menu photos
    // if (values?.menuPhotos?.length > 0) {
    //   values.menuPhotos.forEach((image) => {
    //     if (image.originFileObj) {
    //       formData.append("menuPhotos", image.originFileObj);
    //     }
    //   });
    // }

    try {
      const res = await editVenue({
        id: currentVenueRecord?._id,
        data: formData,
      }).unwrap();
      toast.success("Business User website edited successfully", {
        id: toastId,
        duration: 2000,
      });
      form.resetFields();
      setProfileImage(AllImages.userImage);
      handleCancel();
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
    <Modal
      open={isVenueEditModalVisible}
      onCancel={handleCancel}
      footer={[]}
      centered
      style={{ textAlign: "center" }}
      className="lg:!w-[700px]"
    >
      <div className="p-10">
        <p className="text-3xl font-semibold pt-10 pb-4 text-center text-black">
          Edit Business User
        </p>
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
            <div className="relative">
              <img
                className="h-40 w-40 relative rounded-full border border-secondary-color object-contain"
                src={profileImage}
                alt="Profile"
              />
              <Form.Item
                name="profile"
                valuePropName="fileList"
                getValueFromEvent={normFileEvent}
              >
                <Upload
                  {...uploadCommonProps1}
                  className="absolute -top-10 !right-3 text-end noText w-100"
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                >
                  <Button
                    style={{ zIndex: 1 }}
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
                Venue Name
              </Typography.Title>
              <Form.Item
                rules={[{ required: true, message: "Please enter name" }]}
                name="name"
              >
                <Input
                  placeholder="Enter name"
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
                  placeholder="Enter email"
                  className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col sm:gap-5">
            <div className="flex-1">
              <Typography.Title level={4} style={{ color: "#222222" }}>
                Category
              </Typography.Title>
              <Form.Item
                rules={[{ required: true, message: "Please select category" }]}
                name="category"
              >
                <Select
                  className="sm:!h-10"
                  placeholder="Select a Category"
                  showSearch
                  onChange={(e) => setIsShopping(e)}
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
          {isShopping === "685bfe3189b1c57bf5ebc5e7" && (
            <div className="flex sm:flex-row flex-col sm:gap-5">
              <div className="flex-1">
                <Typography.Title level={4} style={{ color: "#222222" }}>
                  Sub Category
                </Typography.Title>
                <Form.Item
                  rules={[
                    { required: true, message: "Please select sub category" },
                  ]}
                  name="subcategory"
                >
                  <Select
                    className="sm:!h-10"
                    placeholder="Select a Sub Category"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.key.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {subCategory?.map((cat) => (
                      <Option key={cat?.name} value={cat?.value}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <span>{cat?.name}</span>
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="flex-1">
                <Typography.Title level={4} style={{ color: "#222222" }}>
                  Shopping Type
                </Typography.Title>
                <Form.Item
                  rules={[
                    { required: true, message: "Please select shopping type" },
                  ]}
                  name="secondarySubcategory"
                >
                  <Select
                    className="sm:!h-10"
                    placeholder="Select a Shopping Type"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.key.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {shoppingType?.map((cat) => (
                      <Option key={cat?.name} value={cat?.value}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <span>{cat?.name}</span>
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
          )}
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
              <Form.Item name="phone">
                <Input
                  placeholder="Enter phone number"
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
                            background: suggestion.active ? "#f0f0f0" : "#fff",
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
              rules={[{ required: true, message: "Please select a location" }]}
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              label="Longitude"
              name="longitude"
              rules={[{ required: true, message: "Please select a location" }]}
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item name="country" noStyle>
              <Input type="hidden" />
            </Form.Item>
            <Form.Item name="cityTown" noStyle>
              <Input type="hidden" />
            </Form.Item>
            <Form.Item name="postalAddress" noStyle>
              <Input type="hidden" />
            </Form.Item>
          </div>
          <div className="flex sm:flex-row flex-col sm:gap-5">
            <div className="flex-1">
              <Typography.Title level={4} style={{ color: "#222222" }}>
                Website URL
              </Typography.Title>
              <Form.Item
                rules={[
                  { required: true, message: "Please enter website URL" },
                ]}
                name="websiteUrl"
              >
                <Input
                  placeholder="Enter website URL"
                  className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
                />
              </Form.Item>
            </div>
          </div>
          {/* <Typography.Title level={4} style={{ color: "#222222" }}>
            Photos
          </Typography.Title>
          <Form.Item
            name="photos"
            valuePropName="fileList"
            getValueFromEvent={normFileEvent}
          >
            <Upload
              multiple
              {...uploadCommonProps}
              onChange={handlePhotosUploadChange}
              maxCount={10}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload Photos</div>
              </div>
            </Upload>
          </Form.Item>
          <Typography.Title level={4} style={{ color: "#222222" }}>
            Restaurant Menu (if available)
          </Typography.Title>
          <Form.Item
            name="menuPhotos"
            valuePropName="fileList"
            getValueFromEvent={normFileEvent}
          >
            <Upload
              multiple
              {...uploadCommonProps}
              onChange={handleMenuPhotosUploadChange}
              maxCount={5}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload Menu Photos</div>
              </div>
            </Upload>
          </Form.Item> */}
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
  );
};

export default EditVenueModal;

const subCategory = [
  {
    name: "Shopping",
    label: "Shopping",
    value: "Shopping",
  },
  {
    name: "Supermarkets",
    label: "Supermarkets",
    value: "Supermarkets",
  },
  {
    name: "Hypermarkets",
    label: "Hypermarkets",
    value: "Hypermarkets",
  },
];

const shoppingType = [
  { name: "ATMs", label: "ATMs", value: "ATMs" },
  {
    name: "Baby Care & Gear (e.g. strollers, cribs, toys)",
    label: "Baby Care & Gear (e.g. strollers, cribs, toys)",
    value: "Baby Care & Gear",
  },
  { name: "Bank Branches", label: "Bank Branches", value: "Bank Branches" },
  {
    name: "Beauty & Cosmetics Stores",
    label: "Beauty & Cosmetics Stores",
    value: "Beauty & Cosmetics Stores",
  },
  {
    name: "Beauty Salons & Barbershops",
    label: "Beauty Salons & Barbershops",
    value: "Beauty Salons & Barbershops",
  },
  {
    name: "Bookstores & Stationery Shops",
    label: "Bookstores & Stationery Shops",
    value: "Bookstores & Stationery Shops",
  },
  {
    name: "Bowling Alley / Arcades",
    label: "Bowling Alley / Arcades",
    value: "Bowling Alley / Arcades",
  },
  {
    name: "Cafés & Coffee Shops",
    label: "Cafés & Coffee Shops",
    value: "Cafés & Coffee Shops",
  },
  {
    name: "Car Rental Desks",
    label: "Car Rental Desks",
    value: "Car Rental Desks",
  },
  {
    name: "Children's Play Area / Indoor Playground",
    label: "Children's Play Area / Indoor Playground",
    value: "Children's Play Area",
  },
  {
    name: "Cinema / Movie Theatre",
    label: "Cinema / Movie Theatre",
    value: "Cinema / Movie Theatre",
  },
  {
    name: "Clinics / Medical Centres",
    label: "Clinics / Medical Centres",
    value: "Clinics / Medical Centres",
  },
  {
    name: "Computer & Gadget Stores",
    label: "Computer & Gadget Stores",
    value: "Computer & Gadget Stores",
  },
  {
    name: "Curtains, Blinds & Home Textile Stores",
    label: "Curtains, Blinds & Home Textile Stores",
    value: "Curtains & Home Textile Stores",
  },
  {
    name: "Electronics & Appliances Stores",
    label: "Electronics & Appliances Stores",
    value: "Electronics & Appliances Stores",
  },
  { name: "Escape Rooms", label: "Escape Rooms", value: "Escape Rooms" },
  {
    name: "Fashion & Apparel",
    label: "Fashion & Apparel",
    value: "Fashion & Apparel",
  },
  {
    name: "Fast Food Chains",
    label: "Fast Food Chains",
    value: "Fast Food Chains",
  },
  {
    name: "Fine Dining / Themed Restaurants",
    label: "Fine Dining / Themed Restaurants",
    value: "Fine Dining / Themed Restaurants",
  },
  { name: "Food Court", label: "Food Court", value: "Food Court" },
  { name: "Footwear", label: "Footwear", value: "Footwear" },
  {
    name: "Foreign Exchange Counter",
    label: "Foreign Exchange Counter",
    value: "Foreign Exchange Counter",
  },
  {
    name: "Furniture & Home Décor",
    label: "Furniture & Home Décor",
    value: "Furniture & Home Décor",
  },
  {
    name: "Gyms / Fitness Centers",
    label: "Gyms / Fitness Centers",
    value: "Gyms / Fitness Centers",
  },
  {
    name: "Homeware / Tableware Shops",
    label: "Homeware / Tableware Shops",
    value: "Homeware / Tableware Shops",
  },
  {
    name: "Ice Cream Parlors / Dessert Bars",
    label: "Ice Cream Parlors / Dessert Bars",
    value: "Ice Cream Parlors / Dessert Bars",
  },
  {
    name: "Insurance & Financial Services",
    label: "Insurance & Financial Services",
    value: "Insurance & Financial Services",
  },
  {
    name: "Jewelry & Accessories",
    label: "Jewelry & Accessories",
    value: "Jewelry & Accessories",
  },
  {
    name: "Juice Bars & Healthy Bites",
    label: "Juice Bars & Healthy Bites",
    value: "Juice Bars & Healthy Bites",
  },
  {
    name: "Kitchen Equipment Stores",
    label: "Kitchen Equipment Stores",
    value: "Kitchen Equipment Stores",
  },
  {
    name: "Lingerie & Undergarments",
    label: "Lingerie & Undergarments",
    value: "Lingerie & Undergarments",
  },
  {
    name: "Luggage & Travel Accessories Stores",
    label: "Luggage & Travel Accessories Stores",
    value: "Luggage & Travel Accessories Stores",
  },
  { name: "Maternity Wear", label: "Maternity Wear", value: "Maternity Wear" },
  {
    name: "Mattress & Bedding Stores",
    label: "Mattress & Bedding Stores",
    value: "Mattress & Bedding Stores",
  },
  {
    name: "Men's, Women's, and Children's Clothing",
    label: "Men's, Women's, and Children's Clothing",
    value: "Clothing",
  },
  {
    name: "Mobile Shops & Accessories",
    label: "Mobile Shops & Accessories",
    value: "Mobile Shops & Accessories",
  },
  { name: "Nail Bars", label: "Nail Bars", value: "Nail Bars" },
  {
    name: "Opticians & Eyewear Shops",
    label: "Opticians & Eyewear Shops",
    value: "Opticians & Eyewear Shops",
  },
  {
    name: "Pet Shops & Supplies",
    label: "Pet Shops & Supplies",
    value: "Pet Shops & Supplies",
  },
  { name: "Pharmacies", label: "Pharmacies", value: "Pharmacies" },
  {
    name: "Spas & Massage Parlors",
    label: "Spas & Massage Parlors",
    value: "Spas & Massage Parlors",
  },
  {
    name: "Sports & Fitness Stores",
    label: "Sports & Fitness Stores",
    value: "Sports & Fitness Stores",
  },
  {
    name: "Supermarkets / Grocery Stores",
    label: "Supermarkets / Grocery Stores",
    value: "Supermarkets / Grocery Stores",
  },
  {
    name: "Telecom Service Providers (SIM cards, plans)",
    label: "Telecom Service Providers (SIM cards, plans)",
    value: "Telecom Service Providers",
  },
  { name: "Toy Stores", label: "Toy Stores", value: "Toy Stores" },
  {
    name: "Travel Agencies",
    label: "Travel Agencies",
    value: "Travel Agencies",
  },
  {
    name: "VR & Gaming Zones",
    label: "VR & Gaming Zones",
    value: "VR & Gaming Zones",
  },
  { name: "Wellness Shops", label: "Wellness Shops", value: "Wellness Shops" },
  {
    name: "Yoga / Dance Studios",
    label: "Yoga / Dance Studios",
    value: "Yoga / Dance Studios",
  },
];
