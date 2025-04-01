import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useOrder from "../../../Hooks/useOrder";
import useCart from "../../../Hooks/useCart";
import { Button, Popconfirm, Table, Tag } from "antd";
import { toast } from "react-toastify";
import ViewOrderDetail from "./ModalViewOrderDetail/ViewOrderDetail";

function HistoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [localOrders, setLocalOrders] = useState([]);

  const { userId } = useAuth();
  const { orders, loading, error } = useOrder();
  const { canceledOrder } = useCart();

  useEffect(() => {
    if (orders) {
      setLocalOrders(orders.filter((order) => order.customerId === userId));
    }
  }, [orders, userId]);

  if (loading) return <p>Đang tải đơn hàng...</p>;
  if (error) return <p>Lỗi khi tải đơn hàng: {error}</p>;

  const handleCancelOrder = async (orderId, totalPrice, status) => {
    await canceledOrder(orderId, totalPrice, status);
    toast.success("Hủy đơn hàng thành công!!!");

    // Cập nhật trạng thái đơn hàng ngay trên giao diện
    setLocalOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, orderStatus: "Canceled" } : order
      )
    );
  };

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
      render: (price) => `${price.toLocaleString()}đ`,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => {
        const statusColors = {
          Pending: "orange",
          Confirmed: "blue",
          Processing: "purple",
          Completed: "green",
          Canceled: "red",
        };
        const statusLabels = {
          Pending: "Chờ xử lý",
          Confirmed: "Đã xác nhận",
          Processing: "Đang xử lý",
          Completed: "Đã nhận hàng",
          Canceled: "Đã hủy đơn hàng",
        };
        return <Tag color={statusColors[status]}>{statusLabels[status]}</Tag>;
      },
      sorter: (a, b) => a.orderStatus.localeCompare(b.orderStatus),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(true);
              setSelectedOrder(record);
            }}
          >
            Xem chi tiết
          </Button>
          {record.orderStatus === "Pending" && (
            <Popconfirm
              title="Xóa loại sản phẩm"
              description="Bạn muốn xóa loại sản phẩm này?"
              onConfirm={() =>
                handleCancelOrder(
                  record.id,
                  record.totalPrice,
                  record.orderStatus
                )
              }
            >
              <Button danger style={{ marginLeft: 10 }}>
                Hủy đơn hàng
              </Button>
            </Popconfirm>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Lịch sử mua hàng</h1>
      <Table dataSource={localOrders} columns={columns} rowKey="id" />
      {selectedOrder && (
        <ViewOrderDetail
          isModalOpen={isModalOpen}
          handleCancel={() => setIsModalOpen(false)}
          selectedOrder={selectedOrder}
        />
      )}
    </div>
  );
}

export default HistoryPage;
