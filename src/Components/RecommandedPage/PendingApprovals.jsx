import React, { useState } from "react";
import { Table, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ContentApproveModal from "./ContentApproveModal";
import ContentRejectModal from "./ContentRejectModal";
import { useGetPendingRecommentedContentQuery } from "../../redux/api/adminApi";
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
    useGetPendingRecommentedContentQuery(filters);

  const displayedData = data ?? currentData;
  console.log(displayedData?.data);

  const [isApprove, setIsApprove] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [contentId, setContentId] = React.useState(null);
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div className="flex justify-center items-center gap-4">
          <img
            src={record?.thumbnailImage}
            className="w-16  rounded-lg aspect-square "
            alt=""
          />
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Video Preview",
      dataIndex: "videoUrl",
      key: "videoUrl",
      render: (text) => (
        <div>
          {/* <video src={text} /> */}
          <video width="220" height="240" className="rounded-md" controls>
            <source src={text} type="video/mp4" />
          </video>
        </div>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Uploaded At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <div>{text.split("T")[0]}</div>,
    },
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3 ">
          <Button
            type="text"
            className="!bg-green-600 !text-white "
            onClick={() => {
              setIsApprove(true);
              setContentId(record?._id);
            }}
          >
            Accept
          </Button>
          <Button
            type="text"
            className="!bg-red-600 !text-white "
            onClick={() => {
           
              setIsReject(true);
              setContentId(record?._id);
            }}
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
        dataSource={displayedData?.data}
        pagination={{
          current: displayedData?.meta?.page,
          pageSize: displayedData?.meta?.limit,
          total: displayedData?.meta?.total,
          onChange: onPageChange,
          showSizeChanger: true,
        }}
        className="custom-table"
      />
      <ContentApproveModal
        isApprove={isApprove}
        setIsApprove={setIsApprove}
        id={contentId}
      />
      <ContentRejectModal
        isReject={isReject}
        setIsReject={setIsReject}
        id={contentId}
      />
    </div>
  );
};

export default PendingApprovals;
