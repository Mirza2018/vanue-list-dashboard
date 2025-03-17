import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

//* Modal Table
import CompanyReportTable from "../../Components/Tables/Company/CompanyReportTable";
import ViewReportModal from "../../Components/Modal/Company/ViewReportModal";
import RemoveReportModal from "../../Components/Modal/Company/RemoveReportModal";

const CompanyReport = () => {
  //* Use to set user
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  //* It's Use to Show Modal
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  //* It's Use to Delete Modal
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);

  //* It's Use to Set Seclected User to Remove and view
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/report.json");
        setData(response?.data); // Make sure this is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showRemoveModal = (record) => {
    setCurrentRecord(record);
    setIsRemoveModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsRemoveModalVisible(false);
  };

  const handleRemove = (data) => {
    console.log("Remove Report:", {
      id: data?.id,
      name: data?.name,
      reportAgainst: {
        id: data?.reportAgainst?.id,
        name: data?.reportAgainst?.name,
      },
    });
    setIsRemoveModalVisible(false);
  };
  const handleBlock = (data) => {
    console.log("Block Reported User:", {
      id: data?.id,
      name: data?.name,
      reportAgainst: {
        id: data?.reportAgainst?.id,
        name: data?.reportAgainst?.name,
      },
    });
    setIsViewModalVisible(false);
  };

  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">Report</p>
        </div>
      </div>

      {/* Table  */}
      <div className="px-10 py-10">
        <CompanyReportTable
          data={data}
          loading={loading}
          showViewModal={showViewModal}
          showRemoveModal={showRemoveModal}
          pageSize={12}
        />
      </div>

      {/* Modals */}
      <ViewReportModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleBlock={handleBlock}
      />
      <RemoveReportModal
        isRemoveModalVisible={isRemoveModalVisible}
        handleRemove={handleRemove}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default CompanyReport;
