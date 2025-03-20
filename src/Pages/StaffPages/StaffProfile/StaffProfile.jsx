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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    // setEditingProduct(null);
  };

  const handleConfirmUpdate = async (updatedProduct) => {
    console.log("Updated Product:", updatedProduct);

    await editStaff(updatedProduct);
    toast.success("Cập nhật sản phẩm thành công!");
    setIsModalOpen(false);
    // setEditingProduct(null);
  };

  return (
    <div className="user-profile container mt-5 p-4">
      <Row gutter={[24, 24]}>
        {/* Left Column - Form */}
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
                    <Input value={formatDate(birthday)} disabled />
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

        {/* Right Column - User Card */}
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
            <Upload
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleUpload}
            >
              <Button icon={<UploadOutlined />} style={{ margin: "10px 0" }}>
                Thay ảnh đại diện
              </Button>
            </Upload>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
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
      />
    </div>
  );
}

export default StaffProfile;
