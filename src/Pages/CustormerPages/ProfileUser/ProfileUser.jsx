import { useState } from "react";
import "./ProfileUser.css";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Image, Row, Input } from "antd";
import useAuth from "../../../Hooks/useAuth";

function ProfileUser() {
  const {
    avatar,
    firstName,
    lastName,
    phoneNumber,
    birthday,
    email,
    address,
    roleName,
    wallet
  } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Kiểm tra null tránh lỗi
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <div className="user-profile container mt-4">
      <Row gutter={[16, 16]}>
        {/* Left Column - Form */}
        <Col md={16}>
          <Card className="p-4 mb-4">
            <h4>Thông tin người dùng</h4>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Tên">
                    <Input value={firstName} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Họ">
                    <Input value={lastName} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Ngày sinh">
                    <Input value={formatDate(birthday)} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Ví tiền">
                  <Input value={(Number(wallet) || 0).toLocaleString("vi-VN")} disabled />

                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Email">
                    <Input value={email} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Số điẹn thoại">
                    <Input value={phoneNumber} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <h4>Địa chỉ</h4>
              <Form.Item label="Địa chỉ">
                <Input value={address} disabled />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Right Column - User Card */}
        <Col md={8}>
          <Card className="p-4 mb-4 text-center">
            <Image
              style={{
                border: "5px solid #22a8e7",
                objectFit: "cover",
                width: "100%",
                height: "280px",
                borderRadius: "50%",
              }}
              src={avatar}
              alt="User Avatar"
            />
            <h5>
              {firstName} {lastName}
            </h5>
            <p>{email}</p>
            <p>{phoneNumber}</p>

            <Row gutter={16} justify="center">
              <Col>
                <Button
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Thay ảnh đại diện
                </Button>
                <input
                  type="file"
                  id="fileInput"
                  accept=".jpg"
                  style={{ display: "none" }}
                />
              </Col>
              <Col>
                <Button>Update Profile</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProfileUser;
