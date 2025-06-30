import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import AddCategoriesModal from "../Modal/Admin/AddCategoriesModal";
import AccountRecoveryTable from "../Tables/Admin/AccountRecoveryTable";
import ViewAccountRecovery from "../Modal/Admin/ViewAccountRecovery";
import RejectAccountRecovery from "../Modal/Admin/RejectAccountRecovery";
import AproveAccountModal from "../Modal/Admin/AproveAccountModal";
import { App } from "antd";
import {
  useGetRecoveryAccountQuery,
  useRecoveryAccountRequestMutation,
} from "../../redux/api/adminApi";
import { toast } from "sonner";

//* Modal Table

const AccountRecoveryRequests = ({ setSearchText, searchText }) => {
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useGetRecoveryAccountQuery();

  const displayedData = data ?? currentData;
  const [recoveryAccountRequest] = useRecoveryAccountRequestMutation();

  const [approveAccount, setApproveAccount] = useState(false);
  const [approveAccountRecord, setApproveAccountRecord] = useState(null);

  const ApproveAccountRecord = (record) => {
    setApproveAccount(true);
    setApproveAccountRecord(record);
  };

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

  const handleCompanyBlock = async () => {
    const toastId = toast.loading("Request rejecting...");
    const data = {
      status: "rejected",
    };
    try {
      const res = await recoveryAccountRequest({
        id: data?._id,
        data: data,
      }).unwrap();
      console.log(res);
      toast.success("Request reject Successfully", {
        id: toastId,
        duration: 2000,
      });

      setIsCompanyViewModalVisible(false);
      setIsCompanyBlockModalVisible(false);
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
    <div>
      <div className="px-10 py-10">
        <AccountRecoveryTable
          data={displayedData?.data?.result}
          loading={isLoading}
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
