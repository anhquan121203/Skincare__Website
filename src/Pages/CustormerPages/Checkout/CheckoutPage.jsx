import {
  Form,
  Input,
  Checkbox,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Image,
} from "antd";
import { LockOutlined } from "@ant-design/icons";

import useAuth from "../../../Hooks/useAuth";
import "./checkoutPage.css";
import useCart from "../../../Hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useWallet from "../../../Hooks/useWallet";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const CheckoutPage = () => {
  const { firstName, lastName, address, phoneNumber, email } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [paymentMethod, setPaymentMethod] = useState(null);

  const { carts, loading, error, payment } = useCart();

  const { wallet } = useWallet();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(carts);
  const handleCheckout = async () => {
    const orderDetailsIds = carts.map((item) => item.id);
    const totalPrice = carts.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ); // Tổng tiền bao gồm phí vận chuyển

    if (orderDetailsIds.length === 0) {
      toast.error("Không có sản phẩm nào trong giỏ hàng!");
      return;
    }

    console.log(
      "Thanh toán với danh sách ID:",
      orderDetailsIds,
      "Tổng tiền:",
      totalPrice
    );

    try {
      const response = await payment(orderDetailsIds, totalPrice); // Gửi cả orderDetailsIds và totalPrice

      console.log("Kết quả thanh toán:", response);

      if (response === 200) {
        toast.success("Thanh toán thành công!");
        navigate("/order-confirmation");
      } else {
        toast.error("Thanh toán thất bại! Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      toast.error("Có lỗi xảy ra khi thanh toán.");
    }
  };

  return (
    <div className="checkout-container">
      <Card
        className="checkout-box"
        title={
          <Title
            level={2}
            style={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Thanh toán
          </Title>
        }
      >
        <Row gutter={[24, 24]}>
          {/* Thông tin giao hàng */}
          <Col xs={24} md={12}>
            <Title level={4}>Thông tin giao hàng</Title>
            <Form layout="vertical">
              <Form.Item label="Họ và tên">
                <Input
                  value={firstName + " " + lastName}
                  placeholder="Nhập họ và tên"
                />
              </Form.Item>
              <Form.Item label="Địa chỉ Email">
                <Input
                  value={email}
                  placeholder="Nhập email của bạn"
                  disabled
                />
              </Form.Item>
              <Form.Item label="Số điện thoại">
                <Input value={phoneNumber} placeholder="Nhập số điện thoại" />
              </Form.Item>
              <Form.Item label="Địa chỉ nhận hàng">
                <Input value={address} placeholder="Nhập địa chỉ" />
              </Form.Item>

              {/* Phương thức thanh toán */}
              {/* <Title level={4}>Phương thức thanh toán</Title>
              <Form.Item>
                <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)}>
                  <Radio value="momo">Ví điện tử (MoMo, ZaloPay, VNPay)</Radio>
                  <Radio value="credit-card">Thẻ tín dụng / Ghi nợ</Radio>
                  <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
                </Radio.Group>
              </Form.Item> */}

              {/* <Form.Item>
                <Checkbox>
                  Tôi đồng ý với Điều khoản và Chính sách bảo mật.
                </Checkbox>
              </Form.Item> */}
            </Form>
          </Col>

          {/* Xem lại giỏ hàng */}
          {/* Xem lại giỏ hàng */}
          <Col xs={24} md={12}>
            <Title level={4}>Giỏ hàng của bạn</Title>
            <div className="cart-items">
              {carts.length > 0 ? (
                carts.map((item) => (
                  <Card key={item.id} className="cart-item" bordered={false}>
                    <Row gutter={16} align="middle">
                      <Col span={6}>
                        <Image
                          src={item.image}
                          alt={item.productName}
                          className="product-image"
                        />
                      </Col>
                      <Col span={18}>
                        <Text strong>{item.productName}</Text>
                        <br />
                        <Text type="secondary">Số lượng: {item.quantity}</Text>
                        <br />
                        <Text type="danger">
                          {new Intl.NumberFormat("vi-VN").format(item.price)}₫
                        </Text>
                      </Col>
                    </Row>
                  </Card>
                ))
              ) : (
                <Text>Giỏ hàng trống</Text>
              )}
            </div>

            {/* Tính tổng tiền */}
            <Card className="summary" bordered={false}>
              <Row justify="space-between" className="total">
                <Text strong>Tổng cộng:</Text>
                <Text strong style={{ marginLeft: 10 }}>
                  {new Intl.NumberFormat("vi-VN").format(
                    carts.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                  )}
                  ₫
                </Text>
              </Row>
            </Card>

            <Button
              type="primary"
              block
              size="large"
              className="pay-now-button"
              onClick={handleCheckout}
            >
              Thanh toán ngay
            </Button>
            {/* <div className="secure-checkout">
              <LockOutlined /> <span>Thanh toán an toàn - Bảo mật SSL</span>
            </div> */}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CheckoutPage;
