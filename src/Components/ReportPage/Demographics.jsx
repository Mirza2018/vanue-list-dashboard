import React, { useRef } from "react";
import { AllIcons, AllImages } from "../../../public/images/AllImages";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Demographics = () => {
  const contractRef = useRef();
  const handlePrint = async () => {
    if (!contractRef.current) return;

    try {
      const canvas = await html2canvas(contractRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ADD9DA",
        width: contractRef.current.scrollWidth,
        height: contractRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 5;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("Contract_SLUTSEDDEL.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };
  return (
    <section className="bg-base-color py-4 px-3 rounded flex flex-col justify-between flex-1">
      <div ref={contractRef}>
        <div className="w-full px-2">
          <div className="flex gap-[10px] justify-center mb-[10px]">
            <img src={AllIcons.monthReport} alt="" />
            <h1 className="text-base font-bold">Demographics</h1>
          </div>
          <div className="flex flex-col gap-[5px]">
            <div className="text-sm border-b border-white flex justify-between pb-[5px] gap-2 items-center">
              <h1 className="font-semibold">Gender Demographics:</h1>
              <div className="flex flex-col justify-end items-end">
                <p>Male: 4,321</p>
                <p>Female: 4,321</p>
              </div>
            </div>
            <div className="text-sm border-b border-white flex justify-between pb-[5px] gap-2 items-center">
              <h1 className="font-semibold">Age Demographics:</h1>{" "}
              <div className="">
                <p>12-25: 200</p>
                <p>25-35: 300</p>
                <p>35-50: 400</p>
                <p>50-80: 500</p>
              </div>
            </div>
            <div className="text-sm border-b border-white flex justify-between pb-[5px] gap-2">
              <h1 className="font-semibold">Country Demographics::</h1>
              <p>5 Countries</p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handlePrint}
        className={`text-lg font-normal mt-5  py-3 px-[18px] rounded-2xl flex items-center gap-4 w-fit cursor-pointer select-none bg-secondary-color text-white`}
      >
        Export as PDF
      </button>
    </section>
  );
};

export default Demographics;
