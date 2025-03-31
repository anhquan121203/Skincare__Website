import React, { useState } from "react";
import "./ManagerHeader.css";
import logo from "../../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout } from "../../../Features/user/authSlice";
import { FaRegUserCircle } from "react-icons/fa";
import { SiAwssecretsmanager } from "react-icons/si";
import { CiLogout } from "react-icons/ci";

function ManagerHeader() {
  const { avatar, firstName, lastName } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="manager-header">
      <div className="element--header">
        <div className="dashboard__logo">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <img src={logo} alt="Logo" width={80} />
          </Link>
        </div>
      </div>

      <div className="element--header">
        <div className="dashboard__end">
          <div className="dropdown-dashboard" onClick={toggleDropdown}>
            <img src={avatar} alt="User Avatar" />
            <span>
              {firstName} {lastName}
            </span>
          </div>

          <div className={`dropdown-dashboard__main ${isOpen ? "show" : ""}`}>
            <Link to="/manager/manager-profile"><FaRegUserCircle /> Hồ sơ</Link>
            <Link to="/manager/manager-account"><SiAwssecretsmanager /> Quản lý tài khoản</Link>
            <button onClick={handleLogout}><CiLogout /> Thoát</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerHeader;
