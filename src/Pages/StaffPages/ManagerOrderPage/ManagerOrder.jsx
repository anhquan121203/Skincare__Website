import { Button, Popconfirm, Table, Tag, Input } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import useOrder from "../../../Hooks/useOrder";
import useAuth from "../../../Hooks/useAuth";

function StaffOrderManager() {
  const { orders, loading, error } = useOrder();
  const [filteredOrder, setFilteredOrder] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { userId, firstName } = useAuth();
  console.log(userId, firstName);

  const handleDelete = (id) => {
    setFilteredOrder(orders.filter((order) => order.id !== id));
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
      render: (price) => `$${price}`,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Mã khách hàng",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Mã nhân viên",
      dataIndex: "staffId",
      key: "staffId",
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
        <>
          <Button type="primary">Chỉnh sửa</Button>{" "}
          <Popconfirm
            title="Xóa đơn hàng"
            description="Bạn có chắc chắn muốn xóa đơn hàng này không?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger type="primary">
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filteredData = orders.filter(
      (item) =>
        item.id.toString().includes(value) ||
        item.orderStatus.toLowerCase().includes(value)
    );
    setFilteredOrder(filteredData);
  };

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
        dataSource={orders
          .map((item) => ({ ...item, key: item.id }))
          .filter((item) => item.staffId === userId)}
        columns={columns}
      />
    </div>
  );
}

export default StaffOrderManager;
