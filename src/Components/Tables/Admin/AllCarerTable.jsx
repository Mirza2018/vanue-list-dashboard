/* eslint-disable react/prop-types */
import { Button, Input, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { AllImages } from "../../../../public/images/AllImages";
import { useEffect, useState } from "react";

const getUniqueCompanyNames = (data) => {
  const companyNames = data.map((item) => item.companyName);
  return [...new Set(companyNames)]; // Remove duplicates by converting array to a Set and back to an array
};
const AllCarerTable = ({ data, loading, showViewCarerModal, pageSize = 0 }) => {
  // State for the search term in the company filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(""); // For storing the selected company filter

  // Fetch company query from URL and set initial state on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const companyFromUrl = queryParams.get("company");

    if (companyFromUrl) {
      setSearchTerm(decodeURIComponent(companyFromUrl)); // Set the search term based on the URL query
      setSelectedCompany(decodeURIComponent(companyFromUrl)); // Set the selected company for filtering
    }
  }, []); // Run this effect only once when the component mounts

  // Get unique company names from the data
  const uniqueCompanyNames = getUniqueCompanyNames(data);

  // Filter company names based on the search term
  // Filter company names based on the search term for the dropdown filter
  const filteredCompanyNames = uniqueCompanyNames.filter((companyName) =>
    companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter data based on the selected company (this will apply to the table)
  const filteredData = selectedCompany
    ? data.filter((record) => record.companyName === selectedCompany)
    : data;

  const columns = [
    {
      title: "#SI",
      dataIndex: "id",
      key: "id",
      responsive: ["md"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <div className="flex items-center gap-2">
          <img
            src={AllImages.userImage}
            alt={text}
            className="w-8 h-8 rounded-full"
          />
          <p>{text}</p>
        </div>
      ),
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
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          {/* Search input for filtering the dropdown */}
          <Input
            placeholder="Search Company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
            style={{ width: 188, marginBottom: 8 }}
          />
          <div className="flex flex-col items-start">
            {/* Display filtered company names as buttons */}
            {filteredCompanyNames.map((companyName) => (
              <Button
                className="!text-[#19363D]"
                key={companyName}
                type="link"
                onClick={() => {
                  setSelectedKeys([companyName]); // Set selected filter value
                  setSearchTerm(companyName); // Update the selected company filter
                  setSelectedCompany(companyName); // Update the selected company filter
                  confirm(); // Apply the filter
                }}
              >
                {companyName}
              </Button>
            ))}
          </div>
          <Space style={{ marginTop: 8 }}>
            <Button
              type="link"
              onClick={() => {
                clearFilters && clearFilters(); // Clear the filter
                setSelectedKeys([]);
                setSearchTerm(""); // Clear the search input field
                setSelectedCompany(""); // Clear the selected company filter
                confirm(); // Apply the filter
              }}
            >
              Reset
            </Button>
            <Button type="link" onClick={() => confirm && confirm()}>
              OK
            </Button>
          </Space>
        </div>
      ),
      filters: filteredCompanyNames.map((companyName) => ({
        text: companyName,
        value: companyName,
      })),
      onFilter: (value, record) => record.companyName === value, // Filter by exact company name match
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            {/* View Details Tooltip */}
            <Tooltip placement="right" title="View Details">
              <Button
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  color: "#222222",
                }}
                onClick={() => showViewCarerModal(record)}
              >
                <GoEye style={{ fontSize: "24px" }} />
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
        dataSource={filteredData}
        loading={loading}
        pagination={pageSize > 0 ? { pageSize } : false}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default AllCarerTable;
