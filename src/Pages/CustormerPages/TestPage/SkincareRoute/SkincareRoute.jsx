import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Pagination } from "antd";
import useStepRoutine from "../../../../Hooks/useStepRoutine";
import useSkinType from "../../../../Hooks/useSkinType";
import useProduct from "../../../../Hooks/useProduct";
import { FaStar } from "react-icons/fa";
import "./SkincareRoutine.css";
import useSkincareRoutine from "../../../../Hooks/useSkincareRoutine";

const SkincareRoutine = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL

  // State để kiểm soát hiển thị sản phẩm và phân trang
  const [showProducts, setShowProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Số sản phẩm trên mỗi trang

  // Fetch dữ liệu từ hooks
  const {
    skincareRoutine,
    loading: loadingSkincareRoutine,
    error: errorSkincareRoutine,
  } = useSkincareRoutine();
  const {
    stepRoutines,
    loading: loadingSteps,
    error: errorSteps,
  } = useStepRoutine(id);

  const {
    skinTypes,
    loading: loadingSkinTypes,
    error: errorSkinTypes,
  } = useSkinType();

  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = useProduct();

  // Kiểm tra nếu dữ liệu chưa load
  if (
    loadingSkinTypes ||
    loadingProducts ||
    loadingSteps ||
    loadingSkincareRoutine
  ) {
    return <div className="loading">Đang tải dữ liệu...</div>;
  }

  if (errorSteps || errorSkincareRoutine || errorSkinTypes || errorProducts) {
    return <div className="error">Lỗi khi tải quy trình</div>;
  }

  // const skincareRoutineActive = skincareRoutine.filter(
  //   (skincareRoutine) =>
  //     skincareRoutine.skinTypeId === Number(id) &&
  //     skincareRoutine.status === "Active"
  // );

  // console.log("skincareRoutineActive", skincareRoutineActive);

  // Lọc loại da đang Active
  const skintypeActive = skinTypes.filter(
    (skintype) => skintype.skinTypeStatus === "Active"
  );

  // Tìm loại da có id trùng với id trên URL
  const selectedSkinType = skintypeActive.find((skintype) => skintype.id == id);

  if (!selectedSkinType) {
    return <div className="error">Không tìm thấy loại da phù hợp.</div>;
  }

  // Lọc sản phẩm theo skinTypeName
  const productActive = products.filter(
    (product) => product.productStatus === "Available"
  );
  const selectedProduct = productActive.filter(
    (product) => product.skinTypeName === selectedSkinType.skinTypeName
  );

  // Phân trang: Cắt danh sách sản phẩm theo trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = selectedProduct.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="skincare-container">
      <h1 className="skincare-title">
        Quy trình chăm sóc {selectedSkinType.skinTypeName}
      </h1>

      <ul className="skincare-list">
        {Array.isArray(stepRoutines) &&
          stepRoutines.map((step) => (
            <li key={step.id} className="skincare-step">
              <h2 className="step-title">Bước {step.stepNumber}</h2>
              <p className="step-description">{step.stepDescription}</p>
            </li>
          ))}
      </ul>

      {/* Nút hiển thị sản phẩm */}
      <button
        className="toggle-products-btn"
        onClick={() => setShowProducts(!showProducts)}
      >
        {showProducts
          ? "Ẩn sản phẩm"
          : `Các sản phẩm phù hợp với ${selectedSkinType.skinTypeName}`}
      </button>

      {/* Danh sách sản phẩm - Ẩn nếu `showProducts` = false */}
      {showProducts && (
        <div>
          <div className="card-grid">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="card-product"
                  onClick={() => navigate(`/product-details/${item.id}`)}
                  style={{ marginTop: 30 }}
                >
                  <img
                    className="card-image"
                    src={item.image}
                    alt={item.productName}
                  />
                  <div className="card-content">
                    <span className="card-name">{item.productName}</span>
                    <div className="card-rating">
                      <FaStar className="star-icon" />
                    </div>
                    <div className="tag-category">
                      <div className="tag-cateName">{item.categoryName}</div>
                      <div className="tag-skinType">{item.skinTypeName}</div>
                    </div>
                    <div className="card-footer">
                      <span className="card-price">{item.price} VND</span>
                      <div className="btn-addToCard">
                        <Link to={`/product-details/${item.id}`}>Chi tiết</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-products">Không có sản phẩm phù hợp.</p>
            )}
          </div>

          {/* Phân trang */}
          <Pagination
            current={currentPage}
            total={selectedProduct.length}
            pageSize={itemsPerPage}
            onChange={(page) => setCurrentPage(page)}
            className="pagination"
          />
          <button
            className="toggle-products-btn"
            onClick={() => navigate("/product")}
          >
            Xem các sản phẩm khác
          </button>
        </div>
      )}
    </div>
  );
};

export default SkincareRoutine;
