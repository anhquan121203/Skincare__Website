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

  // Lọc skincareRoutine theo skinTypeId
  const activeSkincareRoutine = skincareRoutine.find(
    (routine) => routine.skinTypeId == id
  );

  if (!activeSkincareRoutine) {
    return <div className="error">Không tìm thấy quy trình</div>;
  }

  // Lấy thông tin skincareRoutine
  const { routineName, description, totalSteps, skinTypeId, skinTypeName } =
    activeSkincareRoutine;

  // Lọc stepRoutines theo routineId
  const filteredStepRoutines = stepRoutines.filter(
    (step) => step.routineId == activeSkincareRoutine.id
  );

  const selectedProduct = products.filter(
    (product) => product.skinTypeId === skinTypeId
  );

  return (
    <div className="skincare-container">
      {/* Thay thế h1 bằng thông tin từ skincareRoutine */}
      <h1 className="skincare-title"> {routineName}</h1>

      {/* Hiển thị mô tả quy trình */}
      <p className="routine-description">{description}</p>

      {/* Hiển thị số bước nếu có, hoặc thông báo không có bước */}
      <p className="total-steps">
        Tổng số bước: {totalSteps > 0 ? totalSteps : "Không có bước nào hết"}
      </p>

      {/* Danh sách các bước */}
      <ul className="skincare-list">
        {Array.isArray(filteredStepRoutines) &&
          filteredStepRoutines.map((step) => (
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
          : `Các sản phẩm phù hợp với ${skinTypeName}`}
      </button>

      {/* Danh sách sản phẩm - Ẩn nếu `showProducts` = false */}
      {showProducts && (
        <div>
          <div className="card-grid">
            {/* Lọc sản phẩm */}
            {selectedProduct.length > 0 ? (
              selectedProduct.map((item) => (
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
            total={products.length}
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
