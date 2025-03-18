import React, { useState } from "react";
import { Table, Input, Typography, Tag, Button, Modal, message } from "antd";
import {
  StarFilled,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import useComment from "../../../Hooks/useComment";

const { Title } = Typography;
const { confirm } = Modal;

function StaffComment() {
  const [searchValue, setSearchValue] = useState("");
  const [productId, setProductId] = useState("");
  const { comments, loading, error, deleteComment } = useComment(productId); // Thêm deleteComment từ hook

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error: {error}</p>;

  // Hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  // Hàm xử lý xóa bình luận
  const handleDelete = (id) => {
    confirm({
      title: "Bạn có chắc muốn xóa bình luận này?",
      icon: <ExclamationCircleOutlined />,
      content: "Thao tác này không thể hoàn tác.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await deleteComment(id);
          message.success("Xóa bình luận thành công!");
        } catch (error) {
          message.error("Xóa bình luận thất bại!");
        }
      },
    });
  };

  // Xử lý khi nhấn Enter
  const handleSearch = () => {
    setProductId(searchValue);
  };

  // Cấu hình cột của bảng Table
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
      align: "center",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      width: 100,
      align: "center",
      render: (rating) =>
        rating
          ? [...Array(rating)].map((_, i) => (
              <StarFilled key={i} style={{ color: "#fadb14" }} />
            ))
          : "N/A",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 120,
      align: "center",
      render: (date) => formatDate(date),
    },
    {
      title: "Trạng thái",
      dataIndex: "commentStatus",
      key: "commentStatus",
      width: 120,
      align: "center",
      render: (status) => (
        <Tag color={status === "Approved" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div className="staff-comment-container" style={{ padding: 20 }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Danh sách bình luận
      </Title>

      {/* Input nhập Product ID */}
      <Input
        placeholder="Nhập Product ID"
        style={{ width: 300, marginBottom: 20 }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onPressEnter={handleSearch} // Chỉ tìm khi nhấn Enter
        suffix={
          <SearchOutlined
            onClick={handleSearch}
            style={{ cursor: "pointer" }}
          />
        }
      />

      {/* Hiển thị bảng dữ liệu */}
      <Table
        dataSource={comments}
        columns={columns}
        rowKey="id"
        bordered
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default StaffComment;
