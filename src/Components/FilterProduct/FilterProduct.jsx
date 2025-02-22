import React, { useState } from "react";
import { Slider, InputNumber, Button, Checkbox } from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./FilterProduct.css";

const discountOptions = [
  "0 - 10%",
  "10% - 20%",
  "20% - 30%",
  "30% - 40%",
  "40% - 50%",
  "50% - 60%",
];

const categoryOptions = [
  "Tẩy trang",
  "Sữa rửa mặt",
  "Serum/Ampoule",
  "Kem dưỡng ẩm",
  "Kem mắt",
  "Kem chống nắng",
  "Mặt nạ",
  "Tẩy tế bào chết",
  "Xịt khoáng",
];

function FilterProduct() {
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleDiscountSection = () => setIsDiscountOpen(!isDiscountOpen);
  const toggleCategorySection = () => setIsCategoryOpen(!isCategoryOpen);
  const togglePriceSection = () => setIsPriceOpen(!isPriceOpen);

  const handlePriceChange = (value) => setPriceRange(value);

  const handleRemoveFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter((item) => item !== filter));
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
  };

  const applyPriceFilter = () => {
    const minPrice = priceRange[0].toLocaleString();
    const maxPrice = priceRange[1].toLocaleString();

    // Nếu giá min >= max thì không cập nhật
    if (priceRange[0] >= priceRange[1]) return;

    const newPriceFilter = `${minPrice}đ - ${maxPrice}đ`;

    // Xóa bộ lọc giá tiền cũ trước khi thêm bộ lọc mới
    const updatedFilters = selectedFilters.filter(
      (filter) => !filter.match(/^\d{1,3}(\.\d{3})*đ - \d{1,3}(\.\d{3})*đ$/)
    );

    setSelectedFilters([...updatedFilters, newPriceFilter]);
  };

  const handleDiscountChange = (checkedValues) => {
    setSelectedDiscounts(checkedValues);

    // Lọc bỏ các mục cũ liên quan đến khuyến mãi
    const updatedFilters = selectedFilters.filter(
      (filter) => !discountOptions.includes(filter)
    );

    // Thêm các khuyến mãi mới vào bộ lọc
    setSelectedFilters([...updatedFilters, ...checkedValues]);
  };

  const handleCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues);

    // Lọc bỏ các loại sản phẩm cũ
    const updatedFilters = selectedFilters.filter(
      (filter) => !categoryOptions.includes(filter)
    );

    // Thêm các loại sản phẩm mới vào bộ lọc
    setSelectedFilters([...updatedFilters, ...checkedValues]);
  };

  return (
    <div className="filter-product">
      <div className="filter-container">
        {/* Lọc theo */}
        <div className="selected-filters">
          <div className="filter-header">
            <h2 className="filter-title">LỌC THEO</h2>
            <DeleteOutlined
              className="clear-icon"
              onClick={handleClearFilters}
            />
          </div>
          <ul className="filter-list">
            {selectedFilters.map((filter, index) => (
              <li key={index} className="filter-item">
                <span>{filter}</span>
                <CloseOutlined
                  className="remove-icon"
                  onClick={() => handleRemoveFilter(filter)}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Giá tiền */}
        <div className="filter-section">
          <div className="filter-header" onClick={togglePriceSection}>
            <span className="font-bold">KHOẢNG GIÁ</span>
            {isPriceOpen ? <MinusOutlined /> : <PlusOutlined />}
          </div>
          {isPriceOpen && (
            <>
              <Slider
                range
                min={0}
                max={3000000}
                step={10000}
                value={priceRange}
                onChange={handlePriceChange}
              />
              <div className="price-inputs">
                <InputNumber
                  min={0}
                  max={3000000}
                  step={10000}
                  value={priceRange[0]}
                  onChange={(value) =>
                    handlePriceChange([value, priceRange[1]])
                  }
                />
                <span className="mx-2">-</span>
                <InputNumber
                  min={0}
                  max={3000000}
                  step={10000}
                  value={priceRange[1]}
                  onChange={(value) =>
                    handlePriceChange([priceRange[0], value])
                  }
                />
              </div>
              <Button
                type="primary"
                className="apply-btn"
                onClick={applyPriceFilter}
              >
                ÁP DỤNG
              </Button>
            </>
          )}
        </div>

        {/* Khuyến mãi */}
        <div className="filter-section">
          <div className="filter-header" onClick={toggleDiscountSection}>
            <span className="font-bold">KHUYẾN MẠI</span>
            {isDiscountOpen ? <MinusOutlined /> : <PlusOutlined />}
          </div>
          {isDiscountOpen && (
            <Checkbox.Group
              className="discount-options"
              options={discountOptions}
              value={selectedDiscounts}
              onChange={handleDiscountChange}
            />
          )}
        </div>

        {/* Loại sản phẩm */}
        <div className="filter-section">
          <div className="filter-header" onClick={toggleCategorySection}>
            <span className="font-bold">LOẠI SẢN PHẨM</span>
            {isCategoryOpen ? <MinusOutlined /> : <PlusOutlined />}
          </div>
          {isCategoryOpen && (
            <Checkbox.Group
              className="category-options"
              options={categoryOptions}
              value={selectedCategories}
              onChange={handleCategoryChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterProduct;
