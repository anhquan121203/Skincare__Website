import React, { useState } from "react";
import "./ManagerSkinType.css";
import { Input, Pagination, Button, Popconfirm } from "antd";
import { FaPlus } from "react-icons/fa";
import useSkinType from "../../../Hooks/useSkinType";
import ModalSkinTypes from "./ModalNewSkinType/ModalSkinType";
import { toast } from "react-toastify";

function ManagerSkinType() {
  const {
    skinTypes,
    loading,
    error,
    addNewSkinType,
    editSkinType,
    deleteSkinTyle,
  } = useSkinType();

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkintype, setEditingSkintype] = useState(null);
  const pageSize = 5;

  const handleOk = (newSkinType) => {
    setIsModalOpen(false);

    if (editingSkintype) {
      console.log(editingSkintype);

      editSkinType(newSkinType);
      toast.success("Cập nhật loại da thành công.");
    } else {
      addNewSkinType(newSkinType);
      toast.success("Tạo mới loại da thành công.");
    }

    setEditingSkintype(null);
  };

  const showModal = () => {
    setEditingSkintype(null); // Đặt về null để tránh dữ liệu cũ
    setIsModalOpen(true);
  };

  const showEditModal = (skinType) => {
    setEditingSkintype(skinType); // Set dữ liệu loại da cần sửa
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingSkintype(null); // Xóa dữ liệu cũ khi đóng modal
  };

  if (loading) return <p>Loading skin types...</p>;
  if (error) return <p>Error: {error}</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedSkinTypes = skinTypes.slice(startIndex, startIndex + pageSize);

  const handleDeleteSkinType = (id) => {
    deleteSkinTyle(id);
    toast.success("Xóa loại da thành công");
  };

  return (
    <div className="managerSkinType-container">
      <h1>Manage Skin Types</h1>
      <div className="content-manager-skinType">
        <div className="header-manager-skinType">
          <Button className="btn-addSkinType" onClick={showModal}>
            <FaPlus style={{ marginRight: "8px" }} /> Add New Skin Type
          </Button>
          <div className="search-skinType">
            <Input.Search
              placeholder="Search skin type..."
              style={{ width: 200 }}
            />
          </div>
        </div>

        <div className="table-skinType-container">
          <table className="table-skinType">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên loại da</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSkinTypes.map((item, index) => (
                <tr key={item.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{item.skinTypeName}</td>
                  <td>
                    <span className="status-active">{item.skinTypeStatus}</span>
                  </td>
                  <td>
                    <Button
                      className="btn-updateSkinType"
                      onClick={() => showEditModal(item)}
                    >
                      Cập nhật
                    </Button>
                    <Popconfirm
                      title="Xóa loại da"
                      description="Bạn muốn xóa loại da này?"
                      onConfirm={() => handleDeleteSkinType(item.id)}
                    >
                      <Button className="btn-removeSkinType">Xóa</Button>
                    </Popconfirm>
                  </td>
                </tr>
              ))}
            </tbody>
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
        editingSkintype={editingSkintype} // Truyền dữ liệu loại da cần sửa vào modal
      />
    </div>
  );
}

export default ManagerSkinType;
