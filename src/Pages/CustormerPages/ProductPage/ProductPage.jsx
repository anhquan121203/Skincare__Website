import React, { useState } from "react";
import "./ProductPage.css";
import { Select, Input } from "antd";
import FilterProduct from "../../../Components/FilterProduct/FilterProduct";
import CardComponent from "../../../Components/CardComponent/CardComponent";

const { Option } = Select;

function ProductPage() {
  const [sortProduct, setSortProduct] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="product-page">
      <div className="background-animation"></div>

      <div className="product-content">
        {/* Header */}
        <div className="sort-product">
          <Select
            defaultValue="all"
            className="sort-select"
            onChange={setSortProduct}
          >
            <Option value="all">Tất cả</Option>
            <Option value="low-to-high">Giá: từ thấp đến cao</Option>
            <Option value="high-to-low">Giá: từ cao đến thấp</Option>
            <Option value="a-to-z">Tên: A - Z</Option>
            <Option value="z-to-a">Tên: Z - A</Option>
          </Select>

          <Input.Search
            placeholder="Tìm kiếm sản phẩm..."
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 200 }}
          />
        </div>

        <div className="main-content">
          <div className="filter">
            <FilterProduct />
          </div>

          
          <CardComponent sortProduct={sortProduct} searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
