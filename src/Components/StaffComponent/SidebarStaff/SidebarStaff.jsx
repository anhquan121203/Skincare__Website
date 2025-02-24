import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Layout, Divider, Avatar } from "antd";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const { Sider } = Layout;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label: <Link to={`/staff/manage-${key}`}>{label}</Link>,
  };
}

const items = [
  getItem("Order", "order", <ShoppingCartOutlined />),
  getItem("Review", "review", <UserOutlined />),
];

const SidebarStaff = ({ collapsed, setCollapsed }) => {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      {/* edit hình ảnh avatar */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "150px",
          padding: "10px 0",
        }}
      >
        <Avatar
          src="https://i.pinimg.com/736x/34/60/3c/34603ce8a80b1ce9a768cad7ebf63c56.jpg"
          size={collapsed ? 50 : 80}
        />
        {!collapsed && (
          <div
            style={{ textAlign: "center", marginTop: "10px", color: "white" }}
          >
            <div>Vo Van Phuc An</div>
            <div style={{ fontSize: "12px", opacity: 0.7 }}>Actor: Staff</div>
          </div>
        )}
      </div>

      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        style={{ width: "100%", flex: 1 }}
      />

      <div style={{ flexGrow: 1 }}></div>

      <Divider style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

      <Menu theme="dark" mode="inline" style={{ width: "100%" }}>
        <Menu.Item key="settings" icon={<IoSettingsOutline />}>
          <Link to="#">Settings</Link>
        </Menu.Item>
        <Menu.Item key="logout" icon={<FiLogOut />}>
          <Link to="/">Logout</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarStaff;
