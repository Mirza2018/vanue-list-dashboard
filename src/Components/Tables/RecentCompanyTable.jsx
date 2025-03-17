/* eslint-disable react/prop-types */
import { ConfigProvider, Table } from "antd";

const columns = [
  {
    title: "#SI",
    dataIndex: "id",
    key: "id",
    render: (text) => `#${text}`,
    responsive: ["sm"],
  },
  {
    title: "Company Name",
    dataIndex: "companyName",
    key: "companyName",
    responsive: ["sm"],
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    responsive: ["sm"],
  },
];

const RecentCompanyTable = ({ data, loading }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#19363D",
            colorBgContainer: "#FDFDFD",
            colorText: "#0C0C0C",
            borderColor: "#DFE1E3",
            headerColor: "#FDFDFD",
            fontSize: 18,
            footerColor: "#FDFDFD",
            // marginXXS: 4,
            colorIcon: "#FDFDFD",
            colorIconHover: "#FDFDFD",
            colorLinkActive: "#FDFDFD",
            headerSplitColor: "#0C0C0C",
          },
        },
      }}
    >
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        scroll={{ x: true }}
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      />
    </ConfigProvider>
  );
};

export default RecentCompanyTable;
