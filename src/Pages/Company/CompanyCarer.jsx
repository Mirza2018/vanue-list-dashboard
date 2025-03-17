import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ConfigProvider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IoMdAddCircleOutline } from "react-icons/io";

//* Modal Table
import CompanyCarerTable from "../../Components/Tables/Company/CompanyCarerTable";
import AddCarerModal from "../../Components/Modal/Company/AddCarerModal";
import ViewCarerModal from "../../Components/Modal/Company/ViewCarerModal";
import BlockCarerModal from "../../Components/Modal/Company/BlockCarerModal";

const CompanyCarer = () => {
  //* Store Search Value
  const [searchText, setSearchText] = useState("");

  //* Use to set user
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  //* It's Use to Show Modal
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  //* It's Use to Block Modal
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);

  //* It's Use to Add Modal
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  //* It's Use to Set Seclected User to Block and view
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/Carer.json");
        setData(response?.data); // Make sure this is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showBlockModal = (record) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsBlockModalVisible(false);
    setIsAddModalVisible(false);
  };

  const handleBlock = (data) => {
    console.log("Blocked Carer:", { id: data?.id, name: data?.name });
    setIsViewModalVisible(false);
    setIsBlockModalVisible(false);
  };

  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">Carer</p>
          <div className="flex gap-4 items-center">
            <ConfigProvider
              theme={{ token: { colorTextPlaceholder: "#f3f3f3" } }}
            >
              <Input
                placeholder="Search Carer..."
                value={searchText}
                onChange={(e) => onSearch(e.target.value)}
                className="text-primary-color font-semibold !border-primary-color !bg-transparent py-2 !rounded-full"
                prefix={
                  <SearchOutlined className="text-primary-color font-bold text-lg mr-2" />
                }
              />
            </ConfigProvider>
          </div>
        </div>
      </div>

      {/* Add Carer Button  */}
      <div className="px-10 mt-10 ">
        <div
          onClick={showAddModal}
          className="bg-secondary-color text-primary-color flex justify-center items-center gap-2 py-2 w-full rounded-lg cursor-pointer"
        >
          <IoMdAddCircleOutline className="text-3xl" />
          <p className="text-2xl font-semibold">Add Carer</p>
        </div>
      </div>

      {/* Table  */}
      <div className="px-10 py-10">
        <CompanyCarerTable
          data={filteredData}
          loading={loading}
          showViewModal={showViewModal}
          showBlockModal={showBlockModal}
          pageSize={12}
        />
      </div>

      {/* Modals */}
      <AddCarerModal
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
      />
      <ViewCarerModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleBlock={handleBlock}
      />
      <BlockCarerModal
        isBlockModalVisible={isBlockModalVisible}
        handleBlock={handleBlock}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default CompanyCarer;
