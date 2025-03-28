import { useState } from "react";
import { Table, Tag, Image, Button, Input, Space, Popconfirm } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import useProduct from "../../../Hooks/useProduct";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify"; // Import Modal cập nhật
import ModalProduct from "./ModalProduct/ModalProduct";

function StaffProductManager() {
  const { products, loading, error, editProduct, deleteProduct } = useProduct();
  const [searchText, setSearchText] = useState("");
  const { userId } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Xử lý mở Modal khi cập nhật sản phẩm
  const handleUpdate = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Xử lý xác nhận cập nhật
  const handleConfirmUpdate = (updatedProduct) => {
    console.log("Updated Product:", updatedProduct);

    editProduct(updatedProduct);
    toast.success("Cập nhật sản phẩm thành công!");
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // Lọc sản phẩm theo ID, Tên, Danh mục hoặc Loại da
  const filteredProducts = products.filter((product) => {
    const searchLower = searchText.toLowerCase();
    return (
      product.id.toString().includes(searchLower) || // Tìm theo ID
      product.productName.toLowerCase().includes(searchLower) || // Tìm theo Tên
      product.categoryName.toLowerCase().includes(searchLower) || // Tìm theo Danh mục
      product.skinTypeName.toLowerCase().includes(searchLower) // Tìm theo Loại da
    );
  });

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Loại da",
      dataIndex: "skinTypeName",
      key: "skinTypeName",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (url) => <Image width={80} src={url} />,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Trạng thái",
      dataIndex: "productStatus",
      key: "productStatus",
      render: (status) => {
        const color = status === "Available" ? "green" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              handleUpdate(record);
              setIsModalOpen(true);
            }}
            style={{
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
              display: "flex",
              alignItems: "center",
            }}
          >
            Cập nhật
          </Button>

          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn muốn xóa sản phẩm này không?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="danger" className="btn-delete">
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    deleteProduct(id);
    toast.success("Xóa sản phẩm thành công.");
  };

  return (
    <div>
      <h1>Quản lý sản phẩm</h1>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm theo ID, Tên, Danh mục hoặc Loại da..."
          prefix={<SearchOutlined />}
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 350 }}
        />
      </Space>
      <Table
        dataSource={filteredProducts
          .filter((item) => item.productStatus === "Available") // Chỉ hiển thị sản phẩm Available
          .map((item) => ({ ...item, key: item.id }))
          .filter((item) => String(item.staffId) === String(userId))}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />

      {/* Modal cập nhật sản phẩm */}
      <ModalProduct
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleConfirmUpdate={handleConfirmUpdate}
        editingProduct={editingProduct}
      />
    </div>
  );
}

export default StaffProductManager;
