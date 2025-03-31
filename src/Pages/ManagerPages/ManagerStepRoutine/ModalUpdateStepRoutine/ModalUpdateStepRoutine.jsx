import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useSkincareRoutine from "../../../../Hooks/useSkincareRoutine";
import useProduct from "../../../../Hooks/useProduct";

const ModalUpdateStepRoutine = ({
  isModalOpen,
  handleCancel,
  handleUpdate,
  updateStep,
}) => {
  const [form] = Form.useForm();
  const {skincareRoutine, loading} = useSkincareRoutine(); 
  const {products} = useProduct();


  useEffect(() => {
    if (updateStep) {
      form.setFieldsValue(updateStep); // Correct
    }
  }, [updateStep, isModalOpen]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        handleUpdate(values);
        toast.success("Cập nhật thành công!");
      })
      .catch((info) => {
        console.error("Validation Failed:", info);
        toast.error("Cập nhật không thành công!");
      });
  };

  return (
    <Modal
      title="Cập nhật câu hỏi"
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
        <Form.Item name="id" >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Câu hỏi"
          name="stepNumber"
          rules={[{ required: true, message: "Vui lòng thứ tự bước!" }]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Câu hỏi"
          name="stepDescription"
          rules={[{ required: true, message: "Vui lòng nhập mô tả thứ tự bước!" }]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Skincare Routine" name="routineId" rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm!" }]}>
          <Select loading={loading} placeholder="Chọn loại sản phẩm">
            {skincareRoutine.map((skincareRoutines) => (
              <Select.Option key={skincareRoutines.id} value={skincareRoutines.id}>
                {skincareRoutines.routineName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Sản phẩm" name="productId" rules={[{ required: true, message: "Vui lòng chọn loại da!" }]}>
          <Select loading={loading} placeholder="Chọn loại da">
            {products.map((product) => (
              <Select.Option key={product.id} value={product.id}>
                {product.productName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: "Vui lòng nhập trạng thái!" }]}
        >
          <Select>
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Inactive">Inactive</Select.Option>
          </Select>
        </Form.Item> */}
      </Form>

    </Modal>
  );
};

export default ModalUpdateStepRoutine;
