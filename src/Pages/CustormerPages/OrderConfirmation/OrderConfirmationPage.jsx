import React from "react";
import "./OrderConfirmationPage.css";
import {
  CheckCircleFilled,
  HomeFilled,
  LeftCircleOutlined,
  CreditCardFilled,
  ShoppingCartOutlined,
  ReloadOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import useOrder from "../../../Hooks/useOrder";
import useAuth from "../../../Hooks/useAuth";
import useOrderDetails from "../../../Hooks/useOrderDetails";
import useProduct from "../../../Hooks/useProduct";
import { Link } from "react-router-dom";

const OrderConfirmationPage = () => {
  const { orders } = useOrder();
  const { firstName, lastName, phoneNumber, address } = useAuth();
  const { orderDetails } = useOrderDetails();
  const { products } = useProduct();

  console.log("orders", orders);

  // Lấy order mới nhất theo orderDate
  const latestOrder = orders?.length
    ? orders.reduce((latest, current) =>
        new Date(current.orderDate) > new Date(latest.orderDate)
          ? current
          : latest
      )
    : null;
  console.log("latestOrder", latestOrder);

  // tim ra order details theo order id
  const orderDetailsIds = orderDetails.filter(
    (item) => item.orderId === latestOrder.id
  );
  console.log("orderDetailsIds:", orderDetailsIds);

  // tìm ra list sản phẩm theo order details id
  const orderedProducts = products.filter((product) =>
    orderDetailsIds.some((orderDetail) => orderDetail.productId === product.id)
  );
  console.log("orderedProducts:", orderedProducts);

  // Format ngày giờ
  const formattedDate =
    latestOrder &&
    new Date(latestOrder.orderDate).toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const formattedTime =
    latestOrder &&
    new Date(latestOrder.orderDate).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <div className="order-container">
      <div className="order-card">
        <div className="order-header">
          <div className="icon">
            <CheckCircleFilled />
          </div>
          <h1>Cảm ơn bạn đã đặt hàng!</h1>

          {latestOrder && (
            <>
              <div className="order-status">
                <span>
                  ĐƠN HÀNG # {latestOrder.id} -{" "}
                  {latestOrder.orderStatus.toUpperCase()}
                </span>
              </div>
              <p className="order-date">
                Ngày đặt hàng: {formattedDate} - {formattedTime}
              </p>
            </>
          )}
        </div>

        <div className="order-info">
          <div className="order-box">
            <h2>
              <i>
                <HomeFilled style={{ marginRight: "5px" }} />
              </i>
              THÔNG TIN KHÁCH HÀNG
            </h2>
            <p>
              <strong>Người mua: </strong> {firstName + " " + lastName}
            </p>
            <p>
              <strong>Địa chỉ: </strong> {address}
            </p>
            <p>
              <strong>Điện thoại: </strong> {phoneNumber}
            </p>
          </div>

          <div className="order-box">
            <h2>
              <CreditCardFilled style={{ marginRight: "5px" }} /> PHƯƠNG THỨC
              THANH TOÁN
            </h2>
            <p>Sử dụng ví</p>
          </div>
        </div>

        <div className="order-summary">
          <h2>
            <ShoppingCartOutlined style={{ marginRight: "5px" }} /> TÓM TẮT ĐƠN
            HÀNG
          </h2>

          {orderedProducts.map((item) => {
            const orderDetail = orderDetailsIds.find(
              (order) => order.productId === item.id
            );
            const quantity = orderDetail?.quantity || 0;
            const price = orderDetail?.price || 0;
            const totalPrice = quantity * price; // Tính tổng tiền sản phẩm

            return (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <p className="item-name">{item.name}</p>
                  <p>
                    <strong>Tên sản phẩm:</strong> {item.productName}
                  </p>
                  <p>
                    <strong>Số lượng:</strong> {quantity}
                  </p>
                </div>
                <div className="item-price">
                  {totalPrice.toLocaleString()} đ
                </div>
              </div>
            );
          })}

          <div className="order-total">
            <div className="grand-total">
              <span>Tổng cộng</span>
              <span>{latestOrder?.totalPrice.toLocaleString()} đ</span>
            </div>
          </div>
        </div>

        <div className="order-actions">
          <Link to="/">
            <button className="btn btn-primary">
              <LeftCircleOutlined style={{ marginRight: "5px" }} /> Tiếp tục mua
              sắm
            </button>
          </Link>
          <Link to="/history">
            <button className="btn btn-secondary">
              <PrinterOutlined style={{ marginRight: "5px" }} />
              Xem lịch sử đơn hàng
            </button>
          </Link>
          {/* <button className="btn btn-primary">
            <ReloadOutlined style={{ marginRight: "5px" }} />
            Đặt hàng lại
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
