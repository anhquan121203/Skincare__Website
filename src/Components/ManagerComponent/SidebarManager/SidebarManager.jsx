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

function SidebarManager() {
  const location = useLocation(); // Get current route
  const isActive = (path) => location.pathname === path;
  const dispatch = useDispatch();

    const handleLogout = async () => {
      await signOut();
      dispatch(logout());
    };

  return (
    <div className="sidebar-manager">
      <div className="sidebar-header">
        <img
          src="https://i.pinimg.com/736x/34/60/3c/34603ce8a80b1ce9a768cad7ebf63c56.jpg"
          alt=""
        />
        <h2>Nguyen Van Quan</h2>
        <p>Administrator</p>
      </div>

      <ul className="sidebar-menu">
        <li className={isActive("/manager") ? "active" : ""}>
          <Link to="/manager">Dashboard <LuLayoutDashboard style={{fontSize: "15px"}}/></Link>
        </li>
        <hr />
        <h3 style={{alignItems: "center"}}>Manager</h3>
        <li className={isActive("/manager/manager-product") ? "active" : ""}>
          <Link to="/manager/manager-product">Products <FaDropbox /></Link>
        </li>
        <li className={isActive("/manager/manager-category") ? "active" : ""}>
          <Link to="/manager/manager-category">Category <FaDropbox /></Link>
        </li>
        <hr />
        <li className={isActive("") ? "active" : ""}>
          <Link to="">Manage Account <MdOutlineManageAccounts /></Link>
        </li>
        <li className={isActive("#") ? "active" : ""}>
          <Link to="#">Profile <FaRegUser /></Link>
        </li>
        <li className={isActive("#") ? "active" : ""}>
          <Link to="#">About Us</Link>
        </li>
      </ul>

      <div className="sidebar-footer">
        <ul>
          <li className={isActive("#") ? "active" : ""}>
            <Link to="#">Settings <IoSettingsOutline /></Link>
          </li>
          <li>
            <Link onClick={handleLogout}>Logout <FiLogOut /></Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SidebarManager;
