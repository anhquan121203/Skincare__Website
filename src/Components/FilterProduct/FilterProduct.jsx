import React, { useState } from "react";
import { Slider, InputNumber, Button, Checkbox } from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./FilterProduct.css";
import useCategory from "../../Hooks/useCategory";

const discountOptions = [
  "0 - 10%",
  "10% - 20%",
  "20% - 30%",
  "30% - 40%",
  "40% - 50%",
  "50% - 60%",
];

function FilterProduct({ setFilters }) {
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // call api category và map để lay danh sách category
  // chèn vào option trong chackbox ở phần loại sản phẩm
  const { categories } = useCategory();
  const categogyActive = categories.filter(
    (item) => item.categoryStatus === "Active"
  );

  const categoryOptions = categogyActive.map(
    (category) => category.categoryName
  );

  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [tempPriceRange, setTempPriceRange] = useState([0, 3000000]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleDiscountSection = () => setIsDiscountOpen(!isDiscountOpen);
  const toggleCategorySection = () => setIsCategoryOpen(!isCategoryOpen);
  const togglePriceSection = () => setIsPriceOpen(!isPriceOpen);

  // xóa filter
  const handleRemoveFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter((item) => item !== filter));
  };

  // sử lý reset filter
  const handleClearFilters = () => {
    setSelectedFilters([]);
    setSelectedDiscounts([]);
    setSelectedCategories([]);
    setPriceRange([0, 3000000]);
  };

  // sử lý thanh price
  const applyPriceFilter = () => {
    const minPrice = tempPriceRange[0].toLocaleString();
    const maxPrice = tempPriceRange[1].toLocaleString();

    if (tempPriceRange[0] >= tempPriceRange[1]) return;

    const newPriceFilter = `${minPrice}đ - ${maxPrice}đ`;

    const updatedFilters = selectedFilters.filter(
      (filter) => !filter.match(/^\d{1,3}(\.\d{3})*đ - \d{1,3}(\.\d{3})*đ$/)
    );

    setSelectedFilters([...updatedFilters, newPriceFilter]);
    setPriceRange(tempPriceRange); // Cập nhật priceRange khi nhấn nút

    updateFilters({ priceRange: tempPriceRange }); // Chỉ cập nhật setFilters tại đây
  };

  // các hàm sử lý với filter
  const handlePriceChange = (value) => {
    setTempPriceRange(value); // Chỉ cập nhật giá trị tạm thời
  };

  const handleDiscountChange = (checkedValues) => {
    setSelectedDiscounts(checkedValues);

    updateFilters({ selectedDiscounts: checkedValues });
    // Cập nhật bộ lọc hiển thị
    const discountFilters = checkedValues.map(
      (discount) => `Giảm giá: ${discount}`
    );
    setSelectedFilters((prev) => {
      // Xóa các bộ lọc giảm giá cũ trước khi thêm mới
      const filtered = prev.filter((filter) => !filter.startsWith("Giảm giá:"));
      return [...filtered, ...discountFilters];
    });
  };

  const handleCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues);
    updateFilters({ selectedCategories: checkedValues });
    // Cập nhật bộ lọc hiển thị
    const categoryFilters = checkedValues.map(
      (category) => `Loại: ${category}`
    );
    setSelectedFilters((prev) => {
      // Xóa các bộ lọc loại sản phẩm cũ trước khi thêm mới
      const filtered = prev.filter((filter) => !filter.startsWith("Loại:"));
      return [...filtered, ...categoryFilters];
    });
  };

  return (
    <div className="filter-product">
      <div className="filter-container">
        <div className="selected-filters">
          <div className="filter-header">
            <h5 className="filter-title">LỌC THEO</h5>
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
                value={tempPriceRange}
                onChange={handlePriceChange}
              />
              <div className="price-inputs">
                <InputNumber
                  min={0}
                  max={3000000}
                  step={10000}
                  value={tempPriceRange[0]}
                  onChange={(value) =>
                    handlePriceChange([value, tempPriceRange[1]])
                  }
                />
                <span className="mx-2">-</span>
                <InputNumber
                  min={0}
                  max={3000000}
                  step={10000}
                  value={tempPriceRange[1]}
                  onChange={(value) =>
                    handlePriceChange([tempPriceRange[0], value])
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
