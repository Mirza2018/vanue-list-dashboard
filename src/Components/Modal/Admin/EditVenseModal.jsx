/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal, Select, Typography, Upload } from "antd";
import { toast } from "sonner";
import {
  useEditVenueMutation,
  useGetCategoryQuery,
  useGetUnCreatedCustomersQuery,
  useVenueActionMutation,
} from "../../../redux/api/adminApi";
import { useEffect, useState } from "react";
import { data } from "autoprefixer";
import { AllImages } from "../../../../public/images/AllImages";
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

const EditVenseModal = ({
  isVenueEditModalVisible,
  handleCancel,
  currentVenueRecord,
}) => {
  const { data } = useGetCategoryQuery({ limit: 100 });
  const { data: dataUser } = useGetUnCreatedCustomersQuery({ limit: 100 });
  const usersData = dataUser?.data;
  const categoryData = data?.data?.result;
  const [isShopping, setIsShopping] = useState(null);
  console.log(currentVenueRecord);
  const [editVanue] = useEditVenueMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    if (currentVenueRecord) {
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
        // latitude: currentVenueRecord?.location?.coordinates[0],
        // longitude: currentVenueRecord?.location?.coordinates[1],
      });
    }
  }, [currentVenueRecord, form]);
  const libraries = ["places"];

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAicZRwkffHVARNs1m6LKk_5lsA2LYAb6U",
    libraries,
  });

  const [markerPosition, setMarkerPosition] = useState(null);
  const [searchAddress, setSearchAddress] = useState("");

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

  const onFinish = async (values) => {
    console.log(values);


    const toastId = toast.loading(`Business User Website is Editing...`);
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    //   return
    try {
      const res = await editVanue({
        id: currentVenueRecord?._id,
        data: formData,
      }).unwrap();
      toast.success("Business User website edit successfully", {
        id: toastId,
        duration: 2000,
      });

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
      // title="Confirm Delete"
      open={isVenueEditModalVisible}
      onOk={handleCancel}
      onCancel={handleCancel}
      okText="block"
      cancelText="Cancel"
      centered
      style={{ textAlign: "center" }}
      className="lg:!w-[700px]"
      footer={[]}
    >
      <div>
        <p className="text-3xl font-semibold pt-10 pb-4 text-center text-black">
          Edit Business User
        </p>

        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="bg-transparent w-full text-start"
        >
          {/* <div className="mt-5 flex flex-col justify-center items-center gap-x-4">
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
                   </div> */}
          <div className="flex sm:flex-row flex-col sm:gap-5">
            <div className="flex-1">
              <Typography.Title level={4} style={{ color: "#222222" }}>
                Venue name
              </Typography.Title>
              <Form.Item
                rules={[{ required: true, message: "Please enter  Name" }]}
                name="name"
              >
                <Input
                  placeholder="Enter Name"
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
              initialValue={currentVenueRecord?.location?.coordinates[0]}
              label="Latitude"
              name="latitude"
              rules={[{ required: true, message: "Please select a location" }]}
            >
              <Input readOnly />
            </Form.Item>

            <Form.Item
              initialValue={currentVenueRecord?.location?.coordinates[1]}
              label="Longitude"
              name="longitude"
              rules={[{ required: true, message: "Please select a location" }]}
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
                rules={[{ required: true, message: "Please enter websiteUrl" }]}
                name="websiteUrl"
              >
                <Input
                  placeholder="Enter Plan websiteUrl"
                  className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
                />
              </Form.Item>
            </div>
          </div>

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

export default EditVenseModal;

const subCategory = [
  {
    name: "Shopping",
    lable: "Shopping",
  },
  {
    name: "Supermarkets",
    lable: "Supermarkets",
  },
  {
    name: "Hypermarkets",
    lable: "Hypermarkets",
  },
];

const shoppingType = [
  { name: "ATMs", label: "ATMs" },
  {
    name: "Baby Care & Gear (e.g. strollers, cribs, toys)",
    label: "Baby Care & Gear (e.g. strollers, cribs, toys)",
  },
  { name: "Bank Branches", label: "Bank Branches" },
  { name: "Beauty & Cosmetics Stores", label: "Beauty & Cosmetics Stores" },
  { name: "Beauty Salons & Barbershops", label: "Beauty Salons & Barbershops" },
  {
    name: "Bookstores & Stationery Shops",
    label: "Bookstores & Stationery Shops",
  },
  { name: "Bowling Alley / Arcades", label: "Bowling Alley / Arcades" },
  { name: "Cafés & Coffee Shops", label: "Cafés & Coffee Shops" },
  { name: "Car Rental Desks", label: "Car Rental Desks" },
  {
    name: "Children’s Play Area / Indoor Playground",
    label: "Children’s Play Area / Indoor Playground",
  },
  { name: "Cinema / Movie Theatre", label: "Cinema / Movie Theatre" },
  { name: "Clinics / Medical Centres", label: "Clinics / Medical Centres" },
  { name: "Computer & Gadget Stores", label: "Computer & Gadget Stores" },
  {
    name: "Curtains, Blinds & Home Textile Stores",
    label: "Curtains, Blinds & Home Textile Stores",
  },
  {
    name: "Electronics & Appliances Stores",
    label: "Electronics & Appliances Stores",
  },
  { name: "Escape Rooms", label: "Escape Rooms" },
  { name: "Fashion & Apparel", label: "Fashion & Apparel" },
  { name: "Fast Food Chains", label: "Fast Food Chains" },
  {
    name: "Fine Dining / Themed Restaurants",
    label: "Fine Dining / Themed Restaurants",
  },
  { name: "Food Court", label: "Food Court" },
  { name: "Footwear", label: "Footwear" },
  { name: "Foreign Exchange Counter", label: "Foreign Exchange Counter" },
  { name: "Furniture & Home Décor", label: "Furniture & Home Décor" },
  { name: "Gyms / Fitness Centers", label: "Gyms / Fitness Centers" },
  { name: "Homeware / Tableware Shops", label: "Homeware / Tableware Shops" },
  {
    name: "Ice Cream Parlors / Dessert Bars",
    label: "Ice Cream Parlors / Dessert Bars",
  },
  {
    name: "Insurance & Financial Services",
    label: "Insurance & Financial Services",
  },
  { name: "Jewelry & Accessories", label: "Jewelry & Accessories" },
  { name: "Juice Bars & Healthy Bites", label: "Juice Bars & Healthy Bites" },
  { name: "Kitchen Equipment Stores", label: "Kitchen Equipment Stores" },
  { name: "Lingerie & Undergarments", label: "Lingerie & Undergarments" },
  {
    name: "Luggage & Travel Accessories Stores",
    label: "Luggage & Travel Accessories Stores",
  },
  { name: "Maternity Wear", label: "Maternity Wear" },
  { name: "Mattress & Bedding Stores", label: "Mattress & Bedding Stores" },
  {
    name: "Men's, Women's, and Children's Clothing",
    label: "Men's, Women's, and Children's Clothing",
  },
  { name: "Mobile Shops & Accessories", label: "Mobile Shops & Accessories" },
  { name: "Nail Bars", label: "Nail Bars" },
  { name: "Opticians & Eyewear Shops", label: "Opticians & Eyewear Shops" },
  { name: "Pet Shops & Supplies", label: "Pet Shops & Supplies" },
  { name: "Pharmacies", label: "Pharmacies" },
  { name: "Spas & Massage Parlors", label: "Spas & Massage Parlors" },
  { name: "Sports & Fitness Stores", label: "Sports & Fitness Stores" },
  {
    name: "Supermarkets / Grocery Stores",
    label: "Supermarkets / Grocery Stores",
  },
  {
    name: "Telecom Service Providers (SIM cards, plans)",
    label: "Telecom Service Providers (SIM cards, plans)",
  },
  { name: "Toy Stores", label: "Toy Stores" },
  { name: "Travel Agencies", label: "Travel Agencies" },
  { name: "VR & Gaming Zones", label: "VR & Gaming Zones" },
  { name: "Wellness Shops", label: "Wellness Shops" },
  { name: "Yoga / Dance Studios", label: "Yoga / Dance Studios" },
];
