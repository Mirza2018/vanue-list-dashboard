import axios from "axios";
import { Button, ConfigProvider, Input, Modal, Spin, Table } from "antd";
import { SearchOutlined, TranslationOutlined } from "@ant-design/icons";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddCompanyModal from "../../Components/Modal/Admin/AddCategoriesModal";
import { useMemo, useState } from "react";
import { AllImages } from "../../../public/images/AllImages";
import { FaRegTrashCan } from "react-icons/fa6";
import ActiveCategories from "../../Components/CategoriesPage/ActiveCategories";
import DeleteCategories from "../../Components/CategoriesPage/DeleteCategories";
import AddContent from "../../Components/CategoriesPage/AddContent";
import { useGetCategoryQuery } from "../../redux/api/adminApi";

const CategoriesPage = () => {

  const [isAddCompanyModalVisible, setIsAddCompanyModalVisible] =
    useState(false);
  const [earning, setEarning] = useState(true);
  const [categoryAction, setCategoryAction] = useState("active");

  const [searchText, setSearchText] = useState("");
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

  const handleCancel = () => {
    setIsAddCompanyModalVisible(false);
  };
  const onSearch = (value) => {
    setSearchText(value);
  };

  const showAddCompanyModal = () => {
    setIsAddCompanyModalVisible(true);
  };


    return (
      <div
        className="bg-highlight-color min-h-[90vh]  rounded-xl"
        style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
      >
        {/* Header  */}
        <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" w-[95%] mx-auto  flex items-center justify-between">
            <p className="text-3xl text-primary-color font-semibold">
              Categories
            </p>
            <div className="flex gap-4 items-center"></div>
          </div>
        </div>
        <div className="flex md:flex-row md:gap-2 gap-5  flex-col  justify-start items-center   w-fit mt-5 mb-[21px] bg-base-color pe-1 mx-3 px-2">
          <h1
            onClick={() => setCategoryAction("active")}
            className={`text-2xl cursor-pointer py-2 text-nowrap  text-center ${
              categoryAction == "active"
                ? "font-normal bg-secondary-color md:my-2 text-white  border-b-4 px-2"
                : "font-normal text-black  "
            }`}
          >
            Active Categories
          </h1>

          <h1
            onClick={() => setCategoryAction("delete")}
            className={`text-2xl cursor-pointer py-2 text-nowrap  text-center md:border-x-2 md:px-2 border-black ${
              categoryAction == "delete"
                ? "font-normal bg-secondary-color md:my-2 text-white  border-b-4 border-white border-x-base-color px-2"
                : "font-normal text-black  "
            }`}
          >
            Deleted Categories
          </h1>
          {/* <h1
            onClick={() => setCategoryAction("add")}
            className={`text-2xl cursor-pointer py-2 text-nowrap  text-center ${
              categoryAction == "add"
                ? "font-normal bg-secondary-color md:my-2 text-white  border-b-4 px-2"
                : "font-normal text-black  "
            }`}
          >
            Add Contents
          </h1> */}
        </div>
        {/* Add Service User Button  */}
        <div className="px-5 mt-5 ">
          <div
            onClick={showAddCompanyModal}
            className="bg-secondary-color text-primary-color flex justify-center items-center gap-2 py-2 w-full rounded-lg cursor-pointer"
          >
            <IoMdAddCircleOutline className="md:text-3xl text-2xl" />
            <p className="md:text-2xl text-lg font-semibold whitespace-nowrap">
              Add Categories
            </p>
          </div>
        </div>

        {/* Modals */}
        <AddCompanyModal
          isAddCompanyModalVisible={isAddCompanyModalVisible}
          handleCancel={handleCancel}
        />
        <main className="p-5">
          {categoryAction == "active" && <ActiveCategories />}
          {categoryAction == "delete" && <DeleteCategories />}
          {/* {categoryAction == "add" && <AddContent />} */}
        </main>
      </div>
    );
};

export default CategoriesPage;
