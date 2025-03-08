import "./checkoutPage.css";

const CheckoutPage = () => {
  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <h1 className="checkout-title">Thanh toán</h1>
        <div className="checkout-grid">
          {/* Thông tin giao hàng */}
          <div className="shipping-information">
            <h2 className="section-title">Thông tin giao hàng</h2>
            <form>
              <div className="input-group">
                <label>
                  Họ và tên <span className="required">*</span>
                </label>
                <input type="text" placeholder="Nhập họ và tên" />
              </div>
              <div className="input-group">
                <label>
                  Địa chỉ Email <span className="required">*</span>
                </label>
                <input type="email" placeholder="Nhập email của bạn" />
              </div>
              <div className="input-group">
                <label>
                  Số điện thoại <span className="required">*</span>
                </label>
                <input type="text" placeholder="Nhập số điện thoại" />
              </div>
              <div className="input-group">
                <label>
                  Địa chỉ nhận hàng <span className="required">*</span>
                </label>
                <input type="text" placeholder="Nhập địa chỉ" />
              </div>

              {/* Phương thức thanh toán */}
              <h2 className="section-title">Phương thức thanh toán</h2>
              <div className="payment-methods">
                <label>
                  <input type="radio" name="payment" value="momo" />
                  Ví điện tử (MoMo, ZaloPay, VNPay)
                </label>
                <label>
                  <input type="radio" name="payment" value="credit-card" />
                  Thẻ tín dụng / Ghi nợ
                </label>
                <label>
                  <input type="radio" name="payment" value="cod" />
                  Thanh toán khi nhận hàng (COD)
                </label>
              </div>

              <div className="terms-checkbox">
                <input type="checkbox" />
                <span>Tôi đồng ý với Điều khoản và Chính sách bảo mật.</span>
              </div>
            </form>
          </div>

          {/* Xem lại giỏ hàng */}
          <div className="review-cart">
            <h2 className="section-title">Giỏ hàng của bạn</h2>
            <div className="cart-items">
              <div className="cart-item">
                <img
                  src="https://example.com/serum.jpg"
                  alt="Serum dưỡng trắng"
                  className="product-image"
                />
                <div>
                  <p className="product-name">Serum Dưỡng Trắng</p>
                  <p className="product-qty">Số lượng: 1</p>
                  <p className="product-price">320.000₫</p>
                </div>
              </div>
              <div className="cart-item">
                <img
                  src="https://example.com/kem-duong-am.jpg"
                  alt="Kem dưỡng ẩm"
                  className="product-image"
                />
                <div>
                  <p className="product-name">Kem Dưỡng Ẩm</p>
                  <p className="product-qty">Số lượng: 1</p>
                  <p className="product-price">450.000₫</p>
                </div>
              </div>
              <div className="cart-item">
                <img
                  src="https://example.com/sua-rua-mat.jpg"
                  alt="Sữa rửa mặt dịu nhẹ"
                  className="product-image"
                />
                <div>
                  <p className="product-name">Sữa Rửa Mặt Dịu Nhẹ</p>
                  <p className="product-qty">Số lượng: 1</p>
                  <p className="product-price">230.000₫</p>
                </div>
              </div>
            </div>
            <div className="summary">
              <div>
                <span>Tạm tính: </span>
                <span> 1.000.000₫</span>
              </div>
              <div>
                <span>Phí vận chuyển: </span>
                <span> 30.000₫</span>
              </div>
              <div className="total">
                <span>Tổng cộng: </span>
                <span> 1.030.000₫</span>
              </div>
            </div>
            <button className="pay-now-button">Thanh toán ngay</button>
            <div className="secure-checkout">
              <i className="fas fa-lock"></i>
              <span>Thanh toán an toàn - Bảo mật SSL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
