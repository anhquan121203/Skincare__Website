import React, { useState } from "react";
import "./CardProduct.css";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import useProduct from "../../../../Hooks/useProduct";
import { Pagination } from "antd";

function CardProduct({ sortProduct, searchTerm, filters }) {
  const { priceRange, selectedCategories } = filters;
  const { products, loading, error } = useProduct();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  // Lọc sản phẩm theo filter
  let filteredProducts = products.filter((product) => {
    // Lọc theo khoảng giá
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange;
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

    }

    // Lọc theo loại sản phẩm
    if (selectedCategories && selectedCategories.length > 0) {
      if (!selectedCategories.includes(product.categoryName)) {
        return false;
      }
    }

    if(product.productStatus === "Inactive") {
      return false;
    }

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      if (!product.productName.toLowerCase().includes(lowerSearch)) {
        return false;
      }
    }
    return true;
  });

  // Sắp xếp sản phẩm
  if (sortProduct === "low-to-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortProduct === "high-to-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortProduct === "a-to-z") {
    filteredProducts.sort((a, b) => a.productName.localeCompare(b.productName));
  } else if (sortProduct === "z-to-a") {
    filteredProducts.sort((a, b) => b.productName.localeCompare(a.productName));
  }

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  return (
    <div className="card-container">
      <div className="card-grid">
        {paginatedProducts.map((item, index) => (
          <div
            key={index}
            className="card-product"
            onClick={() => navigate(`/product-details/${item.id}`)}
          >
            <img
              className="card-image"
              src={item.image}
              alt={item.productName}
            />
            <div className="card-content">
              <span className="card-name">{item.productName}</span>
              {/* <h2 className="card-description">{item.description}</h2> */}
              <div className="card-rating">
                <FaStar className="star-icon" />
              </div>
              <div className="tag-category">
                <div className="tag-cateName">{item.categoryName}</div>
                <div className="tag-skinType">{item.skinTypeName}</div>
              </div>
              <div className="card-footer">
                <span>
                  <span className="card-price">{item.price} VND</span>
                </span>
                <div className="btn-addToCard">
                  <Link>Chi tiet</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredProducts.length} // Cập nhật số lượng sản phẩm đã lọc
        onChange={handlePageChange}
        showSizeChanger
        onShowSizeChange={handlePageChange}
      />
    </div>
  );
}

export default CardProduct;
