import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useSkinQuestion from "../../../../Hooks/useSkinQuestion";

const ModalUpdateSkinQuestion = ({
  isModalOpen,
  handleCancel,
  handleUpdate,
  updateQuestion,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (updateQuestion) {
      form.setFieldsValue(updateQuestion); // Correct
    }
  }, [updateQuestion, isModalOpen]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        handleUpdate(values);
        toast.success("Cập nhật câu hỏi thành công!");
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
          name="questionText"
          rules={[{ required: true, message: "Vui lòng nhập câu hỏi!" }]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="skinQuestionStatus"
          rules={[{ required: true, message: "Vui lòng nhập câu hỏi!" }]}
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

export default ModalUpdateSkinQuestion;
