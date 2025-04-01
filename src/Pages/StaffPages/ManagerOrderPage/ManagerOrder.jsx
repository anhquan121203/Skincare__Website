import { Button, Table, Tag, Input } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import useOrder from "../../../Hooks/useOrder";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import ModalOrder from "./ModalOrder/ModalOrder";
import ViewOrderDetail from "../../CustormerPages/HistoryPage/ModalViewOrderDetail/ViewOrderDetail";
import useAccount from "../../../Hooks/useAccount";

function StaffOrderManager() {
  const { account, loading: accountLoading } = useAccount();
  const { orders, loading, error, editOrder } = useOrder();
  const [searchText, setSearchText] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { userId } = useAuth();

  const handleOk = async (newOrder) => {
    setIsEditModalOpen(false);
    console.log("Updated Order:", newOrder);
    const updatedOrder = { ...newOrder, staffId: userId };

    await editOrder(updatedOrder);
    toast.success("Cập nhật đơn hàng thành công");
    setEditingOrder(null);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setEditingOrder(null);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredOrders = orders
    .filter(
      (item) =>
        item.staffId === userId &&
        (item.id.toString().includes(searchText) ||
          item.orderStatus.toLowerCase().includes(searchText))
    )
    .filter((order) => order.orderStatus !== "Cart");

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
      render: (price) => `${price}đ`,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Mã khách hàng",
      dataIndex: "customerId",
      key: "customerId",
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
      render: (_, record) => {
        const isDisabled =
          record.orderStatus === "Completed" ||
          record.orderStatus === "Canceled";

        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              type="primary"
              onClick={() => {
                if (!isDisabled) {
                  // Ngăn không cho mở modal nếu bị disable
                  setEditingOrder(record);
                  setIsEditModalOpen(true);
                }
              }}
              disabled={isDisabled} // Vô hiệu hóa nút nếu trạng thái là Completed hoặc Canceled
            >
              Chỉnh sửa
            </Button>

            <Button
              type="default"
              onClick={() => {
                setSelectedOrder(record);
                setIsViewModalOpen(true);
              }}
            >
              Xem chi tiết đơn hàng
            </Button>
          </div>
        );
      },
    },
  ];

  if (loading) return <p>Đang tải đơn hàng...</p>;
  if (error) return <p>Lỗi khi tải đơn hàng: {error}</p>;

  if (accountLoading) {
    return <div>Loading...</div>;
  }
  console.log("account", account);

  return (
    <div>
      <h1>Quản lý đơn hàng</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: 16,
        }}
      >
        <SearchOutlined style={{ fontSize: "16px", color: "#1890ff" }} />
        <Input
          placeholder="Tìm kiếm theo mã đơn hàng hoặc trạng thái..."
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </div>
      <Table
        dataSource={filteredOrders.map((item) => ({ ...item, key: item.id }))}
        columns={columns}
      />

      {/* Modal xem chi tiết đơn hàng */}
      {selectedOrder && (
        <ViewOrderDetail
          isModalOpen={isViewModalOpen}
          handleCancel={() => setIsViewModalOpen(false)}
          selectedOrder={selectedOrder}
        />
      )}

      {/* Modal chỉnh sửa đơn hàng */}
      <ModalOrder
        isModalOpen={isEditModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        editingOrder={editingOrder}
      />
    </div>
  );
}

export default StaffOrderManager;
