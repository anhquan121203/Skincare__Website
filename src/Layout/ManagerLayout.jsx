import React from "react";
import SidebarManager from "../Components/ManagerComponent/SidebarManager/SidebarManager";
import { Outlet } from "react-router-dom";
import { Col, Row } from "antd";

function ManagerLayout() {
  return (
    <>
      <Row>
        <Col flex={1}>
          <SidebarManager />
        </Col>
        <Col flex={5}>
          <div
            style={{
              position: "fixed", 
              left: "300px", 
              top: "0", 
              // border: "1px solid",
              width: "84vw", 
              maxWidth: "100%",
              height: "100vh", 
              marginTop: "0", 
              overflowY: "auto",
              overflowX: "hidden",
              // backgroundColor: "aliceblue", 
              // zIndex: 1000, 
            }}
          >
            <Outlet />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ManagerLayout;
