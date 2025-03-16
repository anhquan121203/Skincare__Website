import React, { useState } from "react";
import { Table, Input, Typography, Tag } from "antd";
import { StarFilled } from "@ant-design/icons";
import useComment from "../../../Hooks/useComment";

const { Title } = Typography;

function StaffComment() {
  const [productId, setProductId] = useState("");
  const { comments, loading, error } = useComment(productId); // Giả sử lấy tất cả comment ban đầu

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error: {error}</p>;

  // Hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN");
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
      render: (rating) => (
        <>
          {[...Array(rating)].map((_, i) => (
            <StarFilled key={i} style={{ color: "#fadb14" }} />
          ))}
        </>
      ),
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
        onChange={(e) => setProductId(e.target.value)}
      />

      {/* Hiển thị bảng dữ liệu */}
      <Table
        dataSource={comments}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default StaffComment;
