/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { RiDeleteBin6Line, RiDeviceRecoverLine } from "react-icons/ri";
import { AllImages } from "../../../../public/images/AllImages";

const AllMauritiusTable = ({
  data,
  loading,
  showCompanyViewModal,
  showCompanyBlockModal,
  pageSize = 0,
}) => {
  const columns = [
    {
      title: "Full Name",
      dataIndex: "venueId",
      key: "venueId",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <img
            src={text?.profileImage}
            alt={text?.name}
            className="w-8 h-8 rounded-full"
          />
          <p>{text?.name}</p>
        </div>
      ),
    },
    {
      title: "WebsiteUrl",
      dataIndex: "venueId",
      key: "venueId",
      render: (text) => <p>{text?.websiteUrl}</p>,
    },

    {
      title: "Address",
      dataIndex: "venueId",
      key: "venueId",
      render: (text) => <p>{text?.postalAddress}</p>,
    },
    {
      title: "Video",
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

    // {
    //   title: "Action",
    //   key: "isBlocked",
    //   render: (text, record) => (
    //     <>
    //       <Space size="middle">
    //         {/* Block User Tooltip */}

    //         {/* View Details Tooltip */}
    //         <Tooltip placement="right" title="View Details">
    //           <Button
    //             className="!p-0"
    //             style={{
    //               background: "#FFFFFF",
    //               border: "none",
    //               color: "#075B5D",
    //             }}
    //             onClick={() => showCompanyViewModal(record)}
    //           >
    //             <GoEye style={{ fontSize: "24px" }} />
    //           </Button>
    //         </Tooltip>
    //       </Space>
    //     </>
    //   ),
    // },
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

export default AllMauritiusTable;
