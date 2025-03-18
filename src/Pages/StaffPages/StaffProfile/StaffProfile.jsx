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
  Modal,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useAuth from "../../../Hooks/useAuth";
import useStaff from "../../../Hooks/useStaff";

const { Title, Text } = Typography;

function StaffProfile() {
  const {
    avatar,
    firstName,
    lastName,
    phoneNumber,
    birthday,
    email,
    address,
    roleName,
  } = useAuth();
  const { editStaff } = useStaff();
  const { token } = useAuth(); // Lấy token từ auth

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

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

  const handleUpdate = () => {
    form.setFieldsValue({
      firstName,
      lastName,
      phoneNumber,
      birthday,
      email,
      address,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updatedStaff = { ...values, avatar };
      await editStaff({ staff: updatedStaff, token });
      message.success("Cập nhật thông tin thành công!");
      setIsModalOpen(false);
    } catch (error) {
      message.error("Vui lòng nhập đầy đủ thông tin!");
    }
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
            <Button type="primary" onClick={handleUpdate}>
              Cập nhật thông tin
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Modal Update Profile */}
      <Modal
        title="Cập nhật thông tin nhân viên"
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu thay đổi"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="Họ"
                rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Tên"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="birthday" label="Sinh Nhật">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phoneNumber" label="Số điện thoại">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default StaffProfile;
