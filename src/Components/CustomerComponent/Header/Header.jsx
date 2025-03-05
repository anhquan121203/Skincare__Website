import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../../assets/images/logo.png";
import { Dropdown, Input, Menu } from "antd";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../Api/authApi";
import { logout } from "../../../Features/user/authSlice";
import useAuth from "../../../Hooks/useAuth";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { roleName, avatar, firstName, lastName } = useAuth();

  console.log(roleName)

  const [isOpen, setIsOpen] = useState();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut();
    dispatch(logout());
  };

  // Seach category
  const categoriesMenu = (
    <Menu>
      <Menu.Item key="1">Da dầu</Menu.Item>
      <Menu.Item key="2">Da khô</Menu.Item>
      <Menu.Item key="3">Da nhờn</Menu.Item>
    </Menu>
  );

  return (
    <header className="header">
      <div className="header__logo">
        <Link style={{ textDecoration: "none" }} to={"/"}>
          <img src={logo} alt="" width={100} />
        </Link>
      </div>

      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/product">Sản phẩm</Link>
          </li>
          <li>
            <Link>Khuyến mãi</Link>
          </li>
          <li>
            <Link to="/blogger">Blogger</Link>
          </li>
          <li>
            <Link>Hỗ trợ khách hàng</Link>
          </li>
        </ul>
      </nav>

      {/* Header end */}
      <nav className="header-end">
        <ul>
          {/* Seacher */}
          <ul className="search-bar-container">
            <Dropdown overlay={categoriesMenu} trigger={["click"]}>
              <button className="categories-btn">
                <MdOutlineDashboardCustomize className="categories-icon" />
                Loại sản phẩm <IoMdArrowDropdown />
              </button>
            </Dropdown>
            <div className="vertical-line" />
            <Input
              placeholder="Bạn cần tìm gì?..."
              className="search-input"
              bordered={false}
            />
            <button className="search-btn">
              <FaSearch className="search-icon" />
            </button>
          </ul>

          {/* Wishkist and cart */}
          <ul className="icon">
            <li>
              <Link to="/wishlist">
                <CiHeart />
              </Link>
            </li>

            <li>
              <Link to="/addtocard">
                <FaShoppingCart />
              </Link>
            </li>
          </ul>

          {/* LOGOUT Fearture */}
          {isLoggedIn ? (
            <div className="dropdown-login">
              <div className="header-avavtar">
              <img
                style={{
                  width: "50px",
                  marginRight: "20px",
                  height: "50px",
                  border: "2px solid  #22a8e7",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                onClick={toggleDropdown}
                className="dropdown-button"
                src={avatar || "https://genk.mediacdn.vn/2016/photo-1-1482990145725.jpg"} 
                alt=""
              />
              {/* <p>{firstName} {lastName}</p> */}
              </div>
              
              {isOpen && (
                <div className="dropdown-content">
                  {roleName === "Customer" ? (
                    <>
                      <Link>Profile</Link>
                    </>
                  ) : roleName === "Staff" ? (
                    <>
                      <Link>Manager Order</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/manager/dashboard-manager">Dashboard</Link>
                    </>
                  )}
                  <a onClick={handleLogout}>Thoát</a>
                </div>
              )}
            </div>
          ) : (
            <li>
              <Link to="/login">
                <button className="btn-button">Đăng nhập</button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
