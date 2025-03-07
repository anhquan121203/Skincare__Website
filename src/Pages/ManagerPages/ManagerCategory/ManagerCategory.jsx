import { useState } from "react";
import { Table, Button, Spin, Alert, Popconfirm } from "antd";
import useCategory from "../../../Hooks/useCategory";
import "./ManagerCategory.css";
import ModalCategory from "./modalNewProduct/ModalCategory";
import { toast } from "react-toastify";

function ManagerCategory() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const {
    categories,
    loading,
    error,
    addCategory,
    editCategory,
    deleteCategory,
  } = useCategory();

  if (loading) return <Spin size="large" className="loading-spinner" />;
  if (error)
    return <Alert message="Error" description={error} type="error" showIcon />;

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên loại sản phẩm",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Trạng thái",
      dataIndex: "categoryStatus",
      key: "categoryStatus",
      render: (text) => (
        <span className={text === "Active" ? "status-active" : ""}>{text}</span>
      ),
    },

    {
      title: "Action",
      key: "id",
      render: (id, record) => (
        <div className="action-buttons">
          <Button
            type="danger"
            className="btn-edit"
            onClick={() => {
              setEditingCategory(record);
              setIsModalOpen(true);
            }}
          >
            Cập nhật
          </Button>
          <Popconfirm
            title="Xóa loại sản phẩm"
            description="Bạn muốn xóa loại sản phẩm này?"
            onConfirm={() => handleDeleteCategory(record.id)}
          >
            <Button type="danger" className="btn-delete">
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleDeleteCategory = (id) => {
    deleteCategory(id);
    toast.success("Xóa loại sản phẩm thành công");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (newCategory) => {
    setIsModalOpen(false);

    if (editingCategory) {
      editCategory(newCategory);
      toast.success("Cập nhật danh mục thành công");
    } else {
      addCategory(newCategory);
      toast.success("Thêm danh mục thành công");
    }

    setEditingCategory(null); // Reset trạng thái sau khi cập nhật
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="category-manager">
      <h1>Quản lý loại sản phẩm</h1>

      <Button type="primary" onClick={showModal}>
        Thêm loại sản phẩm
      </Button>
      <Table
        dataSource={categories}
        columns={columns}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          onChange: (page) => setCurrentPage(page),
          style: { display: "flex", justifyContent: "center" },
        }}
        className="category-table"
      />
      <ModalCategory
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        editingCategory={editingCategory} // Truyền dữ liệu chỉnh sửa vào Modal
      />
    </div>
  );
}

export default ManagerCategory;
