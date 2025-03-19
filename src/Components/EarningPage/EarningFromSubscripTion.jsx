import React from "react";
import { Table, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
// Sample data for the table
const data = Array.from({ length: 8 }, (_, index) => ({
  key: (index + 1).toString(),
  slNumber: '#1234',
  accNumber: '45123456789',
  timeDate: '4:15 PM, 13/02/24',
  amount: '33 Cents',
}));

// Define the columns for the table
const columns = [
  {
    title: 'SL NUMBER',
    dataIndex: 'slNumber',
    key: 'slNumber',
  },
  {
    title: 'ACC NUMBER',
    dataIndex: 'accNumber',
    key: 'accNumber',
  },
  {
    title: 'TIME & DATE',
    dataIndex: 'timeDate',
    key: 'timeDate',
  },
  {
    title: 'AMOUNT',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'ACTION',
    key: 'action',
    render: () => (
      <Button
        type="text"
        icon={<EyeOutlined />}
        className="text-teal-600 hover:text-teal-800"
        onClick={() => console.log('View clicked')}
      />
    ),
  },
]
const EarningFromSubscripTion = () => {
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
    </div>
  );
};

export default EarningFromSubscripTion;
