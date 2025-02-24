import { useState } from "react";
import {
  ShoppingCartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logo from "../assets/images/logo.png";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
const { Header, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link to={`/staff/manage-${key}`}>{label}</Link>,
  };
}
const items = [
  getItem("order", "order", <ShoppingCartOutlined />),
  getItem("review", "review", <UserOutlined />),
];
const StaffLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ background: "#124841" }}
      >
        <div className="demo-logo-vertical" />

        {/* Đặt logo vào div riêng để căn giữa */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100px",
          }}
        >
          <img src={logo} alt="Logo" width={collapsed ? 50 : 100} />
        </div>

        {/* Menu với margin-top để tách logo và menu */}
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{ background: "#124841", width: "100%" }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          {/* Dòng chữ "This is Admin Page" */}
          <h1 style={{ margin: 0, fontSize: 24 }}>Staff Page</h1>
          <div style={{ width: 64 }}></div>
        </Header>

        <Content
          style={{
            margin: "16px 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default StaffLayout;
