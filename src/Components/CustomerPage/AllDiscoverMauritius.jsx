import { useMemo, useState } from "react";
import { useGetDiscovermauritiusQuery } from "../../redux/api/adminApi";
import ViewMauritiusModal from "../Modal/Admin/BlockMauritiusModal";
import AllMauritiusTable from "../Tables/Admin/AllMauritiusTable";
import BlockMauritiusModal from "../Modal/Admin/BlockMauritiusModal";
import EditMauritius from "../Modal/Admin/EditMauritius";

//* Modal Table

const AllDiscoverMauritius = ({ setSearchText, searchText }) => {
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
    useGetDiscovermauritiusQuery(filters);
  const displayedData = data ?? currentData;

  //* It's Use to Show Modal
  const [isCompanyViewModalVisible, setIsCompanyViewModalVisible] =
    useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

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
  const showCompanyEditModal = (record) => {
    setCurrentCompanyRecord(record);
    setIsEditModalVisible(true);
  };

  const showCompanyBlockModal = (record) => {
    setCurrentCompanyRecord(record);
    setIsCompanyBlockModalVisible(true);
  };

  const handleCancel = () => {
    setIsCompanyViewModalVisible(false);
    setIsCompanyBlockModalVisible(false);
    setIsEditModalVisible(false);
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
          meta={displayedData?.meta}
          loading={isLoading}
          onPageChange={onPageChange}
          showCompanyViewModal={showCompanyViewModal}
          showCompanyBlockModal={showCompanyBlockModal}
          showCompanyEditModal={showCompanyEditModal}
          pageSize={8}
        />
      </div>

      <BlockMauritiusModal
        isCompanyViewModalVisible={isCompanyViewModalVisible}
        handleCancel={handleCancel}
        currentCompanyRecord={currentCompanyRecord}
        handleCompanyBlock={handleCompanyBlock}
        showCompanyBlockModal={showCompanyBlockModal}
      />
      <EditMauritius
        isAddCompanyModalVisible={isEditModalVisible}
        currentCompanyRecord={currentCompanyRecord}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default AllDiscoverMauritius;
