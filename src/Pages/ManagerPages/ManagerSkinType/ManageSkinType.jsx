import React, { useState } from "react";
import "./ManagerSkinType.css";
import { Input, Pagination } from "antd";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useSkinType from "../../../Hooks/useSkinType";
import ModalSkinTypes from "./ModalNewSkinType/ModalSkinType";

function ManagerSkinType() {
  const { skinTypes, loading, error } = useSkinType();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    // addNewSkinType(newSkinType);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedSkinTypes = skinTypes.slice(startIndex, startIndex + pageSize);

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
                <th style={{ width: "200px" }}>Tên loại da</th>
                <th>Trạng thái</th>
                <th>Action</th>
              </tr>
            </thead>
            {paginatedSkinTypes.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.skinTypeName}</td>
                  <td>
                    <span class="status-active">{item.skinTypeStatus}</span>
                  </td>
                  <td className="action-btnPro">
                    <button className="btn-updatePro">Cập nhật</button>
                    <button className="btn-removePro">Xóa</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={skinTypes.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: "16px", textAlign: "center" }}
        />
      </div>

      <ModalSkinTypes
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
}

export default ManagerSkinType;
