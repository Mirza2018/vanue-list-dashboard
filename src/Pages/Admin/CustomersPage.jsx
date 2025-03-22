import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ConfigProvider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IoMdAddCircleOutline } from "react-icons/io";

//* Modal Table
import AllUserTable from "../../Components/Tables/Admin/AllUserTable";
import ViewUserModal from "../../Components/Modal/Admin/ViewUserModal";
import BlockUserModal from "../../Components/Modal/Admin/BlockUserModal";
import AddCategoriesModal from "../../Components/Modal/Admin/AddCategoriesModal";
import AllCustomers from "../../Components/CustomerPage/AllCustomers";
import AccountRecoveryRequests from "../../Components/CustomerPage/AccountRecoveryRequests";

const CustomersPage = () => {
  //* Store Search Value
  const [isCustomer, setIsCustomer] = useState(true);
  const [searchText, setSearchText] = useState("");

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
            Customers List
          </p>
          <div className="flex gap-4 items-center">
            <ConfigProvider
              theme={{ token: { colorTextPlaceholder: "#f3f3f3" } }}
            >
              <Input
                placeholder="Search User..."
                value={searchText}
                onChange={(e) => onSearch(e.target.value)}
                className="font-semibold !border-primary-color !placeholder:text-secondary-color !bg-white text-secondary-color py-2 !rounded-full"
                prefix={
                  <SearchOutlined className="text-secondary-color font-bold text-lg mr-2" />
                }
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
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
            All Customers
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
      {
        isCustomer ? (
          <AllCustomers
            setSearchText={setSearchText}
            searchText={searchText}
          />
        ) : (
          <AccountRecoveryRequests
            setSearchText={setSearchText}
            searchText={searchText}
          />
        )
      }
      {/* <AllCustomers setSearchText={setSearchText} searchText={searchText} />
      <AccountRecoveryRequests
        setSearchText={setSearchText}
        searchText={searchText}
      /> */}
    </div>
  );
};

export default CustomersPage;
