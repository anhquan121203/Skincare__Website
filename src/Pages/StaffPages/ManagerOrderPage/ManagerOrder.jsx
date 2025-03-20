import { Button, Table, Tag, Input } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import useOrder from "../../../Hooks/useOrder";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import ModalOrder from "./ModalOrder/ModalOrder";
import ViewOrderDetail from "../../CustormerPages/HistoryPage/ModalViewOrderDetail/ViewOrderDetail";

function StaffOrderManager() {
  const { orders, loading, error, editOrder } = useOrder();
  const [searchText, setSearchText] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { userId } = useAuth();

  const handleOk = async (newOrder) => {
    setIsEditModalOpen(false);
    await editOrder(newOrder);
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

  const filteredOrders = orders.filter(
    (item) =>
      item.staffId === userId &&
      (item.id.toString().includes(searchText) ||
        item.orderStatus.toLowerCase().includes(searchText))
  );

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
      render: (price) => `$${price}`,
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
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="primary"
            onClick={() => {
              setEditingOrder(record);
              setIsEditModalOpen(true);
            }}
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
      ),
    },
  ];

  if (loading) return <p>Đang tải đơn hàng...</p>;
  if (error) return <p>Lỗi khi tải đơn hàng: {error}</p>;

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
