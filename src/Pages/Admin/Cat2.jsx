import React from "react";
import { Table, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

// Sample data for the table
const data= Array.from({ length: 8 }, (_, i) => ({
  key: i.toString(),
  categorySerial: "01",
  categoryName: "Spa& Wellness",
  categoryImage:
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&q=80",
}));

// Define the columns for the table
const columns = [
  {
    title: "CATEGORY SERIAL",
    dataIndex: "serial",
    key: "serial",
  },
  {
    title: "CATEGORY NAME",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "CATEGORY IMAGE",
    dataIndex: "image",
    key: "image",
    render: (text) => (
      <img
        src={text}
        alt="category"
        className="w-24 h-12 object-cover rounded"
      />
    ),
  },
  {
    title: "ACTION",
    key: "action",
    render: () => (
      <Button
        type="text"
        icon={<DeleteOutlined />}
        className="text-red-500 hover:text-red-700"
        onClick={() => console.log("Delete clicked")}
      />
    ),
  },
];

const Cat2 = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          total: 250,
          pageSize: 8,
          showSizeChanger: false,
          showQuickJumper: false,
          itemRender: (page, type, originalElement) => {
            if (type === "prev") {
              return <span>{"<"}</span>;
            }
            if (type === "next") {
              return <span>{">"}</span>;
            }
            return originalElement;
          },
        }}
      />
      <div className="text-sm text-gray-600 mt-2">SHOWING 1-8 OF 250</div>
    </div>
  );
};

export default Cat2;
