import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SidebarManager.css";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  FaDropbox,
  FaRegQuestionCircle,
  FaRegUser,
  FaShoppingCart,
} from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { logout } from "../../../Features/user/authSlice";
import { useDispatch } from "react-redux";
import { signOut } from "../../../Api/authApi";
import useAuth from "../../../Hooks/useAuth";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiQuestionAnswerLine,
} from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import ManagerHeader from "../ManagerHeader/ManagerHeader";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";

function SidebarManager() {
  const location = useLocation(); // Get current route
  const isActive = (path) => location.pathname === path;
  const dispatch = useDispatch();
  const { avatar, firstName, lastName, roleName } = useAuth();

  const [isManagerOpen, setManagerOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    dispatch(logout());
  };

  return (
    <div className="sidebar-manager">
      {/* <div className="sidebar-header">
        <img src={avatar} alt="" />
        <h2>
          {firstName} {lastName}
        </h2>
        <p>{roleName}</p>
      </div> */}

      <ul className="sidebar-menu">
        {/* <hr /> */}
        <h3 style={{ textAlign: "center" }}>Doanh số</h3>
        <li className={isActive("/manager") ? "active" : ""}>
          <Link to="/manager">
            <LuLayoutDashboard className="manager-icon" /> Doanh thu
          </Link>
        </li>
        <hr />

        {/* Manager Product Dropdown */}
        <h3 style={{ textAlign: "center", fontSize: "20px" }}>Quản lý</h3>

        <ul>
          <li className={isActive("/manager/manager-product") ? "active" : ""}>
            <Link to="/manager/manager-product">
              <FaDropbox className="manager-icon" /> Sản phẩm
            </Link>
          </li>
          <li className={isActive("/manager/manager-category") ? "active" : ""}>
            <Link to="/manager/manager-category">
              <BiCategoryAlt className="manager-icon" /> Loại sản phẩm
            </Link>
          </li>
          <li className={isActive("/manager/manager-skinType") ? "active" : ""}>
            <Link to="/manager/manager-skinType">
              <FaDropbox className="manager-icon" /> Loại da
            </Link>
          </li>
          <li
            className={
              isActive("/manager/manager-skinCareRoutines") ? "active" : ""
            }
          >
            <Link to="/manager/manager-skinCareRoutines">
              <AiOutlineDeliveredProcedure  className="manager-icon" /> Quy trình chăm sóc da
            </Link>
          </li>
          <li
            className={isActive("/manager/manager-stepRoutine") ? "active" : ""}
          >
            <Link to="/manager/manager-stepRoutine">
              <FaDropbox className="manager-icon" /> Các bước chăm sóc da
            </Link>
          </li>
        </ul>

        <hr />

        {/* Manager Skin Type********************************************* */}
        <h3 style={{ textAlign: "center", fontSize: "20px" }}>
          Câu hỏi loại da
        </h3>
        <li
          className={isActive("/manager/manager-skinQuestion") ? "active" : ""}
        >
          <Link to="/manager/manager-skinQuestion">
            <FaRegQuestionCircle className="manager-icon" /> Câu hỏi về da
          </Link>
        </li>
        <li className={isActive("/manager/manager-skinAnswer") ? "active" : ""}>
          <Link to="/manager/manager-skinAnswer">
            <RiQuestionAnswerLine className="manager-icon" /> Câu trả lời
          </Link>
        </li>

        <hr />
        {/* Manager order */}
        <h3 style={{ textAlign: "center", fontSize: "20px" }}>Quản lý order</h3>
        <li className={isActive("/manager/manager-order") ? "active" : ""}>
          <Link to="/manager/manager-order">
            <FaShoppingCart className="manager-icon" /> Quản lý order
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SidebarManager;
