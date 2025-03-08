import React, { useState } from "react";
import "./ManagerProduct.css";
import { Input, Pagination } from "antd";
import { FaPlus } from "react-icons/fa";
import useProduct from "../../../Hooks/useProduct";
import { ImTelegram } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import ModalProduct from "./ModalNewProduct/ModalProduct";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function ManagerProduct() {
  const { products, loading, error, addProduct, deleteProduct } = useProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (newProduct) => {
    setIsModalOpen(false);
    addProduct(newProduct);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    toast.success("Xóa sản phẩm thành công!!!")
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = products.slice(startIndex, startIndex + pageSize);

  const hanleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="managerProduct-container">
      <h1>Manager Product</h1>

      <div className="content-manager-product">
        <div className="header-manager-product">
          <button className="btn-addProduct" onClick={showModal}>
            <FaPlus style={{ marginRight: "8px" }} />
            Add new products
          </button>

          <div className="search-product">
            <Input.Search
              placeholder="Tìm kiếm sản phẩm..."
              // onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 200 }}
            />
          </div>
        </div>

        <div className="table-product-container">
          <table className="table-product">
            <thead>
              <tr>
                <th>STT</th>
                <th style={{ width: "200px" }}>Tên sản phẩm</th>
                <th style={{ width: "200px" }}>Mô tả</th>
                <th>Giá tiền (VND)</th>
                <th>Số lượng</th>
                <th style={{ width: "200px" }}>Hình ảnh</th>
                <th>Loại sản phẩm</th>
                <th>Loại Skin</th>
                <th>Trạng thái</th>
                <th>Action</th>
              </tr>
            </thead>
            {paginatedProducts.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.productName}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      src={item.image}
                      alt={item.productName}
                    />
                  </td>
                  <td>{item.categoryName}</td>
                  <td>{item.skinTypeName}</td>
                  <td>
                    <span class="status-active">{item.productStatus}</span>
                  </td>
                  <td className="action-btnPro">
                    <button className="btn-updatePro">Cập nhật</button>
                    <button
                      className="btn-removePro"
                      onClick={() => hanleDeleteProduct(item.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={products.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: "16px", textAlign: "center" }}
        />
      </div>

      <ModalProduct
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
}

export default ManagerProduct;
