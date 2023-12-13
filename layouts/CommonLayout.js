import React from "react";
import SideBar from "../components/SideBar";
import CommonHeader from "../components/CommonHeader";

const CommonLayout = ({ children, itemCount, comp }) => {
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <SideBar />
        <div style={{ overflowY: "auto", flex: "9" }}>
          <div style={{ width: "100%", margin: "0px auto" }}>
            <CommonHeader count={itemCount} company={comp} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
