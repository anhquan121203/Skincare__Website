import React, { useState } from "react";
import "./ManagerProduct.css";
import { Input, Modal, Pagination } from "antd";
import { FaPlus } from "react-icons/fa";
import useProduct from "../../../Hooks/useProduct";
import { toast } from "react-toastify";
import ModalAddProduct from "./ModalNewProduct/ModalProduct";
import ModalUpdateProduct from "./ModalUpdateProduct/ModalUpdateProduct";

function ManagerProduct() {
  const { products, loading, error, addProduct, deleteProduct, editProduct } =
    useProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Separate state for each modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Open Add Modal
  const openAddModal = () => {
    setSelectedProduct(null);
    setIsAddModalOpen(true);
  };

  // Open Update Modal
  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };

  // Handle Add Product
  const handleAddProduct = (productData) => {
    addProduct(productData);
    toast.success("Thêm sản phẩm mới thành công!");
    setIsAddModalOpen(false);
  };

  // Handle Update Product
  const handleUpdateProduct = (productData) => {
    editProduct(selectedProduct.id, productData);
    toast.success("Cập nhật sản phẩm thành công!");
    setIsUpdateModalOpen(false);
  };

  // Open Delete Confirmation Modal
  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  // Handle Delete Product
  const handleDeleteProduct = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      toast.success("Xóa sản phẩm thành công!");
      setIsDeleteModalOpen(false);
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = products.slice(startIndex, startIndex + pageSize);

  return (
    <div className="managerProduct-container">
      <h1>Manager Product</h1>

      <div className="content-manager-product">
        <div className="header-manager-product">
          <button className="btn-addProduct" onClick={openAddModal}>
            <FaPlus style={{ marginRight: "8px" }} />
            Add new product
          </button>

          <div className="search-product">
            <Input.Search
              placeholder="Tìm kiếm sản phẩm..."
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
            <tbody>
              {paginatedProducts.map((item, index) => (
                <tr key={index}>
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
                    <span className="status-active">{item.productStatus}</span>
                  </td>
                  <td className="action-btnPro">
                    <button
                      className="btn-updatePro"
                      onClick={() => openUpdateModal(item)}
                    >
                      Cập nhật
                    </button>
                    <button
                      className="btn-removePro"
                      onClick={() => openDeleteModal(item)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
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

      {/* Add Product Modal */}
      <ModalAddProduct
        isModalOpen={isAddModalOpen}
        handleCancel={() => setIsAddModalOpen(false)}
        handleAdd={handleAddProduct}
      />

      {/* Update Product Modal */}
      <ModalUpdateProduct
        isModalOpen={isUpdateModalOpen}
        handleCancel={() => setIsUpdateModalOpen(false)}
        handleUpdate={handleUpdateProduct}
        updateProduct={selectedProduct}
      />

      {/* Modal Delete */}
      <Modal
        title="Xác nhận xóa sản phẩm"
        open={isDeleteModalOpen}
        onOk={handleDeleteProduct}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>
          Bạn có chắc chắn muốn xóa sản phẩm{" "}
          <strong>{productToDelete?.productName}</strong>?
        </p>
      </Modal>
    </div>
  );
}

export default ManagerProduct;
