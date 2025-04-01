import { useEffect, useState } from "react";
import "../ProfileUser.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Image, Row, Input } from "antd";

import useAuth from "../../../../Hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { ACCOUNT_API_URL } from "../../../../Constants/accountConstant";

function EditProfileUser() {
  const {
    avatar,
    firstName,
    lastName,
    phoneNumber,
    birthday,
    email,
    address,
    roleName,
    wallet,
    updateAvatar,
  } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Kiểm tra null tránh lỗi
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const [editUser, setEditUser] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    phoneNumber: phoneNumber || "",
    email: email || "",
    address: address || "",
    birthday: birthday ? new Date(birthday).toISOString().split("T")[0] : "",
  });

  useEffect(() => {
    setEditUser({
      firstName: firstName || "",
      lastName: lastName || "",
      phoneNumber: phoneNumber || "",
      email: email || "",
      address: address || "",
      birthday: birthday ? new Date(birthday).toISOString().split("T")[0] : "",
    });
  }, [firstName, lastName, phoneNumber, email, address, birthday]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevInfor) => ({ ...prevInfor, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      await axios.put(`${ACCOUNT_API_URL}/UpdateUserProfile`, editUser, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Cập nhật hồ sơ thành công!");
      navigate("/profile-user");
    } catch (error) {
      toast.error("Cập nhật không thành công!");
    }
  };

  return (
    <div className="user-profile container mt-4">
      <Row gutter={[16, 16]}>
        {/* Left Column - Form */}
        <Col md={16}>
          <Card className="p-4 mb-4">
            <h4>Thông tin người dùng</h4>
            <Form onFinish={handleSubmit} layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Tên">
                    <Input
                      name="firstName"
                      value={editUser.firstName}
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Họ">
                    <Input
                      name="lastName"
                      value={editUser.lastName}
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Ngày sinh">
                    <Input
                      name="birthday"
                      type="date"
                      value={editUser.birthday}
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Ví tiền">
                    <Input
                      value={(Number(wallet) || 0).toLocaleString("vi-VN")}
                      disabled
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Email">
                    <Input value={email} disabled 
                    onChange={handleChange}/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Số điẹn thoại">
                    <Input
                      name="phoneNumber"
                      value={editUser.phoneNumber}
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <h4>Địa chỉ</h4>
              <Form.Item label="Địa chỉ">
                <Input
                  name="address"
                  value={editUser.address}
                  onChange={handleChange}
                />
              </Form.Item>

              <Row justify="center" className="mt-3">
                <Col>
                  <Button
                    onClick={() => navigate("/profile-user")}
                    style={{ marginRight: "10px" }}
                  >
                    Hủy
                  </Button>
                </Col>
                <Col>
                  <Button htmlType="submit" type="primary">
                    Cập nhật hồ sơ
                  </Button>
                </Col>
              </Row>
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
                width: "300px",
                height: "300px",
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
                <Link to="/profile-user">
                  <Button>Quay lại</Button>
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default EditProfileUser;
