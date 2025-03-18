import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./SidebarManager.css";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaDropbox, FaRegUser } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { logout } from "../../../Features/user/authSlice";
import { useDispatch } from "react-redux";
import { signOut } from "../../../Api/authApi";
import useAuth from "../../../Hooks/useAuth";

function SidebarManager() {
  const location = useLocation(); // Get current route
  const isActive = (path) => location.pathname === path;
  const dispatch = useDispatch();
  const {avatar, firstName, lastName, roleName}= useAuth();

    const handleLogout = async () => {
      await signOut();
      dispatch(logout());
    };

  return (
    <div className="sidebar-manager">
      <div className="sidebar-header">
        <img
          src={"https://dragonball.guru/wp-content/uploads/2021/01/goku-dragon-ball-guru.jpg"}
          alt=""
        />
        <h2>{firstName} {lastName}</h2>
        <p>{roleName}</p>
      </div>

      <ul className="sidebar-menu">
        <hr />
        {/* <h3 style={{textAlign: "center"}}>Doanh số</h3> */}
        <li className={isActive("/manager") ? "active" : ""}>
          <Link to="/manager">Doanh thu <LuLayoutDashboard style={{fontSize: "15px"}}/></Link>
        </li>
        <hr />
        <h3 style={{textAlign: "center", fontSize: "25px"}}>Quản lý</h3>
        <li className={isActive("/manager/manager-product") ? "active" : ""}>
          <Link to="/manager/manager-product">Sản phẩm <FaDropbox /></Link>
        </li>
        <li className={isActive("/manager/manager-category") ? "active" : ""}>
          <Link to="/manager/manager-category">Loại sản phẩm <FaDropbox /></Link>
        </li>
        <li className={isActive("/manager/manager-skinType") ? "active" : ""}>
          <Link to="/manager/manager-skinType">Loại da <FaDropbox /></Link>
        </li>
        <hr />
        <li className={isActive("/manager/manager-account") ? "active" : ""}>
          <Link to="/manager/manager-account">Quan lý tài khoản <MdOutlineManageAccounts /></Link>
        </li>
        <li className={isActive("/manager/manager-profile") ? "active" : ""}>
          <Link to="/manager/manager-profile">Hồ sơ <FaRegUser /></Link>
        </li>
        <hr />
      </ul>

      <div className="sidebar-footer">
        <ul>
          {/* <li className={isActive("#") ? "active" : ""}>
            <Link to="#">Settings <IoSettingsOutline /></Link>
          </li> */}
          <li>
            <Link onClick={handleLogout}>Logout <FiLogOut /></Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SidebarManager;
