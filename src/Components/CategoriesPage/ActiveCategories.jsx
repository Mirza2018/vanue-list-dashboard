import { Button, Modal, Spin, Table } from "antd";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "sonner";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "../../redux/api/adminApi";
import { FaEdit } from "react-icons/fa";
import EditCompanyModel from "../Modal/Admin/EditCompanyModel";
const data = Array.from({ length: 8 }, (_, index) => ({
  key: (index + 1).toString(),
  // slNumber: "#1234",
  userName: "Mirza",
  categoryName: "toy",
  categoryImage: "photo",
}));

const ActiveCategories = () => {

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
    useGetCategoryQuery(filters);
  const [categoryDelete] = useDeleteCategoryMutation();
  const displayedData = data ?? currentData;
  // console.log(displayedData?.data);

  const [blockModal, setBlockModal] = useState(false);
  const [blockModal2, setBlockModal2] = useState(false);
  const [id, setId] = useState(null);
  const handleCancel = () => {
    setBlockModal2(false);
  };
  const handleDelete = async () => {
    const toastId = toast.loading("Category is deleteing...");
    try {
      const res = await categoryDelete(id?._id).unwrap();
      console.log(res);
      toast.success("Category is delete successfully", {
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
        <>
          <img src={text} className="w-24 h-14 rounded-md object-cover" />
        </>
      ),
    },
    {
      title: "Action",
      key: "_id",
      render: (text) => (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setBlockModal(true);
              setId(text);
            }}
            type="text"
            icon={<FaRegTrashCan className="text-xl" />}
            className="!text-red-600 !hover:text-red-800"
          />
          <Button
            onClick={() => {
              setBlockModal2(true);
              setId(text);
            }}
            type="text"
            icon={<FaEdit className="text-xl" />}
            className="!text-red-600 !hover:text-red-800"
          />
        </div>
      ),
    },
  ];

  if (isLoading)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (!isLoading && isFetching)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (isSuccess && displayedData)
    return (
      <div>
        <Table
          columns={columns}
          dataSource={displayedData?.data?.result}
          pagination={{
            current: displayedData?.data?.meta?.page,
            pageSize: displayedData?.data?.meta?.limit,
            total: displayedData?.data?.meta?.total,
            onChange: onPageChange,
            showSizeChanger: true,
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
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          }
        >
          <p className="text-3xl font-semibold pt-10 pb-4 text-center text-black">
            Do you want to Delete this user?
          </p>
        </Modal>
        <EditCompanyModel
          data={id}
          isAddCompanyModalVisible={blockModal2}
          handleCancel={handleCancel}
        />
      </div>
    );
};

export default ActiveCategories;
