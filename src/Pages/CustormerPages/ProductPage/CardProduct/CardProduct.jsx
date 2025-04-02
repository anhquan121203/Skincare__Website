import React, { useState } from "react";
import "./CardProduct.css";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useProduct from "../../../../Hooks/useProduct";
import { Button, Image, Modal, Pagination, Table } from "antd";

function CardProduct({ sortProduct, searchTerm, filters }) {
  const { priceRange, selectedCategories } = filters;
  const { products, loading, error, compareProducts } = useProduct();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showCompareModal = () => setIsModalVisible(true);
  const handleCloseModal = () => {
    setIsModalVisible(false), setCompareIds([]);
  };
  const [compareIds, setCompareIds] = useState([]);

  const handleCompare = (id) => {
    setCompareIds((prev) => {
      const newIds = prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id];

      if (newIds.length === 2) {
        showCompareModal(); 
      }

      return newIds.slice(-2);
    });
  };

  const comparisonResult =
    compareIds.length === 2
      ? compareProducts(compareIds[0], compareIds[1])
      : null;

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

    if (product.productStatus === "Inactive") {
      return false;
    }

    if (product.quantity <= 0) {
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
            // onClick={() => navigate(`/product-details/${item.id}`)}
          >
            <Link to={`/product-details/${item.id}`}>
              <img
                className="card-image"
                src={item.image}
                alt={item.productName}
              />
            </Link>
            <button
              className="button-compare"
              onClick={() => handleCompare(item.id)}
            >
              So sánh
            </button>
            <div className="card-content">
              <span className="card-name">{item.productName}</span>
              {/* <h2 className="card-description">{item.description}</h2> */}

              <div className="tag-category">
                <div className="tag-cateName">{item.categoryName}</div>
                <div className="tag-skinType">{item.skinTypeName}</div>
              </div>
              <div className="card-footer">
                <span>
                  <span className="card-price">
                    {item.price.toLocaleString("vi-VN")} VND
                  </span>
                </span>
                <div className="btn-addToCard">
                  <Link to={`/product-details/${item.id}`}>Chi tiết</Link>
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

      <Modal
        title="So sánh sản phẩm"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Đóng
          </Button>,
        ]}
      >
        {comparisonResult && (
          <div className="comparison-table">
            <Table
              dataSource={[
                {
                  key: "1",
                  feature: "Tên sản phẩm",
                  product1: (
                    <Image
                      src={comparisonResult.product1.image}
                      alt="Product 1"
                      style={{ width: 50, height: 50 }}
                    />
                  ),
                  product2: (
                    <Image
                      src={comparisonResult.product2.image}
                      alt="Product 2"
                      style={{ width: 50, height: 50 }}
                    />
                  ),
                },
                {
                  key: "2",
                  feature: "Tên sản phẩm",
                  product1: comparisonResult.product1.productName,
                  product2: comparisonResult.product2.productName,
                },
                {
                  key: "3",
                  feature: "Giá tiền",
                  product1: `${comparisonResult.product1.price.toLocaleString(
                    "vi-VN"
                  )} VND`,
                  product2: `${comparisonResult.product2.price.toLocaleString(
                    "vi-VN"
                  )} VND`,
                },
                {
                  key: "4",
                  feature: "Loại da",
                  product1: comparisonResult.product1.skinTypeName,
                  product2: comparisonResult.product2.skinTypeName,
                },
                {
                  key: "5",
                  feature: "Loại sản phẩm",
                  product1: comparisonResult.product1.categoryName,
                  product2: comparisonResult.product2.categoryName,
                },
              ]}
              columns={[
                {
                  title: "Thông tin",
                  dataIndex: "feature",
                  key: "feature",
                },
                {
                  title: "Sản phẩm 1",
                  dataIndex: "product1",
                  key: "product1",
                },
                {
                  title: "Sản phẩm 2",
                  dataIndex: "product2",
                  key: "product2",
                },
              ]}
              pagination={false}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default CardProduct;
