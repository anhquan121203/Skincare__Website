import { useState } from "react";
import { Table, Tag, Button, Space, Popconfirm } from "antd";
import useSkincareRoutine from "../../../Hooks/useSkincareRoutine";
import { toast } from "react-toastify";
import ModalSkincareRoutine from "./ModalSkincareRoutine/ModalSkincareRoutine";
import useSkinType from "../../../Hooks/useSkinType";
import "./ManagerSkincareRoutine.css";

function ManagerSkincareRoutine() {
  const {
    skincareRoutine,
    loading: loadingSkincareRoutine,
    error,
    addNewSkincareRoutine,
    editSkincareRoutine,
    removeSkincareRoutine,
  } = useSkincareRoutine();
  console.log("skincareRoutine", skincareRoutine);

  const {
    skinTypes,
    loading: loadingSkinType,
    error: errorSkinType,
  } = useSkinType();

  const skinTypeActive = skinTypes.filter(
    (item) => item.skinTypeStatus === "Active"
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên quy trình",
      dataIndex: "routineName",
      key: "routineName",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Loại da",
      dataIndex: "skinTypeName",
      key: "skinTypeName",
    },
    {
      title: "Tổng số bước",
      dataIndex: "totalSteps",
      key: "totalSteps",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button
            className="update-button"
            type="primary"
            onClick={() => handleEdit(record)}
          >
            Cập nhật
          </Button>
          <Popconfirm
            title="Xóa quy trình"
            description="Bạn chắc chắn muốn xóa quy trình này không?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button className="delete-button" type="danger">
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loadingSkincareRoutine || loadingSkinType)
    return <p className="loading">Loading...</p>;
  if (error || errorSkinType) return <p className="error">Lỗi</p>;

  const handleDelete = (id) => {
    removeSkincareRoutine(id);
    toast.success("Xóa quy trình chăm sóc da thành công!");
  };

  const handleAddNew = () => {
    setEditingRoutine(null);
    setModalVisible(true);
  };

  const handleEdit = (routine) => {
    setEditingRoutine(routine);
    setModalVisible(true);
  };

  const handleSubmit = (data) => {
    if (editingRoutine) {
      editSkincareRoutine(data);
    } else {
      addNewSkincareRoutine(data);
    }
    setModalVisible(false);
  };

  return (
    <div className="manager-container">
      <h1 className="title">Quản lý quy trình chăm sóc da</h1>
      <Button type="primary" className="add-button" onClick={handleAddNew}>
        Thêm loại quy trình mới
      </Button>
      {error && <p className="error">Lỗi: {error}</p>}
      <Table
        className="skincare-table"
        dataSource={skincareRoutine.filter((item) => item.status === "Active")}
        columns={columns}
        rowKey="id"
      />

      <ModalSkincareRoutine
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        skinTypes={skinTypeActive}
        initialData={editingRoutine}
        skincareRoutine={skincareRoutine} // Truyền danh sách quy trình hiện có
      />
    </div>
  );
}

export default ManagerSkincareRoutine;
