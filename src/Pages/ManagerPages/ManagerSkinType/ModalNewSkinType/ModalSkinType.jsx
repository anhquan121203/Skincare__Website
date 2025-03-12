import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";

const ModalSkinTypes = ({
  isModalOpen,
  handleCancel,
  handleOk,
  editingSkintype,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingSkintype) {
      form.setFieldsValue(editingSkintype);
    } else {
      form.resetFields();
    }
  }, [editingSkintype, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        handleOk({ ...editingSkintype, ...values }); // Tránh mất ID khi cập nhật
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  // Reset form khi đóng modal
  const onClose = () => {
    form.resetFields();
    handleCancel();
  };

  return (
    <Modal
      title={editingSkintype ? "Cập nhật loại da" : "Tạo mới loại da"}
      open={isModalOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {editingSkintype ? "Cập nhật" : "Thêm mới"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        {/* ID chỉ hiển thị khi chỉnh sửa */}
        {editingSkintype && (
          <Form.Item label="ID" name="id">
            <Input disabled />
          </Form.Item>
        )}

        <Form.Item
          label="Tên loại da"
          name="skinTypeName"
          rules={[{ required: true, message: "Vui lòng nhập tên loại da!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="skinTypeStatus"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Select>
            <Select.Option value="active">Active</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalSkinTypes;
