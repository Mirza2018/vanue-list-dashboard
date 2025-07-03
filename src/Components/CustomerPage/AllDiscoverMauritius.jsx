import { useMemo, useState } from "react";
import {  useGetDiscovermauritiusQuery } from "../../redux/api/adminApi";
import ViewMauritiusModal from "../Modal/Admin/ViewMauritiusModal";
import AllMauritiusTable from "../Tables/Admin/AllMauritiusTable";

//* Modal Table

const AllDiscoverMauritius = ({ setSearchText, searchText }) => {
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useGetDiscovermauritiusQuery(); 
  const displayedData = data ?? currentData;

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
      item.userName.toLowerCase().includes(searchText.toLowerCase())
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
    <div>
      <div className="px-10 py-10">
        <AllMauritiusTable
          data={displayedData?.data}
          loading={isLoading}
          showCompanyViewModal={showCompanyViewModal}
          showCompanyBlockModal={showCompanyBlockModal}
          pageSize={8}
        />
      </div>


      <ViewMauritiusModal
        isCompanyViewModalVisible={isCompanyViewModalVisible}
        handleCancel={handleCancel}
        currentCompanyRecord={currentCompanyRecord}
        handleCompanyBlock={handleCompanyBlock}
        showCompanyBlockModal={showCompanyBlockModal}
      />
 
    </div>
  );
};

export default AllDiscoverMauritius;
