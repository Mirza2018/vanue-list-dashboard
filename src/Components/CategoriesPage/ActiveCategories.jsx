import React, { useState } from "react";
import { Button, ConfigProvider, Input, Modal, Table } from "antd";
import { FaRegTrashCan } from "react-icons/fa6";
import { AllImages } from "../../../public/images/AllImages";
const data = Array.from({ length: 8 }, (_, index) => ({
  key: (index + 1).toString(),
  // slNumber: "#1234",
  userName: "Mirza",
  categoryName: "toy",
  categoryImage: "photo",
}));
const columns = [
  {
    title: "Category Serial",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Category Name",
    dataIndex: "categoryName",
    key: "userName",
  },
  {
    title: "Category Image",
    dataIndex: "categoryImage",
    key: "categoryImage",
    render: () => (
      <img
        src={AllImages.userImage}
        className="w-20 aspect-video object-cover"
      />
    ),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <div className="flex gap-2">
        <Button
          onClick={() => setBlockModal(true)}
          type="text"
          icon={<FaRegTrashCan />}
          className="!text-red-600 !hover:text-red-800"
        />
      </div>
    ),
  },
];
const ActiveCategories = () => {
  const [blockModal, setBlockModal] = useState(false);
  const columns = [
    {
      title: "Category Serial",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "userName",
    },
    {
      title: "Category Image",
      dataIndex: "categoryImage",
      key: "categoryImage",
      render: () => (
        <img
          src={AllImages.doc2}
          className="w-24 h-14 rounded-md object-cover"
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex gap-2">
          <Button
            onClick={() => setBlockModal(true)}
            type="text"
            icon={<FaRegTrashCan className="text-xl" />}
            className="!text-red-600 !hover:text-red-800"
          />
        </div>
      ),
    },
  ];
  return (
    <div>
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

      <Modal
        // title="Confirm Delete"
        open={blockModal}
        onOk={() => setBlockModal(false)}
        onCancel={() => setBlockModal(false)}
        okText="block"
        cancelText="Cancel"
        centered
        style={{ textAlign: "center" }}
        // styles.body={{ textAlign: "center" }}
        width={400}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "40px",
              marginTop: "30px",
            }}
          >
            <Button
              className="text-xl py-5 px-8 !text-black"
              type="primary"
              onClick={() => setBlockModal(false)}
              style={{
                marginRight: 12,
                background: "rgba(221, 221, 221, 1)",
              }}
            >
              Cancel
            </Button>
            <Button
              className="text-xl py-5 px-8"
              type="primary"
              style={{ background: "#CE0000" }}
              onClick={() => setBlockModal(false)}
            >
              Block
            </Button>
          </div>
        }
      >
        <p className="text-3xl font-semibold pt-10 pb-4 text-center text-black">
          Do you want to block this user?
        </p>
      </Modal>
    </div>
  );
};

export default ActiveCategories;
