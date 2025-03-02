import { Button, Popconfirm, Table, Tag, Input } from "antd";
import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import useOrder from "../../../Hooks/useOrder";

function ManageOrder() {
  const { orders, loading, error } = useOrder();
  const [filteredOrder, setFilteredOrder] = useState([]);
  const [searchText, setSearchText] = useState("");

  // useEffect(() => {
  //   if (orders) {
  //     setFilteredOrder(orders);
  //   }
  // }, [orders]);

  const handleDelete = (id) => {
    setFilteredOrder(orders.filter((order) => order.id !== id));
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) => new Date(date).toLocaleString(),
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `$${price}`,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Customer ID",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Staff ID",
      dataIndex: "staffId",
      key: "staffId",
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => {
        const statusColors = {
          Pending: "orange",
          Processing: "blue",
          Shipped: "purple",
          Delivered: "green",
          Cancelled: "red",
          Returned: "volcano",
        };
        return <Tag color={statusColors[status]}>{status}</Tag>;
      },
      sorter: (a, b) => a.orderStatus.localeCompare(b.orderStatus),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="primary">Edit</Button>{" "}
          <Popconfirm
            title="Delete Order"
            description="Are you sure to delete this order?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger type="primary">
              Delete
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

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders: {error}</p>;

  return (
    <div>
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
          placeholder="Search by Order ID or Status..."
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </div>
      <Table
        dataSource={orders.map((item) => ({ ...item, key: item.id }))}
        columns={columns}
      />
    </div>
  );
}

export default ManageOrder;
