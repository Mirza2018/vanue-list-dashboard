/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AllImages } from "../../../../public/images/AllImages";

const AccountRecoveryTable = ({
  data,
  loading,
  showCompanyViewModal,
  showCompanyBlockModal,
  setApproveAccount,
  ApproveAccountRecord,
  onPageChange,
  meta,
}) => {
  const columns = [
    // {
    //   title: "S.lD",
    //   dataIndex: "id",
    //   key: "id",
    //   responsive: ["md"],
    // },
    {
      title: "Full Name",
      dataIndex: "userId",
      key: "userId",
      render: (text) => (
        <div className="flex items-center gap-2">
          {/* <img
            src={AllImages.yellow}
            alt={text}
            className="w-8 h-8 rounded-full"
          /> */}
          <p>{text?.fullName}</p>
        </div>
      ),
    },
    {
      title: "Gender",
      dataIndex: "userId",
      key: "userId",
      render: (text) => (
        <div className="flex items-center gap-2">
          {/* <img
            src={AllImages.yellow}
            alt={text}
            className="w-8 h-8 rounded-full"
          /> */}
          <p>{text?.gender}</p>
        </div>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <div className="flex items-center gap-2">
          {text != "pending" ? (
            <button className="bg-[#3AD800] rounded px-1 py-1">Approved</button>
          ) : (
            <button className="bg-[#FFE100] rounded px-3 py-1">Pending</button>
          )}
        </div>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <div className="flex items-center gap-2">
            {/* Block User Tooltip */}
            {record?.status == "pending" && (
              <>
                <Tooltip placement="left" title="">
                  <Button
                    className="bg-[#3AD800] rounded px-3 py-1"
                    onClick={() => ApproveAccountRecord(record)}
                  >
                    Approve
                  </Button>
                </Tooltip>
                <Tooltip placement="left" title="">
                  <Button
                    className="bg-[#C70000] text-white rounded px-3 py-1"
                    onClick={() => showCompanyBlockModal(record)}
                  >
                    Reject
                  </Button>
                </Tooltip>
              </>
            )}

            <Tooltip placement="right" title="View Details">
              <Button
                className="bg-[#8C8C8C] text-white rounded px-3 py-1"
                onClick={() => showCompanyViewModal(record)}
              >
                View Details
              </Button>
            </Tooltip>
          </div>
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

export default AccountRecoveryTable;
