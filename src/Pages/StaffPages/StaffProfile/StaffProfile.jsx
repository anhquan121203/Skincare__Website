import { useState, useEffect } from "react";
import "./StaffProfile.css";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Row,
  Input,
  Typography,
  Upload,
  Skeleton,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ModalStaffProfile from "./modalStaffProfile/ModalStaffProfile";
import { toast } from "react-toastify";
import axios from "axios";
import { FETCH_STAFF_PROFILE_API_URL } from "../../../Constants/staffContant";

const { Title, Text } = Typography;

function StaffProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffData, setStaffData] = useState(null);
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("accessToken");

  // Fetch dữ liệu khi trang load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${FETCH_STAFF_PROFILE_API_URL}/GetUserProfile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };
    fetchUserData();
  }, [token]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirmUpdate = async (updatedData) => {
    try {
      await axios.put(
        `${FETCH_STAFF_PROFILE_API_URL}/UpdateUserProfile`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Cập nhật hồ sơ thành công!");

      // Fetch lại dữ liệu sau khi cập nhật
      const response = await axios.get(
        `${FETCH_STAFF_PROFILE_API_URL}/GetUserProfile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserData(response.data);

      setIsModalOpen(false);
    } catch (error) {
      toast.error("Cập nhật không thành công!");
    }
  };

  if (!userData) {
    return <Skeleton active />;
  }

  return (
    <div className="user-profile container mt-5 p-4">
      <Row gutter={[24, 24]}>
        <Col md={16} sm={24}>
          <Card className="p-4 shadow-sm" style={{ borderRadius: "10px" }}>
            <Title level={4}>Thông tin nhân viên</Title>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Họ">
                    <Input value={userData.firstName} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Tên">
                    <Input value={userData.lastName} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Sinh Nhật">
                    <Input value={userData.birthday} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Chức vụ">
                    <Input value={userData.roleName} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Email">
                    <Input value={userData.email} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Số điện thoại">
                    <Input value={userData.phoneNumber} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Địa chỉ">
                <Input value={userData.address} disabled />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col md={8} sm={24}>
          <Card
            className="p-4 shadow-sm text-center"
            style={{ borderRadius: "10px", background: "#fff" }}
          >
            <Image
              style={{
                border: "5px solid #22a8e7",
                objectFit: "cover",
                width: "150px",
                height: "150px",
                borderRadius: "50%",
              }}
              src={
                userData.avatar ||
                "https://dragonball.guru/wp-content/uploads/2021/01/goku-dragon-ball-guru.jpg"
              }
              alt="User Avatar"
              preview={false}
            />
            <Title level={5} className="mt-3">
              {userData.firstName} {userData.lastName}
            </Title>
            <Text type="secondary">{userData.email}</Text>
            <p>{userData.phoneNumber}</p>
            <Upload showUploadList={false} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />} style={{ margin: "10px 0" }}>
                Thay ảnh đại diện
              </Button>
            </Upload>
            <Button
              type="primary"
              onClick={() => {
                setStaffData({
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                  birthday: userData.birthday,
                  email: userData.email,
                  phoneNumber: userData.phoneNumber,
                  address: userData.address,
                });
                setIsModalOpen(true);
              }}
            >
              Cập nhật thông tin
            </Button>
          </Card>
        </Col>
      </Row>

      <ModalStaffProfile
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleConfirmUpdate={handleConfirmUpdate}
        valuesFromParent={staffData}
      />
    </div>
  );
}

export default StaffProfile;
