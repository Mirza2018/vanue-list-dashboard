import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getSocketUrl } from "../../redux/getBaseUrl";


const SocketConnection = ({ setIsNewNotificationCount }) => {


  const allInfo = JSON.parse(localStorage.getItem("persist:tiktok_voteing"));
  const token = JSON.parse(allInfo?.auth).accessToken;

  const socketUrl = getSocketUrl();

  useEffect(() => {
    const socket = io(socketUrl, {
      transports: ["websocket"],
      auth: { token },
    });
    //Socket connect
    socket.on("connect", () => {
        console.log("connected");
        
    });
    ///socket Disconnect
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
    //Socket connect error
    socket.on("connect_error", (err) => {
      // log("Connection error:", err);
    });

    socket.on("message", (message) => {
      // setMessages((prev) => [...prev, message]);
      // console.log("Message recevied", message);
    });

    socket.on("notification", (data) => {
      console.log("Notification recevied", data?.unreadCount);
      setIsNewNotificationCount(data?.unreadCount);
    });

    socket.onAny((eventName, ...args) => {
      // console.log("Event Recived", eventName, args);
    });

    return () => {
      socket.disconnect();
    };
  });

  // console.log("messages", messages);

  return <div></div>;
};

export default SocketConnection;
