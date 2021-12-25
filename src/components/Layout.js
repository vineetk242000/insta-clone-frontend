import React from "react";
import { useLocation } from "react-router-dom";

const Layout = (props) => {
  const location = useLocation();
  if (location.pathname === "/register" || location.pathname === "/login") {
    return <div>{props.children}</div>;
  } else {
    return <div style={{ marginTop: "75px" }}>{props.children}</div>;
  }
};

export default Layout;
