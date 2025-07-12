/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { RiDeleteBin6Line, RiDeviceRecoverLine } from "react-icons/ri";


const AllUserTable = ({
  data,
  loading,
  showCompanyViewModal,
  showCompanyBlockModal,
  onPageChange ,
  meta
}) => {
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <img
            src={record?.profileImage}
            alt={text}
            className="w-8 h-8 rounded-full"
          />
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },

    {
      title: "Action",
      key: "isBlocked",
      render: (text, record) => (
        <>
          <Space size="middle">
            {/* Block User Tooltip */}
            <Tooltip placement="left" title="">
              <Button
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                }}
                onClick={() => showCompanyBlockModal(record)}
              >
                {/* {console.log(record?.isBlocked)} */}

                {record?.isBlocked == true ? (
                  <RiDeviceRecoverLine
                    style={{ fontSize: "26px", color: "#ff9966" }}
                  />
                ) : (
                  <RiDeleteBin6Line
                    style={{ fontSize: "24px", color: "#C50000" }}
                  />
                )}
              </Button>
            </Tooltip>
            {/* View Details Tooltip */}
            <Tooltip placement="right" title="View Details">
              <Button
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  color: "#075B5D",
                }}
                onClick={() => showCompanyViewModal(record)}
              >
                <GoEye style={{ fontSize: "24px" }} />
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
        pagination={{
          current: meta?.page,
          pageSize: meta?.limit,
          total: meta?.total,
          onChange: onPageChange,
          showSizeChanger: true,
        }}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default AllUserTable;
