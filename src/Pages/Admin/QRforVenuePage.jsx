import { Select, Table, Button, QRCode, theme, Tooltip } from "antd";
// import logoImage from  "./logo.svg";

const { useToken } = theme;

import React, { useState } from "react";
import { render } from "react-dom";
import { AllImages } from "../../../public/images/AllImages";

const data = Array.from({ length: 8 }, (_, index) => ({
  key: (index + 1).toString(),
  slNumber: "01",
  userName: "Robert Fox",
  qrCode: "https://yourapp.com/user/1",
  generatedAt: "abc@gmail.com",
}));

// Define the columns for the table
const columns = [
  {
    title: "S.lD",
    dataIndex: "slNumber",
    key: "slNumber",
  },
  {
    title: "User Name",
    dataIndex: "userName",
    key: "userName",
    render: (text) => (
      <div className="flex gap-2 justify-start items-center">
        <img src={AllImages.user} className="rounded-full w-12" alt="" />{" "}
        <p>{text}</p>
      </div>
    ),
  },
  {
    title: "QR Code Link",
    dataIndex: "qrCode",
    key: "qrCode",
  },
  {
    title: "QR Code Link",
    dataIndex: "generatedAt",
    key: "generatedAt",
  },
];
function doDownload(url, fileName) {
  const a = document.createElement("a");
  a.download = fileName;
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
const QRforVenuePage = () => {
  const [value, setValue] = useState(null);
  const [copied, setCopied] = useState(false);
  const [qr, setQr] = useState(false);
  const downloadSvgQRCode = () => {
    const svg = document.getElementById("myqrcode")?.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    doDownload(url, "QRCode.svg");
  };
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      // Reset the "Copied!" message after 2 seconds
      setTimeout(() => setCopied(false), 400);
    } catch (err) {
      console.error("Failed to copy value: ", err);
    }
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
            QR Code Generation
          </p>
          <div className="flex gap-4 items-center"></div>
        </div>
      </div>
      <main className="py-4 px-9">
        <h1 className="text-2xl mb-4">Select User</h1>

        <Select
          name="mirza"
          //   onChange={(e) => console.log(e)}
          onChange={(e) => setValue(e)}
          className="mb-4"
          showSearch
          placeholder="Select a person"
          style={{ width: "100%" }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={users}
        />
        {value && (
          <h1 className="bg-base-color mb-4 py-3 px-4 rounded-xl">
            Profile is complete! You can generate a QR code.
          </h1>
        )}

        <button
          disabled={!value}
          onClick={() => setQr(!qr)}
          className={`text-lg font-normal  py-3 px-[18px] rounded-lg flex items-center gap-4 w-fit cursor-pointer select-none ${
            value ? "bg-secondary-color text-white" : " bg-[#6C757D] text-white"
          }`}
        >
          Generate QR Code
        </button>
        {qr && (
          <div className="flex flex-col gap-3 justify-center items-center p-5">
            <h1 className="text-4xl">Generated QR Code</h1>
            <QRCode
              id="myqrcode"
              type={"svg"}
              value={value}
              bgColor="#fff"
              color="#075B5D"
              style={{
                marginBottom: 16,
              }}
            />
            {value}
            <section className="flex gap-4">
              <div
                onClick={downloadSvgQRCode}
                className="text-base font-normal bg-secondary-color text-white py-3 px-5 rounded-lg flex items-center gap-4 w-fit cursor-pointer"
              >
                Download QR Code
              </div>
              <Tooltip title={copied ? "Copied!" : "Copy Link"}>
                <div
                  className="text-lg font-normal bg-[#6C757D] text-white py-3 px-5 rounded-lg flex items-center gap-4 w-fit cursor-pointer hover:bg-[#5a6268] transition-colors"
                  onClick={handleCopyClick}
                >
                  {copied ? "Copied!" : "Copy Link"}
                </div>
              </Tooltip>
            </section>
          </div>
        )}
        <h1 className="text-2xl mb-4 mt-8">QR Code Generation History</h1>
        <div className="">
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 8,
              total: 250, // Total number of items
              showSizeChanger: true,
              pageSizeOptions: ["8", "60", "120"],
              defaultCurrent: 1,
              showTotal: (total, range) =>
                `SHOWING ${range[0]}-${range[1]} OF ${total}`,
            }}
            className="custom-table"
          />
        </div>
      </main>
    </div>
  );
};

export default QRforVenuePage;

const users = [
  { value: "1", label: "Aiden" },
  { value: "2", label: "Sophie" },
  { value: "3", label: "Liam" },
  { value: "4", label: "Olivia" },
  { value: "5", label: "Ethan" },
  { value: "6", label: "Isabella" },
  { value: "7", label: "Noah" },
  { value: "8", label: "Ava" },
  { value: "9", label: "Mason" },
  { value: "10", label: "Mia" },
  { value: "11", label: "Lucas" },
  { value: "12", label: "Emma" },
  { value: "13", label: "James" },
  { value: "14", label: "Charlotte" },
  { value: "15", label: "Henry" },
];
