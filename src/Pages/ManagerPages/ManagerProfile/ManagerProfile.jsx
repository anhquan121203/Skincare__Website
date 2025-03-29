import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Image, Row, Input } from "antd";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import { PROFILE_API_URL } from "../../../Constants/userContant";
import axios from "axios";

function ManagerProfile() {
  const {
    avatar,
    firstName,
    lastName,
    phoneNumber,
    birthday,
    email,
    address,
    roleName,
    updateAvatar,
  } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // ✅ Kiểm tra null tránh lỗi
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate that the file is a .jpg
    if (!file.name.toLowerCase().endsWith(".jpg")) {
      toast.error("Only .jpg files are allowed.");
      return;
    }

    // Create a preview of the selected image

    const formData = new FormData();
    formData.append("attachmentFile", file);

    try {
      const response = await axios.patch(
        `${PROFILE_API_URL}/UpdateAvatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newAvatarUrl = `${response.data.avatar}?t=${new Date().getTime()}`;
      console.log(response.data.avatar);
      updateAvatar(newAvatarUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        updateAvatar(reader.result);
      };
      reader.readAsDataURL(file);

      toast.success("Avatar updated successfully!");
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
      toast.error("Failed to update avatar");
    }
  };

  return (
    <div className="container mt-4">
      <Row gutter={[16, 16]}>
        {/* Left Column - Form */}
        <Col md={16}>
          <Card className="p-4 mb-4">
            <h4>Admin Information</h4>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="First Name">
                    <Input value={firstName} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name">
                    <Input value={lastName} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Birthday">
                    <Input value={formatDate(birthday)} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Role">
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
                  <Form.Item label="Phone">
                    <Input value={phoneNumber} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <h4>Address</h4>
              <Form.Item label="Address">
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
                <Button
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Change Image
                </Button>
                <input
                  type="file"
                  id="fileInput"
                  accept=".jpg"
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
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

export default ManagerProfile;
