import React, { useState } from "react";
import { Button, ConfigProvider, Input, Modal, Table } from "antd";
import { FaRegTrashCan } from "react-icons/fa6";
import { AllIcons, AllImages } from "../../../public/images/AllImages";
import {
  useGetdeleteCategoryQuery,
  useRecoveryCategoryMutation,
} from "../../redux/api/adminApi";
import { toast } from "sonner";
// const data = Array.from({ length: 8 }, (_, index) => ({
//   key: (index + 1).toString(),
//   // slNumber: "#1234",
//   userName: "Mirza",
//   categoryName: "toy",
//   categoryImage: "photo",
// }));

const DeleteCategories = () => {
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useGetdeleteCategoryQuery();

  const displayedData = data ?? currentData;
  const [recovaryCategory] = useRecoveryCategoryMutation();
  const [categoryId, setCategoryId] = useState(null);

  const [blockModal, setBlockModal] = useState(false);

  const handleRecovery = async () => {
    const toastId = toast.loading("Category is recovering...");
    try {
      const res = await recovaryCategory({id:categoryId}).unwrap();
      console.log(res);
      toast.success("Category is recover successfully", {
        id: toastId,
        duration: 2000,
      });
      setBlockModal(false);
    } catch (error) {
      console.log(error);
      toast.error("There is an problem, please try later", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const columns = [
    {
      title: "Category Serial",
      dataIndex: "_id",
      key: "_id",
      render: (text, _, index) => (
        <div className="text-center">{index + 1}</div>
      ),
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img src={text} className="w-24 h-14 rounded-md object-cover" />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setBlockModal(true);
              setCategoryId(record?._id);
            }}
            type="text"
            icon={<img src={AllIcons.recover} />}
            // className="!text-red-600 !hover:text-red-800"
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={displayedData?.data?.result}
        pagination={{
          pageSize: 8,
          total: displayedData?.data?.result?.length, // Total number of items
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
              style={{ background: "#075B5D" }}
              onClick={handleRecovery}
            >
              Yes
            </Button>
          </div>
        }
      >
        <p className="text-3xl font-semibold pt-10 pb-4 text-center text-black">
          Do you want to recover this category?
        </p>
      </Modal>
    </div>
  );
};

export default DeleteCategories;
