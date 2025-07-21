import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ConfigProvider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IoMdAddCircleOutline } from "react-icons/io";

//* Modal Table

import AllVenseTable from "../../Components/Tables/Admin/AllVenseTable";

import ViewVenseModal from "../../Components/Modal/Admin/ViewVenseModal";
import BlockVenseModal from "../../Components/Modal/Admin/BlockVenseModal";
import { useGetVenueQuery } from "../../redux/api/adminApi";
import { FaRegEdit } from "react-icons/fa";
import Addvenue from "../../Components/Modal/Admin/AddVenue";
import EditVenseModal from "../../Components/Modal/Admin/EditVenseModal";

const VanuesPage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 8,
  });
  const onPageChange = (page, limit) => {
    setFilters((prev) => ({
      ...prev,
      page,
      limit,
    }));
  };
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useGetVenueQuery(filters);
  const displayedData = data ?? currentData;
  //* Store Search Value
  const [searchText, setSearchText] = useState("");

  //* Use to set user
  const [dat, setData] = useState([]);
  const [addVenue, setAddVenue] = useState(false);

  const [loading, setLoading] = useState(true);

  //* It's Use to Show Modal
  const [isVenueViewModalVisible, setIsVenueViewModalVisible] = useState(false);

  //* It's Use to Block Modal
  const [isVenueBlockModalVisible, setIsVenueBlockModalVisible] =
    useState(false);
  const [isVenueEditModalVisible, setIsVenueEditModalVisible] = useState(false);

  //* It's Use to Add Modal
  const [isAddVenueModalVisible, setIsAddVenueModalVisible] = useState(false);

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
  const showVenueEditModal = (record) => {
    setCurrentVenueRecord(record);
    setIsVenueEditModalVisible(true);
  };

  const handleCancel = () => {
    setIsVenueViewModalVisible(false);
    setIsVenueBlockModalVisible(false);
    setIsAddVenueModalVisible(false);
    setIsVenueEditModalVisible(false);
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
            Business Users List
          </p>
          {/* <div className="flex gap-4 items-center">
            <ConfigProvider
              theme={{ token: { colorTextPlaceholder: "#f3f3f3" } }}
            >
              <Input
                placeholder="Search User..."
                // value={searchText}
                // onChange={(e) => onSearch(e.target.value)}
                className="font-semibold !border-primary-color !placeholder:text-secondary-color !bg-white text-secondary-color py-2 !rounded-full"
                prefix={
                  <SearchOutlined className="text-secondary-color font-bold text-lg mr-2" />
                }
              />
            </ConfigProvider>
          </div> */}
        </div>
      </div>
      <div
        onClick={() => setAddVenue(true)}
        className="bg-secondary-color mt-5 w-fit text-primary-color flex justify-center items-center gap-2 py-2  rounded-lg cursor-pointer px-10 mx-auto"
      >
        <FaRegEdit
          style={{ fontSize: "clamp(18px, 1vw + 1rem ,30px)" }}
          className=""
        />
        <p
          style={{ fontSize: "clamp(14px, 1vw + 1rem ,20px)" }}
          className="font-semibold "
        >
          Add Business Users
        </p>
      </div>
      <Addvenue isVenue={addVenue} setIsVenue={setAddVenue} />
      {/* Table  */}
      <div className="px-10 py-10">
        <AllVenseTable
          data={displayedData?.data}
          meta={displayedData?.meta}
          onPageChange={onPageChange}
          loading={isLoading}
          showVenueViewModal={showVenueViewModal}
          showVenueBlockModal={showVenueBlockModal}
          showVenueEditModal={showVenueEditModal}
          pageSize={8}
        />
      </div>

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
      <EditVenseModal
        isVenueEditModalVisible={isVenueEditModalVisible}
        handleCancel={handleCancel}
        currentVenueRecord={currentVenueRecord}
      />
    </div>
  );
};

export default VanuesPage;
