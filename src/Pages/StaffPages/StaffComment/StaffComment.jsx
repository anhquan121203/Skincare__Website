import { useEffect, useState } from "react";
import { Table, Input, Typography, Tag, Button, Popconfirm } from "antd";
import { StarFilled, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import useComment from "../../../Hooks/useComment";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import useProduct from "../../../Hooks/useProduct";

const { Title } = Typography;

function StaffComment() {
  const [searchValue, setSearchValue] = useState("");
  const [productId, setProductId] = useState("");
  const { comments, loading, error, deleteComment } = useComment(productId);
  const { products } = useProduct();
  const { userId } = useAuth();

  // Kiểm tra khi comments thay đổi
  useEffect(() => {
    if (productId && comments === "No comments found for this product.") {
      toast.error("Không tìm thấy bình luận!");
    }
  }, [comments, productId]);

  // Xử lý xóa bình luận
  const handleDelete = async (id) => {
    try {
      await deleteComment(id);
      toast.success("Xóa bình luận thành công!");
    } catch (error) {
      toast.error("Xóa bình luận thất bại! Vui lòng thử lại.");
    }
  };

  // Xử lý khi nhấn Enter
  const handleSearch = () => {
    const selectedProduct = products.find(
      (item) => item.id === parseInt(searchValue, 10)
    );

    if (!selectedProduct) {
      toast.error("Sản phẩm không tồn tại!");
      return;
    }

    if (selectedProduct.staffId !== userId) {
      toast.error("Bạn không có quyền quản lý sản phẩm này!");
      return;
    }

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
      render: (date) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "N/A",
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
      render: (_, record) => {
        const product = products.find(
          (item) => item.id === parseInt(productId, 10)
        );
        const isAuthorized =
          product && String(product.staffId) === String(userId);

        return isAuthorized ? (
          <Popconfirm
            title="Chặn bình luận này?"
            description="Bạn muốn chặn bình luận này?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Chặn bình luận
            </Button>
          </Popconfirm>
        ) : null;
      },
    },
  ];

  return (
    <div className="staff-comment-container" style={{ padding: 20 }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Danh sách bình luận
      </Title>

      <Input
        placeholder="Nhập ID của sản phẩm..."
        style={{ width: 300, marginBottom: 20 }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onPressEnter={handleSearch}
        suffix={
          <SearchOutlined
            onClick={handleSearch}
            style={{ cursor: "pointer" }}
          />
        }
      />

      {!productId ? (
        <p>Nhập ID sản phẩm để xem bình luận.</p>
      ) : loading ? (
        <p>Đang tải bình luận...</p>
      ) : (
        <Table
          dataSource={
            Array.isArray(comments)
              ? comments.filter((c) => c.commentStatus === "Approved")
              : []
          }
          columns={columns}
          rowKey="id"
          bordered
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
}

export default StaffComment;
