import { useState } from "react";
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
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useAuth from "../../../Hooks/useAuth";
import useStaff from "../../../Hooks/useStaff";
import ModalStaffProfile from "./modalStaffProfile/ModalStaffProfile";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

function StaffProfile() {
  const {
    avatar,
    userId,
    firstName,
    lastName,
    phoneNumber,
    birthday,
    email,
    address,
    roleName,
  } = useAuth();
  const { editStaff } = useStaff();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffData, setStaffData] = useState(null);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirmUpdate = async (updatedData) => {
    await editStaff(updatedData);
    toast.success("Cập nhật thông tin nhân viên thành công!");
    setIsModalOpen(false);
  };

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
                    <Input value={firstName} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Tên">
                    <Input value={lastName} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Sinh Nhật">
                    <Input value={birthday} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Chức vụ">
                    <Input value={roleName} disabled />
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
                  <Form.Item label="Số điện thoại">
                    <Input value={phoneNumber} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Địa chỉ">
                <Input value={address} disabled />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Cột phải - Avatar và nút cập nhật */}
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
                avatar ||
                "https://dragonball.guru/wp-content/uploads/2021/01/goku-dragon-ball-guru.jpg"
              }
              alt="User Avatar"
              preview={false}
            />
            <Title level={5} className="mt-3">
              {firstName} {lastName}
            </Title>
            <Text type="secondary">{email}</Text>
            <p>{phoneNumber}</p>
            <Upload showUploadList={false} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />} style={{ margin: "10px 0" }}>
                Thay ảnh đại diện
              </Button>
            </Upload>
            <Button
              type="primary"
              onClick={() => {
                setStaffData({
                  firstName,
                  lastName,
                  birthday,
                  email,
                  phoneNumber,
                  address,
                  roleName,
                });
                setIsModalOpen(true);
              }}
            >
              Cập nhật thông tin
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Modal Update Profile */}
      <ModalStaffProfile
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleConfirmUpdate={handleConfirmUpdate}
        valuesFromParent={staffData} // Truyền dữ liệu vào modal
      />
    </div>
  );
}

export default StaffProfile;
