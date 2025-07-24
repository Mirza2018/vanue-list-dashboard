import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Input } from "antd";
import { useState } from "react";

//* Modal Table
import AccountRecoveryRequests from "../../Components/CustomerPage/AccountRecoveryRequests";
import AllCustomers from "../../Components/CustomerPage/AllCustomers";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddVisitor from "../../Components/Modal/Admin/AddVisitor";

const CustomersPage = () => {
  //* Store Search Value
  const [isCustomer, setIsCustomer] = useState(true);
  const [searchText, setSearchText] = useState("");

  const onSearch = (value) => {
    setSearchText(value);
  };
  const [isAddContentModalVisible, setIsAddContentModalVisible] =
    useState(false);
  const handleCancel = () => {
    setIsAddContentModalVisible(false);
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
            Visitors List
          </p>
        </div>
      </div>

      <div className="px-5 mt-5 ">
        <div
          onClick={() => setIsAddContentModalVisible(true)}
          className="bg-secondary-color text-primary-color flex justify-center items-center gap-2 py-2 w-full rounded-lg cursor-pointer"
        >
          <IoMdAddCircleOutline className="md:text-3xl text-2xl" />
          <p className="md:text-2xl text-lg font-semibold whitespace-nowrap">
            Add Visitor
          </p>
        </div>
      </div>
      <AddVisitor
        isAddCompanyModalVisible={isAddContentModalVisible}
        handleCancel={handleCancel}
      />
      <main className="p-5">
        <div className="flex md:flex-row md:gap-2 gap-5  flex-col  justify-start items-center   w-fit mt-5 mb-[21px] bg-base-color pe-1">
          <h1
            onClick={() => setIsCustomer(true)}
            className={`text-2xl cursor-pointer py-2 text-nowrap  text-center ${
              isCustomer
                ? "font-normal bg-secondary-color my-2 text-white  border-b-4 px-2"
                : "font-normal text-black  "
            }`}
          >
            All Visitors
          </h1>

          <h1
            onClick={() => setIsCustomer(false)}
            className={`text-2xl cursor-pointer py-2 text-nowrap  text-center ${
              isCustomer
                ? "font-normal text-black  "
                : "font-normal bg-secondary-color my-2 text-white  border-b-4 px-2 "
            }`}
          >
            Account Recovery Requests
          </h1>
        </div>
      </main>

      {/* Table  */}
      {isCustomer ? (
        <AllCustomers setSearchText={setSearchText} searchText={searchText} />
      ) : (
        <AccountRecoveryRequests
          setSearchText={setSearchText}
          searchText={searchText}
        />
      )}
    </div>
  );
};

export default CustomersPage;
