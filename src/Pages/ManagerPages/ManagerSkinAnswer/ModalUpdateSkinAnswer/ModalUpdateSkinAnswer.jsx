import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useSkinQuestion from "../../../../Hooks/useSkinQuestion";
import useSkinType from "../../../../Hooks/useSkinType";

const ModalUpdateSkinAnswer = ({
  isModalOpen,
  handleCancel,
  handleUpdate,
  updateAnswer,
}) => {
  const [form] = Form.useForm();
  const {skinQuestion, loading, error} = useSkinQuestion();
  const {skinTypes} = useSkinType(); 

  useEffect(() => {
    if (updateAnswer) {
      form.setFieldsValue(updateAnswer); // Correct
    }
  }, [updateAnswer, isModalOpen]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        handleUpdate(values);
        // toast.success("Cập nhật câu hỏi thành công!");
      })
      .catch((info) => {
        console.error("Validation Failed:", info);
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
        <Form.Item name="id" hidden>
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Câu hỏi"
          name="answerText"
          rules={[{ required: true, message: "Vui lòng nhập câu hỏi!" }]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Câu hỏi" name="questionId" rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm!" }]}>
          <Select loading={loading} placeholder="Chọn loại sản phẩm">
            {skinQuestion.map((skinQuestions) => (
              <Select.Option key={skinQuestions.id} value={skinQuestions.id}>
                {skinQuestions.questionText}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Loại da" name="skinTypeId" rules={[{ required: true, message: "Vui lòng chọn loại da!" }]}>
          <Select loading={loading} placeholder="Chọn loại da">
            {skinTypes.map((skinType) => (
              <Select.Option key={skinType.id} value={skinType.id}>
                {skinType.skinTypeName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="skinAnswerStatus"
          rules={[{ required: true, message: "Vui lòng nhập trạng thái!" }]}
        >
          <Select>
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>
      </Form>

    </Modal>
  );
};

export default ModalUpdateSkinAnswer;
