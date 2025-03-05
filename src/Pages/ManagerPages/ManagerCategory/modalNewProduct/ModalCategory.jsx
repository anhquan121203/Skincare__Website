import { Modal, Button, Form, Input, Select } from "antd";
import React, { useEffect } from "react";

function ModalCategory({
  isModalOpen,
  handleCancel,
  handleOk,
  editingCategory,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingCategory) {
      form.setFieldsValue(editingCategory); // Điền dữ liệu vào form khi chỉnh sửa
    } else {
      form.resetFields(); // Reset form khi thêm mới
    }
  }, [editingCategory, form]);

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
      title={editingCategory ? "Chỉnh sửa danh mục" : "Tạo danh mục mới"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {editingCategory ? "Cập nhật" : "Tạo danh mục"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        {/* Trường ID chỉ hiển thị khi chỉnh sửa nhưng không cho chỉnh sửa */}
        {editingCategory && (
          <Form.Item label="ID" name="id">
            <Input disabled />
          </Form.Item>
        )}

        <Form.Item
          label="Tên danh mục"
          name="categoryName"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="categoryStatus"
          rules={[
            { required: true, message: "Vui lòng chọn trạng thái danh mục!" },
          ]}
        >
          <Select>
            <Select.Option value="Hoạt động">Hoạt động</Select.Option>
            <Select.Option value="Không hoạt động">
              Không hoạt động
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalCategory;
