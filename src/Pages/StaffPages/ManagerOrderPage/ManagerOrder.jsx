import { Button, Popconfirm, Table, Tag, Input } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

function ManageOrder() {
  const mockOrders = [
    {
      orderId: "1001",
      orderDate: 1708885200,
      tatolPrice: 99.99,
      userId: "userId 1",
      status: "Pending",
    },
    {
      orderId: "1002",
      orderDate: 1708971600,
      tatolPrice: 49.99,
      userId: "userId 2",
      status: "Shipped",
    },
    {
      orderId: "1003",
      orderDate: 1709058000,
      tatolPrice: 199.99,
      userId: "userId 3",
      status: "Delivered",
    },
    //ramdom ra nhiều order hơn để show ra table.............................
    ...Array.from({ length: 15 }, (_, i) => ({
      orderId: `${1004 + i}`,
      orderDate: 1709144400 + i * 86400,
      tatolPrice: (Math.random() * 200).toFixed(2),
      userId: `userId ${Math.floor(Math.random() * 3) + 1}`,
      status: ["Pending", "Shipped", "Delivered", "Cancelled"][
        Math.floor(Math.random() * 4)
      ],
    })),
  ];

  const mockUsers = [
    { userID: "1", fullName: "Alice Johnson" },
    { userID: "2", fullName: "Bob Smith" },
    { userID: "3", fullName: "Charlie Brown" },
  ];

  const [filteredOrder, setFilteredOrder] = useState(mockOrders);
  const [searchText, setSearchText] = useState("");

  const handleDelete = (orderId) => {
    setFilteredOrder(
      filteredOrder.filter((order) => order.orderId !== orderId)
    );
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      sorter: (a, b) => a.orderId - b.orderId,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (timestamp) => new Date(timestamp * 1000).toLocaleString(),
      sorter: (a, b) => a.orderDate - b.orderDate,
    },
    {
      title: "Total Price",
      dataIndex: "tatolPrice",
      key: "tatolPrice",
      render: (price) => `$${price}`,
      sorter: (a, b) => a.tatolPrice - b.tatolPrice,
    },
    {
      title: "User",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => {
        const user = mockUsers.find(
          (user) => String(user.userID) === userId.replace("userId ", "")
        );
        return user ? user.fullName : "Unknown";
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <>
          <Button type="primary">Edit</Button>{" "}
          <Popconfirm
            title="Delete Order"
            description="Are you sure to delete this order?"
            onConfirm={() => handleDelete(record.orderId)}
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
    const filteredData = mockOrders.filter(
      (item) =>
        item.orderId.toLowerCase().includes(value) ||
        item.status.toLowerCase().includes(value)
    );
    setFilteredOrder(filteredData);
  };

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
        dataSource={filteredOrder.map((item) => ({
          ...item,
          key: item.orderId,
        }))}
        columns={columns}
      />
    </div>
  );
}

export default ManageOrder;
