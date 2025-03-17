import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import React from "react";
import { ConfigProvider } from "antd";
import { mainTheme } from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider theme={mainTheme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
