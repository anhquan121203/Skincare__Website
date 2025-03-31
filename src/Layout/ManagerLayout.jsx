import React from "react";
import SidebarManager from "../Components/ManagerComponent/SidebarManager/SidebarManager";
import { Outlet } from "react-router-dom";
import { Col, Layout, Row } from "antd";
import ManagerHeader from "../Components/ManagerComponent/ManagerHeader/ManagerHeader";
import Header from "../Components/CustomerComponent/Header/Header";

function ManagerLayout() {
  return (
    // <>
      
    //   <Row>
    //     <Col flex={1}>
    //       <SidebarManager />
    //     </Col>
    //     <Col flex={5}>
    //       <div
    //         style={{
    //           position: "fixed",
    //           left: "300px",
    //           top: "0",
    //           // border: "1px solid",
    //           width: "84vw",
    //           maxWidth: "100%",
    //           height: "100vh",
    //           marginTop: "0",
    //           overflowY: "auto",
    //           overflowX: "hidden",
    //           // backgroundColor: "aliceblue",
    //           // zIndex: 1000,
    //         }}
    //       >
    //         <Outlet />
    //       </div>
    //     </Col>
    //   </Row>
    // </>

    <Layout >
      <ManagerHeader />
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
              width: "84vw",
              // maxWidth: "100%",
              marginTop: "100px",
              overflowY: "auto",
              overflowX: "hidden",
              height: "calc(100vh - 64px)"
            }}
          >
            <Outlet />
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default ManagerLayout;
