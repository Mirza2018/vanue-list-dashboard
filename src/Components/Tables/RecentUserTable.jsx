import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ConfigProvider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IoMdAddCircleOutline } from "react-icons/io";

//* Modal Table
import AllCompanyTable from "./Admin/AllUserTable";
import AddCompanyModal from "../Modal/Admin/AddCategoriesModal";
import ViewCompanyModal from "../Modal/Admin/ViewUserModal";
import BlockCompanyModal from "../Modal/Admin/BlockUserModal";

const RecentUserTable = ({ data, isLoading }) => {
  //* Store Search Value
  const [searchText, setSearchText] = useState("");

  //* Use to set user

  const [loading, setLoading] = useState(true);

  //* It's Use to Show Modal
  const [isCompanyViewModalVisible, setIsCompanyViewModalVisible] =
    useState(false);

  //* It's Use to Block Modal
  const [isCompanyBlockModalVisible, setIsCompanyBlockModalVisible] =
    useState(false);

  //* It's Use to Add Modal
  const [isAddCompanyModalVisible, setIsAddCompanyModalVisible] =
    useState(false);

  //* It's Use to Set Seclected User to Block and view
  const [currentCompanyRecord, setCurrentCompanyRecord] = useState(null);

  const filteredCompanyData = useMemo(() => {
    if (!searchText) return data;
    return data.filter((item) =>
      item.companyName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const showAddCompanyModal = () => {
    setIsAddCompanyModalVisible(true);
  };

  const showCompanyViewModal = (record) => {
    setCurrentCompanyRecord(record);
    setIsCompanyViewModalVisible(true);
  };

  const showCompanyBlockModal = (record) => {
    setCurrentCompanyRecord(record);
    setIsCompanyBlockModalVisible(true);
  };

  const handleCancel = () => {
    setIsCompanyViewModalVisible(false);
    setIsCompanyBlockModalVisible(false);
    setIsAddCompanyModalVisible(false);
  };

  const handleCompanyBlock = (data) => {
    console.log("Blocked Company:", {
      id: data?.id,
      companyName: data?.companyName,
    });
    setIsCompanyViewModalVisible(false);
    setIsCompanyBlockModalVisible(false);
  };

  return (
    <div className="bg-highlight-color   rounded-xl">
      {/* Add Service User Button  */}
      {/* <div className="px-10 mt-10 ">
        <div
          onClick={showAddCompanyModal}
          className="bg-secondary-color text-primary-color flex justify-center items-center gap-2 py-2 w-full rounded-lg cursor-pointer"
        >
          <IoMdAddCircleOutline className="text-3xl" />
          <p className="text-2xl font-semibold">Add Companies</p>
        </div>
      </div> */}

      {/* Table  */}
      <div className="">
        <AllCompanyTable
          data={data}
          loading={isLoading}
          showCompanyViewModal={showCompanyViewModal}
          showCompanyBlockModal={showCompanyBlockModal}
          pageSize={2}
        />
      </div>

      {/* Modals */}
      <AddCompanyModal
        isAddCompanyModalVisible={isAddCompanyModalVisible}
        handleCancel={handleCancel}
      />
      <ViewCompanyModal
        isCompanyViewModalVisible={isCompanyViewModalVisible}
        handleCancel={handleCancel}
        currentCompanyRecord={currentCompanyRecord}
        handleCompanyBlock={handleCompanyBlock}
        showCompanyBlockModal={showCompanyBlockModal}
      />
      <BlockCompanyModal
        isCompanyBlockModalVisible={isCompanyBlockModalVisible}
        handleCompanyBlock={handleCompanyBlock}
        handleCancel={handleCancel}
        currentCompanyRecord={currentCompanyRecord}
      />
    </div>
  );
};

export default RecentUserTable;
