import React, { useState } from "react";
import { Table, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ContentApproveModal from "./ContentApproveModal";
import ContentRejectModal from "./ContentRejectModal";
// Sample data for the table
const data = Array.from({ length: 8 }, (_, index) => ({
  key: (index + 1).toString(),
  slNumber: "#1234",
  userName: "Mirza",
  videoPreview: "45123456789",
  paymentStatus: "paid",
  timeDate: "4:15 PM, 13/02/24",
}));

// Define the columns for the table

const PendingApprovals = () => {
  const [isApprove, setIsApprove] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const columns = [
    {
      title: "S.lD",
      dataIndex: "slNumber",
      key: "slNumber",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Video Preview",
      dataIndex: "videoPreview",
      key: "videoPreview",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Uploaded At",
      dataIndex: "timeDate",
      key: "timeDate",
    },
    {
      title: "ACTION",
      key: "action",
      render: () => (
        <div className="flex gap-2">
          <Button
            type="text"
            //   icon={<EyeOutlined />}
            onClick={() => setIsApprove(true)}
            className="!bg-secondary-color !text-white "
          >
            Approve
          </Button>
          <Button
            type="text"
            className="!bg-red-600 !text-white "
            onClick={() => setIsReject(true)}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="p-4">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 8,
          total: 250, // Total number of items
          showSizeChanger: true,
          pageSizeOptions: ["8", "60", "120"],
          defaultCurrent: 1,
          showTotal: (total, range) =>
            `SHOWING ${range[0]}-${range[1]} OF ${total}`,
        }}
        className="custom-table"
      />
      <ContentApproveModal isApprove={isApprove} setIsApprove={setIsApprove} />
      <ContentRejectModal isReject={isReject} setIsReject={setIsReject} />
    </div>
  );
};

export default PendingApprovals;
