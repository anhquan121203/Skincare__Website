import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useCategory from "../../../../Hooks/useCategory";
import useSkinType from "../../../../Hooks/useSkinType";

const ModalAccountStaff = ({ isModalOpen, handleCancel, handleAdd }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields(); // Always reset form when modal opens
    }
  }, [isModalOpen]);

  const handleSubmit = () => {
    form.validateFields()
      .then((values) => {
        handleAdd(values);
        toast.success("Thêm sản phẩm mới thành công!");
        form.resetFields();
      })
      .catch((info) => {
        console.error("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title="Tạo sản phẩm mới"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Tạo sản phẩm
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Tên Staff" name="firstName" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Họ Staff" name="lastName" rules={[{ required: true, message: "Vui lòng nhập họ!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}>
          <Input/>
        </Form.Item>

        <Form.Item label="Ngày sinh" name="birthday" rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}>
        <Input type="date"  />
        </Form.Item>

        <Form.Item label="Số điện thoại" name="phoneNumber" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
        <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Vui lòng nhập email!" }]}>
          <Input type="email"/>
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
          <Input type="password"/>
        </Form.Item>
        
      </Form>
    </Modal>
  );
};

export default ModalAccountStaff;
