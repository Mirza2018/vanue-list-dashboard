/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";

const ContentRemoveModal = ({ setIsRemove, isRemove }) => {
  return (
    <Modal
      // title="Confirm Delete"
      open={isRemove}
      onOk={() => setIsRemove(false)}
      onCancel={() => setIsRemove(false)}
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
            onClick={() => setIsRemove(false)}
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
            style={{ background: "#C70000" }}
            onClick={() => setIsRemove(false)}
          >
            yes
          </Button>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4 text-center text-black">
        Do you want to Remove this Content?
      </p>
    </Modal>
  );
};

export default ContentRemoveModal;
