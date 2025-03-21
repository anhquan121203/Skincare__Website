import useAuth from "../../../Hooks/useAuth";
import useOrder from "../../../Hooks/useOrder";
import { Button, Table, Tag } from "antd";
import ViewOrderDetail from "./ModalViewOrderDetail/ViewOrderDetail";
import { useState } from "react";

function HistoryPage() {
  // Đóng mở modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Gọi API
  const { userId } = useAuth();
  const { orders, loading, error, deleteOrder } = useOrder();

  if (loading) return <p>Đang tải đơn hàng...</p>;
  if (error) return <p>Lỗi khi tải đơn hàng: {error}</p>;

  // Lịch sử đơn hàng của người dùng
  const orderHistory = orders?.filter((order) => order.customerId === userId);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) => new Date(date).toLocaleString(),
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `$${price.toLocaleString()}`,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => {
        const statusColors = {
          Pending: "orange",
          Processing: "blue",
          Shipped: "purple",
          Delivered: "green",
          Cancelled: "red",
          Cart: "volcano",
        };
        const statusLabels = {
          Pending: "Chờ xử lý",
          Processing: "Đang xử lý",
          Shipped: "Đã giao hàng",
          Delivered: "Đã nhận hàng",
          Cancelled: "Đã hủy",
          Cart: "Đã trả hàng",
        };
        return <Tag color={statusColors[status]}>{statusLabels[status]}</Tag>;
      },
      sorter: (a, b) => a.orderStatus.localeCompare(b.orderStatus),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setSelectedOrder(record); // Truyền toàn bộ order
          }}
        >
          Xem chi tiết đơn hàng
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Lịch sử mua hàng</h1>
      <Table dataSource={orderHistory} columns={columns} rowKey="id" />
      {selectedOrder && (
        <ViewOrderDetail
          isModalOpen={isModalOpen}
          handleCancel={() => setIsModalOpen(false)}
          selectedOrder={selectedOrder} // Truyền toàn bộ order
        />
      )}
    </div>
  );
}

export default HistoryPage;
