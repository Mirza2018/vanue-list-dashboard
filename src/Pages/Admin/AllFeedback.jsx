import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

//* Modal Table
import AdminFeedbackTable from "../../Components/Tables/Admin/AdminFeedbackTable";
import ViewFeedbackModal from "../../Components/Modal/Admin/ViewFeedbackModal";
import RemoveFeedbackModal from "../../Components/Modal/Admin/RemoveFeedbackModal";

const AdminAllFeedBack = () => {
  //* Use to set user
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  //* It's Use to Show Modal
  const [isFeedbackViewModalVisible, setIsFeedbackViewModalVisible] =
    useState(false);

  //* It's Use to Delete Modal
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);

  //* It's Use to Set Seclected User to Block and view
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/feedback.json");
        setData(response?.data); // Make sure this is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showViewFeedbackModal = (record) => {
    setCurrentRecord(record);
    setIsFeedbackViewModalVisible(true);
  };

  const showRemoveModal = (record) => {
    setCurrentRecord(record);
    setIsRemoveModalVisible(true);
  };

  const handleRemove = (data) => {
    console.log("Remove Feedback:", { id: data?.id, name: data?.companyName });
    setIsRemoveModalVisible(false);
  };

  const handleCancel = () => {
    setIsFeedbackViewModalVisible(false);
    setIsRemoveModalVisible(false);
  };

  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">Feedback</p>
        </div>
      </div>

      {/* Table  */}
      <div className="px-10 py-10">
        <AdminFeedbackTable
          data={data}
          loading={loading}
          showViewFeedbackModal={showViewFeedbackModal}
          showRemoveModal={showRemoveModal}
          pageSize={12}
        />
      </div>

      {/* Modals */}
      <ViewFeedbackModal
        isFeedbackViewModalVisible={isFeedbackViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleRemove={handleRemove}
      />
      <RemoveFeedbackModal
        isRemoveModalVisible={isRemoveModalVisible}
        handleRemove={handleRemove}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AdminAllFeedBack;
