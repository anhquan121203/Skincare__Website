import {
  ShoppingOutlined,
  ShopOutlined,
  UserOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { Menu, Layout, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../../Features/user/authSlice";
import { signOut } from "../../../Api/authApi";
import useAuth from "../../../Hooks/useAuth";

const { Sider } = Layout;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label: <Link to={`/staff/staff-manage-${key}`}>{label}</Link>,
  };
}

const items = [
  getItem("Hồ sơ nhân viên", "profile", <UserOutlined />),
  getItem("Đơn hàng", "order", <ShoppingOutlined />),
  getItem("Sản phẩm", "product", <ShopOutlined />),
  getItem("Bình luận", "feedback", <CommentOutlined />),
];

const SidebarStaff = ({ collapsed, setCollapsed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lastName, firstName } = useAuth();

  const handleLogout = async () => {
    await signOut();
    dispatch(logout());
    navigate("/");
  };

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
            <div>{firstName + " " + lastName}</div>
            <div style={{ fontSize: "12px", opacity: 0.7 }}>
              Vị trí: Nhân viên
            </div>
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

      <Menu
        theme="dark"
        mode="inline"
        style={{ width: "100%", marginTop: "300px" }}
      >
        <Menu.Item key="" icon={<FiLogOut />}>
          <Link to={"/"}>Quay lại</Link>
        </Menu.Item>
        <Menu.Item key="logout" icon={<FiLogOut />}>
          <Link onClick={handleLogout}>Thoát</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarStaff;
