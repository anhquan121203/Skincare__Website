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

import useProduct from "../../../../Hooks/useProduct";
import useSkincareRoutine from "../../../../Hooks/useSkincareRoutine";

const ModalAddStepRoutine = ({
  isModalOpen,
  handleCancel,
  handleAdd,
  checkStepOfRoutine,
}) => {
  const [form] = Form.useForm();
  const { skincareRoutine } = useSkincareRoutine();
  const { products } = useProduct();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields();
    }
  }, [isModalOpen]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      // Check email exits
      const stepExist = await checkStepOfRoutine(values.stepNumber, values.routineId);
      if (stepExist) {
        toast.error(
          "Bước này đã tồn tại trong routine này. Vui lòng nhập bước khác!"
        );
        return;
      }

      await handleAdd(values);
      toast.success("Tạo thêm bước thành công!");
      form.resetFields();
      handleCancel();
    } catch (error) {
      console.error("Validation Failed:", error);
      toast.error("Tạo không thành công!");
    }
  };

  return (
    <Modal
      title="Tạo câu hỏi mới"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Tạo câu hỏi
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Thứ tự bước"
          name="stepNumber"
          rules={[{ required: true, message: "Vui lòng nhập thứ tự bước!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Mô tả bước"
          name="stepDescription"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Tên routine"
          name="routineId"
          rules={[{ required: true, message: "Vui lòng chọn loại da!" }]}
        >
          <Select loading={loading} placeholder="Chọn loại da">
            {skincareRoutine.map((skincareRoutines) => (
              <Select.Option
                key={skincareRoutines.id}
                value={skincareRoutines.id}
              >
                {skincareRoutines.routineName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Tên sản phẩm"
          name="productId"
          rules={[{ required: true, message: "Vui lòng chọn loại da!" }]}
        >
          <Select loading={loading} placeholder="Chọn loại da">
            {products.map((product) => (
              <Select.Option key={product.id} value={product.id}>
                {product.productName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddStepRoutine;
