import useAuth from "../../../Hooks/useAuth";
import useOrder from "../../../Hooks/useOrder";
import useOrderDetails from "../../../Hooks/useOrderDetails";
import useProduct from "../../../Hooks/useProduct";
import { Table, Tag } from "antd";

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
];
function HistoryPage() {
  // gọi api
  const { userId } = useAuth();
  const { orders, loading, error } = useOrder();
  const { orderDetails } = useOrderDetails();
  const { products } = useProduct();

  if (loading) return <p>Đang tải đơn hàng...</p>;
  if (error) return <p>Lỗi khi tải đơn hàng: {error}</p>;

  console.log("userId", userId);
  console.log("orders", orders);
  console.log("orderDetails", orderDetails);
  console.log("products", products);

  //lịch sử order
  const orderHistory = orders?.filter((order) => order.customerId === userId);
  console.log("orderHistory", orderHistory);

  //lịch sử order details
  const orderDetailsHistory = orderDetails?.filter(
    (orderDetail) => orderDetail.orderId === orderHistory.id
  );
  console.log("orderDetailsHistory", orderDetailsHistory);

  return (
    <div>
      <h1>lịch sử mua hàng</h1>
      <Table dataSource={orderHistory} columns={columns} />
    </div>
  );
}

export default HistoryPage;
