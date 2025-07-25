/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { RiDeleteBin6Line, RiDeviceRecoverLine } from "react-icons/ri";
import { AllImages } from "../../../../public/images/AllImages";
import { getImageUrl } from "../../../redux/getBaseUrl";
import { FaRegEdit } from "react-icons/fa";

const AllVenseTable = ({
  data, 
  loading,
  showVenueViewModal,
  showVenueBlockModal,
  showVenueEditModal,
  onPageChange,
  meta,
}) => {
  const columns = [
    // {
    //   title: "S.lD",
    //   dataIndex: "sId",
    //   key: "sId",
    //   responsive: ["md"],
    // },
    {
      title: "Venue Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <img
            src={record?.profileImage}
            alt={text}
            className="w-8 h-8 rounded-full"
          />
          {/* {console.log(getImageUrl() + record?.profileImage)} */}

          <p>{text}</p>
        </div>
      ),
    },

    {
      title: "website Url",
      dataIndex: "websiteUrl",
      key: "websiteUrl",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "postalAddress",
      key: "postalAddress",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            {/* Block User Tooltip */}
            <Tooltip placement="left" title="Block this User">
              {/* <Button
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  color: "#C50000",
                }}
                onClick={() => showVenueBlockModal(record)}
              >
                <RiDeleteBin6Line style={{ fontSize: "24px" }} />
              </Button> */}

              <Button
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                }}
                onClick={() => showVenueBlockModal(record)}
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
                onClick={() => showVenueViewModal(record)}
              >
                <GoEye style={{ fontSize: "24px" }} />
              </Button>
            </Tooltip>
            <Tooltip placement="right" title="Edit website url">
              <Button
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  color: "#0000FF",
                }}
                onClick={() => showVenueEditModal(record)}
              >
                <FaRegEdit style={{ fontSize: "24px" }} />
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

export default AllVenseTable;
