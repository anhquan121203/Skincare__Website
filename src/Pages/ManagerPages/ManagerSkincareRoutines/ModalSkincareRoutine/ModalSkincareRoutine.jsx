import { useEffect } from "react";
import { Modal, Input, Select, Form } from "antd";
import { toast } from "react-toastify";

function ModalSkincareRoutine({
  visible,
  onClose,
  onSubmit,
  skinTypes,
  initialData,
  skincareRoutine, // Thêm prop danh sách quy trình chăm sóc da
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        toast.success(
          initialData ? "Cập nhật thành công!" : "Thêm mới thành công!"
        );
        onClose();
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
  };

  // Lọc ra những loại da chưa có quy trình chăm sóc
  const usedSkinTypeIds = skincareRoutine.map((routine) => routine.skinTypeId);
  const availableSkinTypes = skinTypes.filter(
    (type) =>
      initialData?.skinTypeId === type.id || !usedSkinTypeIds.includes(type.id)
  );

  return (
    <Modal
      title={initialData ? "Cập nhật quy trình" : "Thêm quy trình mới"}
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText={initialData ? "Cập nhật" : "Thêm mới"}
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        {initialData && (
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
        )}
        <Form.Item
          label="Tên quy trình"
          name="routineName"
          rules={[{ required: true, message: "Vui lòng nhập tên quy trình!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Loại da"
          name="skinTypeId"
          rules={[{ required: true, message: "Vui lòng chọn loại da!" }]}
        >
          <Select placeholder="Chọn loại da">
            {availableSkinTypes.map((type) => (
              <Select.Option key={type.id} value={type.id}>
                {type.skinTypeName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalSkincareRoutine;
