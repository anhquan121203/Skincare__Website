import React, { useState } from "react";
import { Input, Pagination, Button, Popconfirm, Table, Tag } from "antd";
import { FaPlus } from "react-icons/fa";
import useSkinType from "../../../Hooks/useSkinType";
import ModalSkinTypes from "./ModalNewSkinType/ModalSkinType";
import { toast } from "react-toastify";
import "./ManagerSkinType.css";

function ManagerSkinType() {
  const { skinTypes, loading, addNewSkinType, editSkinType, deleteSkinTyle } =
    useSkinType();

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkintype, setEditingSkintype] = useState(null);
  const pageSize = 5;

  const handleOk = (newSkinType) => {
    setIsModalOpen(false);

    if (editingSkintype) {
      editSkinType(newSkinType);
      toast.success("Cập nhật loại da thành công.");
    } else {
      addNewSkinType(newSkinType);
      toast.success("Tạo mới loại da thành công.");
    }

    setEditingSkintype(null);
  };

  const showModal = () => {
    setEditingSkintype(null);
    setIsModalOpen(true);
  };

  const showEditModal = (skinType) => {
    setEditingSkintype(skinType);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingSkintype(null);
  };

  const handleDeleteSkinType = (id) => {
    deleteSkinTyle(id);
    toast.success("Xóa loại da thành công");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên loại da",
      dataIndex: "skinTypeName",
      key: "skinTypeName",
    },
    {
      title: "Trạng thái",
      dataIndex: "skinTypeStatus",
      key: "skinTypeStatus",
      render: (text) => (
        <span className={text === "Active" ? "status-active" : ""}>{text}</span>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            className="btn-updateSkinType"
            onClick={() => showEditModal(record)}
          >
            Cập nhật
          </Button>
          <Popconfirm
            title="Xóa loại da"
            description="Bạn muốn xóa loại da này?"
            onConfirm={() => handleDeleteSkinType(record.id)}
          >
            <Button className="btn-removeSkinType">Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="managerSkinType-container">
      <h1>Quản lý loại da mới</h1>
      <div className="content-manager-skinType">
        <div className="header-manager-skinType">
          <Button className="btn-addSkinType" onClick={showModal}>
            <FaPlus style={{ marginRight: "8px" }} /> Thêm loại da mới
          </Button>
          <Input.Search placeholder="tìm kiếm loại da..." />
        </div>

        <Table
          columns={columns}
          dataSource={skinTypes}
          loading={loading}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: skinTypes.length,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </div>

      <ModalSkinTypes
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        editingSkintype={editingSkintype}
      />
    </div>
  );
}

export default ManagerSkinType;
