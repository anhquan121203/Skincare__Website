import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useSkinType from "../../../../Hooks/useSkinType";
import useSkinQuestion from "../../../../Hooks/useSkinQuestion";

const ModalAddAnswer = ({ isModalOpen, handleCancel, handleAdd }) => {
  const [form] = Form.useForm();
  const { skinQuestion } = useSkinQuestion();
  const { skinTypes } = useSkinType();

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields();
    }
  }, [isModalOpen]);

  const handleSubmit = () => {
    form
      .validateFields()
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
          label="Câu hỏi"
          name="answerText"
          rules={[{ required: true, message: "Vui lòng nhập câu hỏi!" }]}
        >
          <Input id="Câu hỏi" style={{ width: "115%" }} />
        </Form.Item>
      </Form>

      <Form.Item layout="vertical"
        label="Câu hỏi"
        name="questionId"
        rules={[{ required: true, message: "Vui lòng chọn loại da!" }]}
      >
        <Select placeholder="Chọn loại da">
          {skinQuestion.map((skinQuestion) => (
            <Select.Option key={skinQuestion.id} value={skinQuestion.id}>
              {skinQuestion.questionText}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item layout="vertical"
        label="Loại da"
        name="skinTypeId"
        rules={[{ required: true, message: "Vui lòng chọn loại da!" }]}
      >
        <Select placeholder="Chọn loại da">
          {skinTypes.map((skinType) => (
            <Select.Option key={skinType.id} value={skinType.id}>
              {skinType.skinTypeName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Modal>
  );
};

export default ModalAddAnswer;
