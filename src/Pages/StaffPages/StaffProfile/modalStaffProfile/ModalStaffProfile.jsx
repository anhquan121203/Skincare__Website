import { Col, Form, Input, Modal, Row } from "antd";
import { useEffect } from "react";

function ModalStaffProfile({
  isModalOpen,
  handleCancel,
  handleConfirmUpdate,
  valuesFromParent,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalOpen && valuesFromParent) {
      form.setFieldsValue(valuesFromParent);
    }
  }, [isModalOpen, valuesFromParent]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        handleConfirmUpdate(values);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title="Cập nhật thông tin nhân viên"
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleSubmit}
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
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="phoneNumber" label="Số điện thoại">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="address" label="Địa chỉ">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalStaffProfile;
