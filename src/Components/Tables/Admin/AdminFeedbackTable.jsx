/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
// import { RiDeleteBin6Line } from "react-icons/ri";
import { AllImages } from "../../../../public/images/AllImages";
import { RiDeleteBin6Line } from "react-icons/ri";

const AdminFeedbackTable = ({
  data,
  loading,
  showViewFeedbackModal,
  showRemoveModal,
  pageSize = 0,
}) => {
  const columns = [
    {
      title: "#SI",
      dataIndex: "id",
      key: "id",
      responsive: ["md"],
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      render: (text) => (
        <div className="flex items-center gap-2">
          <img
            src={AllImages.yellow}
            alt={text}
            className="w-8 h-8 rounded-full"
          />
          <p>{text}</p>
        </div>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
      render: (text) => <p>{text?.slice(0, 20)}...</p>, // Corrected rendering of description with slicing
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            {/* View Details Tooltip */}
            <Tooltip placement="right" title="View Details">
              <Button
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  color: "#222222",
                }}
                onClick={() => showViewFeedbackModal(record)}
              >
                <GoEye style={{ fontSize: "24px" }} />
              </Button>
            </Tooltip>

            {/* Block User Tooltip */}
            <Tooltip placement="left" title="Remove This Report">
              <Button
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  color: "#F5382C",
                }}
                onClick={() => showRemoveModal(record)}
              >
                <RiDeleteBin6Line style={{ fontSize: "24px" }} />
              </Button>
            </Tooltip>
          </Space>
        </>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pageSize > 0 ? { pageSize } : false}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default AdminFeedbackTable;
