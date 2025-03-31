import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useCategory from "../../../../Hooks/useCategory";
import useSkinType from "../../../../Hooks/useSkinType";

const ModalAccountStaff = ({
  isModalOpen,
  handleCancel,
  handleAdd,
  checkEmailExists,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields(); // Always reset form when modal opens
    }
  }, [isModalOpen]);

  // const handleSubmit = async () => {
  //   form.validateFields()
  //     .then((values) => {
  //       handleAdd(values);
  //       toast.success("Tạo tài khoản staff thành công!");
  //       form.resetFields();
  //     })
  //     .catch((info) => {
  //       console.error("Validation Failed:", info);
  //       toast.error("Tạo tài khoản staff không thành công!")
  //     });
  // };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      // Check email exits
      const emailExists = await checkEmailExists(values.email);
      if (emailExists) {
        toast.error("Email đã tồn tại. Vui lòng nhập email khác!");
        return;
      }

      await handleAdd(values);
      toast.success("Tạo tài khoản staff thành công!");
      form.resetFields();
      handleCancel();
    } catch (error) {
      console.error("Validation Failed:", error);
      toast.error("Tạo tài khoản staff không thành công!");
    }
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
        <Form.Item
          label="Tên Staff"
          name="firstName"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Họ Staff"
          name="lastName"
          rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ngày sinh"
          name="birthday"
          rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input type="password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAccountStaff;
