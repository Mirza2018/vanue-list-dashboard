import { useState } from "react";

//* Modal Table
import { IoMdAddCircleOutline } from "react-icons/io";
import AllDiscoverMauritius from "../../Components/CustomerPage/AllDiscoverMauritius";
import AddMauritius from "../../Components/Modal/Admin/AddMauritius";

const DiscoverMauritius = () => {
  const [isAddContentModalVisible, setIsAddContentModalVisible] =
    useState(false);
  const handleCancel = () => {
    setIsAddContentModalVisible(false);
  };
  const [searchText, setSearchText] = useState("");

  const onSearch = (value) => {
    setSearchText(value);
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
            Discover Mauritius
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
            Add Discover Mauritius
          </p>
        </div>
      </div>
      <AddMauritius
        isAddCompanyModalVisible={isAddContentModalVisible}
        handleCancel={handleCancel}
      /> 

      {/* Table  */}

      <AllDiscoverMauritius
        setSearchText={setSearchText}
        searchText={searchText}
      />
    </div>
  );
};

export default DiscoverMauritius;
