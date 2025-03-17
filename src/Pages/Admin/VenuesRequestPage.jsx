import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Input } from "antd";
import React, { useEffect, useState } from "react";
import VenuesRequestSingle from "../../Components/VenuesRequest/VenuesRequestSingle";
import axios from "axios";
import { FaChevronLeft } from "react-icons/fa";

const VenuesRequestPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/VenseData.json");
        setData(response?.data); // Make sure this is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(data);

  return (
    <div className="bg-white rounded-tl-xl rounded-tr-xl h-full">
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p
            onClick={() => window.history.back()}
            className="text-3xl text-primary-color font-semibold flex justify-center items-center gap-2"
          >
            <FaChevronLeft />
            Venues Request
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 p-10">
        {data.map((singleData) => (
          <VenuesRequestSingle data={singleData} key={singleData?.sId} />
        ))}
      </div>
    </div>
  );
};

export default VenuesRequestPage;
