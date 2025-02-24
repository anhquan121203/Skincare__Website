import { useState } from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import SidebarStaff from "../Components/StaffComponent/SidebarStaff/SidebarStaff";

const { Sider, Content } = Layout;

const StaffLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh", width: "100vw", marginTop: "-100px" }}>
      {/* menu siderbar nằm ở đayy */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{ height: "100vh" }}
      >
        <SidebarStaff collapsed={collapsed} setCollapsed={setCollapsed} />
      </Sider>

      {/* chỗ chứa còn tennnnn nằm ở đâyy */}
      <Layout style={{ width: "100%" }}>
        <Content
          style={{
            margin: "0px",
            padding: "20px",
            background: colorBgContainer,
            borderRadius: "8px",
            overflowY: "auto",
            height: "100vh",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default StaffLayout;
