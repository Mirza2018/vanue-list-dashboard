import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import React from "react";
import { ConfigProvider } from "antd";
import { mainTheme } from "./theme";
import Providers from "./redux/lib/Providers";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider theme={mainTheme}>
      <Providers>
        <Toaster richColors position={"top-center"} />
        <RouterProvider router={router} />
      </Providers>
    </ConfigProvider>
  </React.StrictMode>
);
