/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";

const AproveAccountModal = ({
  setApproveAccount,
  approveAccount,
  approveAccountRecord,
}) => {
  return (
    <Modal
      // title="Confirm Delete"
      open={approveAccount}
      onOk={() => setApproveAccount(false)}
      onCancel={() => setApproveAccount(false)}
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
            onClick={() => setApproveAccount(false)}
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
            style={{ background: "#3AD800" }}
            onClick={() => setApproveAccount(false)}
          >
            yes
          </Button>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4 text-center text-black">
        Do you want to Approve this request?
      </p>
    </Modal>
  );
};

export default AproveAccountModal;
