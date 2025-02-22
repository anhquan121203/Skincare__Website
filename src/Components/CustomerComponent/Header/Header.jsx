import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

import logo from "../../../assets/images/logo.png";
import { Dropdown, Input, Menu } from "antd";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

function Header() {
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
              <Link to="#">
                <FaShoppingCart />
              </Link>
            </li>
          </ul>

          <li>
            <Link to="/login">
              <button className="btn-button">Đăng nhập</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
