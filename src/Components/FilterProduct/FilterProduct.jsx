import React from 'react';
import { Input, Typography, List, Divider } from 'antd';
import "./FilterProduct.css"

const { Search } = Input;

function FilterProduct() {


  return (
    <div className='filter-product' >

      <div className='filter-sidebar'>
        <div className='filter-categories'>
          <h2 style={{ fontSize: 25, fontWeight: "bold", marginBottom: "10px" }}>Loại sản phẩm</h2>
          <ul>
            <li>
              <input type="checkbox" />Tẩy trang
            </li>
            <li>
              <input type="checkbox" />Sữa rửa mặt</li>
            <li>
              <input type="checkbox" />Serum/Ampoule </li>
            <li>
              <input type="checkbox" />Serum/Ampoule</li>
            <li>
              <input type="checkbox" />Kem dưỡng ẩm</li>
            <li>
              <input type="checkbox" />Kem mắt</li>
            <li>
              <input type="checkbox" />Kem chống nắng</li>
            <li>
              <input type="checkbox" />Mặt nạ</li>
            <li>
              <input type="checkbox" />Tẩy tế bào chết</li>
            <li>
              <input type="checkbox" />Xịt khoáng</li>
          </ul>
        </div>

        <div className='rating'>
          <h2>Rating</h2>
        </div>

      </div>

    </div>
  );
};

export default FilterProduct;
