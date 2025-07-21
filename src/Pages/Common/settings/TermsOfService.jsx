import { Button } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import {
  useGettermAndConditionsDataQuery,
  usePrivacyTermsMutation,
} from "../../../redux/api/adminApi";
import { toast } from "sonner";

const TermsOfService = () => {
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useGettermAndConditionsDataQuery();
  const displayedData = data ?? currentData;
  const [staticData] = usePrivacyTermsMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(displayedData?.data?.content);
  }, [displayedData]);

  const handleOnSave = async () => {
    const toastId = toast.loading("  Terms & Conditions is Posting...");

    const data = {
      key: "term_condition",
      content: content,
    };

    try {
      const res = await staticData(data).unwrap();
      console.log(res);
      toast.success("  Terms & Conditions post Successfully", {
        id: toastId,
        duration: 2000,
      });
      setContent("");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "There is an problem", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className=" bg-secondary-color w-full flex items-center p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <p className="text-2xl flex font-semibold text-white">
          <IoChevronBackOutline
            className="text-4xl cursor-pointer text-white  font-semibold"
            onClick={() => window.history.back()}
          />
          Terms & Conditions
        </p>
      </div>
      <div className=" flex justify-center items-center">
        <div className="w-full lg:w-[90%]">
          <div className="">
            <JoditEditor
              ref={editor}
              value={content}
              config={{ height: 500, theme: "light", readonly: false }}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
          <Button
            onClick={handleOnSave}
            className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
export default TermsOfService;
