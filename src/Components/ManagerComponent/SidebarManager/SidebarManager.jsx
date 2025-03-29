import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./SidebarManager.css";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaDropbox, FaRegQuestionCircle, FaRegUser } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { logout } from "../../../Features/user/authSlice";
import { useDispatch } from "react-redux";
import { signOut } from "../../../Api/authApi";
import useAuth from "../../../Hooks/useAuth";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";

function SidebarManager() {
  const location = useLocation(); // Get current route
  const isActive = (path) => location.pathname === path;
  const dispatch = useDispatch();
  const { avatar, firstName, lastName, roleName } = useAuth();

  const handleLogout = async () => {
    await signOut();
    dispatch(logout());
  };

  return (
    <div className="sidebar-manager">
      <div className="sidebar-header">
        <img src={avatar} alt="" />
        <h2>
          {firstName} {lastName}
        </h2>
        <p>{roleName}</p>
      </div>

      <ul className="sidebar-menu">
        {/* <hr /> */}
        {/* <h3 style={{textAlign: "center"}}>Doanh số</h3> */}
        <li className={isActive("/manager") ? "active" : ""}>
          <Link to="/manager">
            Doanh thu <LuLayoutDashboard className="manager-icon" />
          </Link>
        </li>
        <hr />

        {/* Manager product */}
        <h3 style={{ textAlign: "center", fontSize: "20px" }}>Quản lý</h3>
        <li className={isActive("/manager/manager-product") ? "active" : ""}>
          <Link to="/manager/manager-product">
            Sản phẩm <FaDropbox className="manager-icon" />
          </Link>
        </li>
        <li className={isActive("/manager/manager-category") ? "active" : ""}>
          <Link to="/manager/manager-category">
            Loại sản phẩm <BiCategoryAlt className="manager-icon" />
          </Link>
        </li>
        <li className={isActive("/manager/manager-skinType") ? "active" : ""}>
          <Link to="/manager/manager-skinType">
            Loại da <FaDropbox className="manager-icon" />
          </Link>
        </li>
        <li
          className={
            isActive("/manager/manager-skinCareRoutines") ? "active" : ""
          }
        >
          <Link to="/manager/manager-skinCareRoutines">
            Quy trình chăm sóc da <FaDropbox className="manager-icon" />
          </Link>
        </li>
        <hr />

        {/* Manager Skin Type********************************************* */}
        <h3 style={{ textAlign: "center", fontSize: "20px" }}>
          Câu hỏi loại da
        </h3>
        <li
          className={isActive("/manager/manager-skinQuestion") ? "active" : ""}
        >
          <Link to="/manager/manager-skinQuestion">
            Câu hỏi về da
            <FaRegQuestionCircle className="manager-icon" />
          </Link>
        </li>
        <li className={isActive("/manager/manager-skinAnswer") ? "active" : ""}>
          <Link to="/manager/manager-skinAnswer">
            Câu trả lời <RiQuestionAnswerLine className="manager-icon" />
          </Link>
        </li>

        <hr />

        {/* Manager account **********************************************/}
        <li className={isActive("/manager/manager-account") ? "active" : ""}>
          <Link to="/manager/manager-account">
            Quản lý tài khoản{" "}
            <MdOutlineManageAccounts className="manager-icon" />
          </Link>
        </li>
        <li className={isActive("/manager/manager-profile") ? "active" : ""}>
          <Link to="/manager/manager-profile">
            Hồ sơ <FaRegUser className="manager-icon" />
          </Link>
        </li>
        <li>
          <Link onClick={handleLogout}>
            Logout <FiLogOut className="manager-icon" />
          </Link>
        </li>
        {/* <hr /> */}
      </ul>
    </div>
  );
}

export default SidebarManager;
