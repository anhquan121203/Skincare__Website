import { Modal } from "antd";
import React from "react";
import useOrderDetails from "../../../../Hooks/useOrderDetails";
import useProduct from "../../../../Hooks/useProduct";
import "./ViewOrderDetail.css";

function ViewOrderDetail({ isModalOpen, handleCancel, selectedOrder }) {
  console.log("selectedOrder modal", selectedOrder);

  // Gọi API
  const { orderDetails } = useOrderDetails();
  const { products } = useProduct();

  if (!selectedOrder) return null; // Đảm bảo selectedOrder không bị undefined

  // Lọc danh sách chi tiết đơn hàng theo orderId
  const orderDetailsList = orderDetails?.filter(
    (item) => item.orderId === selectedOrder.id
  );

  console.log("orderDetailsList:", orderDetailsList);

  // Tìm danh sách sản phẩm từ orderDetails
  const orderedProducts = products?.filter((product) =>
    orderDetailsList.some((orderDetail) => orderDetail.productId === product.id)
  );

  console.log("orderedProducts:", orderedProducts);

  return (
    <Modal
      title="Thông tin chi tiết đơn hàng"
      open={isModalOpen}
      onCancel={handleCancel}
      width={1000}
      footer={null}
    >
      {orderedProducts.map((item) => {
        const orderDetail = orderDetailsList.find(
          (order) => order.productId === item.id
        );
        const quantity = orderDetail?.quantity || 0;
        const price = orderDetail?.price || 0;
        const totalPrice = quantity * price;

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
              <p>
                <strong>Giá sản phẩm:</strong> {price.toLocaleString()} đ
              </p>
            </div>
            <div className="item-price">
              <span>Tổng tiền: </span>
              {totalPrice.toLocaleString()} đ
            </div>
          </div>
        );
      })}
      {/* Hiển thị tổng tiền của toàn bộ đơn hàng */}
      <div className="order-total">
        <div className="grand-total">
          <span>
            <strong>Tổng cộng: </strong>
          </span>
          <span>{selectedOrder.totalPrice.toLocaleString()} đ</span>
        </div>
      </div>
    </Modal>
  );
}

export default ViewOrderDetail;
