import { useEffect } from "react";
import { Modal, Form, Input, InputNumber, DatePicker, Select } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

function ModalProduct({
  isModalOpen,
  handleCancel,
  handleConfirmUpdate,
  editingProduct,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingProduct) {
      form.setFieldsValue({
        ...editingProduct,
        createdDate: dayjs(editingProduct.createdDate),
        expiredDate: dayjs(editingProduct.expiredDate),
      });
    }
  }, [editingProduct, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      handleConfirmUpdate({
        ...editingProduct,
        ...values,
        createdDate: values.createdDate.format(),
        expiredDate: values.expiredDate.format(),
      });
    });
  };

  return (
    <Modal
      title="Cập nhật sản phẩm"
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleSubmit}
      okText="Cập nhật"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="id">
          <Input />
        </Form.Item>

        <Form.Item
          name="productName"
          label="Tên sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá"
          rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Số lượng"
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item
          name="createdDate"
          label="Ngày tạo"
          rules={[{ required: true, message: "Vui lòng chọn ngày tạo!" }]}
        >
          <DatePicker style={{ width: "100%" }} showTime />
        </Form.Item>

        <Form.Item
          name="expiredDate"
          label="Ngày hết hạn"
          rules={[{ required: true, message: "Vui lòng chọn ngày hết hạn!" }]}
        >
          <DatePicker style={{ width: "100%" }} showTime />
        </Form.Item>

        <Form.Item name="productStatus" label="Trạng thái">
          <Select>
            <Option value="Available">Có sẵn</Option>
            <Option value="Unavailable">Hết hàng</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalProduct;
