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
              marginLeft: "50px",
              border: "1px solid",
              height: "120vh",
              marginTop: "-100px",
              marginRight: "100px",
              overflowY: "auto"
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
