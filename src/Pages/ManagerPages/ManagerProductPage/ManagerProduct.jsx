import React, { useState } from "react";
import "./ManagerProduct.css";
import { Button, Image, Input, Modal, Pagination, Popconfirm } from "antd";
import { FaPlus } from "react-icons/fa";
import useProduct from "../../../Hooks/useProduct";
import { toast } from "react-toastify";
import ModalAddProduct from "./ModalNewProduct/ModalAddProduct";
import ModalUpdateProduct from "./ModalUpdateProduct/ModalUpdateProduct";
import ModalDetailProduct from "./ModalDetailProduct/ModalDetailProduct";

function ManagerProduct() {
  const { products, loading, error, addProduct, removeProduct, editProduct } =
    useProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Separate state for each modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // update modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  // Detail modal
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Open Add Modal
  const openAddModal = () => {
    setSelectedProduct(null);
    setIsAddModalOpen(true);
  };

  // Handle Add Product
  const handleAddProduct = (productData) => {
    addProduct(productData);
    setIsAddModalOpen(false);
  };

  // Open Update Modal
  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };

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

  const handleDeleteProduct = () => {
    if (productToDelete && productToDelete.id) {
      // Ensure id is defined
      removeProduct(productToDelete.id);
      toast.success("Xóa sản phẩm thành công!");
      setIsDeleteModalOpen(false);
    } else {
      toast.error("Lỗi: ID sản phẩm không hợp lệ!");
    }
  };



  // MODAL DETAIL PRODUCT
  const openDetailModal = (product) => {
    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
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
                {/* <th style={{ width: "200px" }}>Mô tả</th> */}
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
                  {/* <td>{item.description}</td> */}
                  <td>{item.price} VND</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Image
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                      src={item.image || "N/A"}
                      fallback="https://via.placeholder.com/100"
                    />
                  </td>
                  <td>{item.categoryName}</td>
                  <td>{item.skinTypeName}</td>

                  {/* css in skinQuestion */}
                  <td>
                    <span
                      className={`status-${item.productStatus.toLowerCase()}`}
                    >
                      {item.productStatus === "Available"
                        ? "Available"
                        : "Inactive"}
                    </span>
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
                    
                    <button
                      className="btn-detailPro"
                      onClick={() => openDetailModal(item)}
                    >
                      Chi tiết
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
          style={{
            marginTop: "20px",
            textAlign: "center",
            display: "flex",
            justifyContent: "flex-end",
          }}
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

      <ModalDetailProduct
        isModalOpen={isDetailsModalOpen}
        handleCancel={() => setIsDetailsModalOpen(false)}
        selectedProduct={selectedProduct}
      />
    </div>
  );
}

export default ManagerProduct;
