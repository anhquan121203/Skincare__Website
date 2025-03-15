import React, { useState } from "react";
import { Table, Tag, Image, Button, Popconfirm, Input, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import useProduct from "../../../Hooks/useProduct";

function StaffProductManager() {
  const { products, loading, error } = useProduct();
  const [searchText, setSearchText] = useState("");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Hàm xử lý cập nhật
  const handleUpdate = (id) => {
    console.log("Cập nhật sản phẩm ID:", id);
  };

  // Hàm xử lý xóa
  const handleDelete = (id) => {
    console.log("Xóa sản phẩm ID:", id);
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
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record.id)}
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
            title="Bạn có chắc muốn xóa sản phẩm này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

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
        dataSource={filteredProducts.map((item) => ({ ...item, key: item.id }))}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default StaffProductManager;
