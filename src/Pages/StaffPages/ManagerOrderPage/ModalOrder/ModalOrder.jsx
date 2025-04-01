import { Modal, Button, Form, Select, Input } from "antd";
import React, { useEffect } from "react";
import useAuth from "../../../../Hooks/useAuth";

function ModalOrder({ isModalOpen, handleCancel, handleOk, editingOrder }) {
  const { userId } = useAuth();
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingOrder) {
      form.setFieldsValue(editingOrder);
    } else {
      form.resetFields();
    }
  }, [editingOrder, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        handleOk(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title="Chỉnh sửa đơn hàng"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Cập nhật
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Mã đơn hàng" name="id">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Trạng thái đơn hàng"
          name="orderStatus"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Select>
            <Select.Option value="Pending">Chờ xử lý</Select.Option>
            <Select.Option value="Confirmed">Đã xác nhận</Select.Option>
            <Select.Option value="Processing">Đang xử lý</Select.Option>
            <Select.Option value="Completed">Đã nhận hàng</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalOrder;
