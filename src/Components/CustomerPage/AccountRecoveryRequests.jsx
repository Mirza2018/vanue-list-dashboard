import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import AddCategoriesModal from "../Modal/Admin/AddCategoriesModal";
import AccountRecoveryTable from "../Tables/Admin/AccountRecoveryTable";
import ViewAccountRecovery from "../Modal/Admin/ViewAccountRecovery";
import RejectAccountRecovery from "../Modal/Admin/RejectAccountRecovery";
import AproveAccountModal from "../Modal/Admin/AproveAccountModal";
import { App } from "antd";

//* Modal Table

const AccountRecoveryRequests = ({ setSearchText, searchText }) => {
  const [data, setData] = useState([]);
  //   const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [approveAccount, setApproveAccount] = useState(false);
  const [approveAccountRecord, setApproveAccountRecord] = useState(null);

  const ApproveAccountRecord = (record) => {
    setApproveAccount(true);
    setApproveAccountRecord(record)
   }

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/userData.json");
        setData(response?.data); // Make sure this is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
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
        <AccountRecoveryTable
          data={filteredCompanyData}
          loading={loading}
          showCompanyViewModal={showCompanyViewModal}
          showCompanyBlockModal={showCompanyBlockModal}
          setapproveAccount={setApproveAccount}
          ApproveAccountRecord={ApproveAccountRecord}
          pageSize={8}
        />
      </div>

      {/* Modals */}
      <AddCategoriesModal
        isAddCompanyModalVisible={isAddCompanyModalVisible}
        handleCancel={handleCancel}
      />
      <ViewAccountRecovery
        isCompanyViewModalVisible={isCompanyViewModalVisible}
        handleCancel={handleCancel}
        currentCompanyRecord={currentCompanyRecord}
        handleCompanyBlock={handleCompanyBlock}
        showCompanyBlockModal={showCompanyBlockModal}
      />
      <RejectAccountRecovery
        isCompanyBlockModalVisible={isCompanyBlockModalVisible}
        handleCompanyBlock={handleCompanyBlock}
        handleCancel={handleCancel}
        currentCompanyRecord={currentCompanyRecord}
      />
      <AproveAccountModal
        approveAccount={approveAccount}
        setApproveAccount={setApproveAccount}
        approveAccountRecord={approveAccountRecord}
      />
    </div>
  );
};

export default AccountRecoveryRequests;
