import React from "react";
import Header from "../Components/CustomerComponent/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Components/CustomerComponent/Footer/Footer";

function CustomerLayout() {
  return (
    <>
      <div className="header ">
        <Header />
      </div>

      <div className="outlet" style={{ margin: 0 }}>
        <Outlet />
      </div>

      <div style={{margin: 0}}>
        <Footer />
      </div>
    </>
  );
}

export default CustomerLayout;
