import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ConfigProvider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IoMdAddCircleOutline } from "react-icons/io";
 
//* Modal Table
import AllUserTable from "../../Components/Tables/Admin/AllUserTable";
import AllVenseTable from "../../Components/Tables/Admin/AllVenseTable";
import ViewUserModal from "../../Components/Modal/Admin/ViewUserModal";
import BlockUserModal from "../../Components/Modal/Admin/BlockUserModal";
import AddCategoriesModal from "../../Components/Modal/Admin/AddCategoriesModal";
import ViewVenseModal from "../../Components/Modal/Admin/ViewVenseModal";
import BlockVenseModal from "../../Components/Modal/Admin/BlockVenseModal";

const VanuesPage = () => {
  //* Store Search Value
  const [searchText, setSearchText] = useState("");

  //* Use to set user
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  //* It's Use to Show Modal
  const [isVenueViewModalVisible, setIsVenueViewModalVisible] =
    useState(false);

  //* It's Use to Block Modal
  const [isVenueBlockModalVisible, setIsVenueBlockModalVisible] =
    useState(false);

  //* It's Use to Add Modal
  const [isAddVenueModalVisible, setIsAddVenueModalVisible] =
    useState(false);

  //* It's Use to Set Seclected User to Block and view
  const [currentVenueRecord, setCurrentVenueRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/VenseData.json");
        setData(response?.data); // Make sure this is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredVenueData = useMemo(() => {
    if (!searchText) return data;
    return data.filter((item) =>
      item.userName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const showAddVenueModal = () => {
    setIsAddVenueModalVisible(true);
  };

  const showVenueViewModal = (record) => {
    setCurrentVenueRecord(record);
    setIsVenueViewModalVisible(true);
  };

  const showVenueBlockModal = (record) => {
    setCurrentVenueRecord(record);
    setIsVenueBlockModalVisible(true);
  };

  const handleCancel = () => {
    setIsVenueViewModalVisible(false);
    setIsVenueBlockModalVisible(false);
    setIsAddVenueModalVisible(false);
  };

  const handleVenueBlock = (data) => {
    console.log("Blocked Venue:", {
      id: data?.id,
      VenueName: data?.VenueName,
    });
    setIsVenueViewModalVisible(false);
    setIsVenueBlockModalVisible(false);
  };

  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">
            Customers List
          </p>
          <div className="flex gap-4 items-center">
            <ConfigProvider
              theme={{ token: { colorTextPlaceholder: "#f3f3f3" } }}
            >
              <Input
                placeholder="Search User..."
                value={searchText}
                onChange={(e) => onSearch(e.target.value)}
                className="font-semibold !border-primary-color !placeholder:text-secondary-color !bg-white text-secondary-color py-2 !rounded-full"
                prefix={
                  <SearchOutlined className="text-secondary-color font-bold text-lg mr-2" />
                }
              />
            </ConfigProvider>
          </div>
        </div>
      </div>

      {/* Table  */}
      <div className="px-10 py-10">
        <AllVenseTable
          data={filteredVenueData}
          loading={loading}
          showVenueViewModal={showVenueViewModal}
          showVenueBlockModal={showVenueBlockModal}
          pageSize={8}
        />
      </div>

          {/* Modals */}
          


      {/* <AddCategoriesModal
        isAddVenueModalVisible={isAddVenueModalVisible}
        handleCancel={handleCancel}
      /> */}
      <ViewVenseModal
        isVenueViewModalVisible={isVenueViewModalVisible}
        handleCancel={handleCancel}
        currentVenueRecord={currentVenueRecord}
        handleVenueBlock={handleVenueBlock}
        showVenueBlockModal={showVenueBlockModal}
      />
      <BlockVenseModal
        isVenueBlockModalVisible={isVenueBlockModalVisible}
        handleVenueBlock={handleVenueBlock}
        handleCancel={handleCancel}
        currentVenueRecord={currentVenueRecord}
      />
    </div>
  );
};

export default VanuesPage;
