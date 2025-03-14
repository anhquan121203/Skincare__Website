import { useState } from "react";
import {
  Form,
  Input,
  Radio,
  Checkbox,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Image,
} from "antd";
import { LockOutlined } from "@ant-design/icons";
import duongDa from "../../../assets/imageBlogger/duong-da.webp";
import useAuth from "../../../Hooks/useAuth";
import "./checkoutPage.css";
import useCart from "../../../Hooks/useCart";

const { Title, Text } = Typography;

const CheckoutPage = () => {
  const { firstName, lastName, address, phoneNumber, email } = useAuth();
  // const [paymentMethod, setPaymentMethod] = useState(null);

  const { carts, loading, error } = useCart();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(carts);

  return (
    <div className="checkout-container">
      <Card
        className="checkout-box"
        title={<Title level={2}>Thanh toán</Title>}
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
                <Input value={email} placeholder="Nhập email của bạn" />
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

              <Form.Item>
                <Checkbox>
                  Tôi đồng ý với Điều khoản và Chính sách bảo mật.
                </Checkbox>
              </Form.Item>
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
              <Row justify="space-between">
                <Text>Tạm tính:</Text>
                <Text>
                  {new Intl.NumberFormat("vi-VN").format(
                    carts.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                  )}
                  ₫
                </Text>
              </Row>
              <Row justify="space-between">
                <Text>Phí vận chuyển:</Text>
                <Text>30.000₫</Text>
              </Row>
              <Row justify="space-between" className="total">
                <Text strong>Tổng cộng:</Text>
                <Text strong>
                  {new Intl.NumberFormat("vi-VN").format(
                    carts.reduce(
                      (total, item) => total + item.price * item.quantity,
                      30000
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
            >
              Thanh toán ngay
            </Button>
            <div className="secure-checkout">
              <LockOutlined /> <span>Thanh toán an toàn - Bảo mật SSL</span>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CheckoutPage;
