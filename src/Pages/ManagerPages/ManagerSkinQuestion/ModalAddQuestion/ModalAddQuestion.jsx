import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useCategory from "../../../../Hooks/useCategory";
import useSkinType from "../../../../Hooks/useSkinType";
import useSkinQuestion from "../../../../Hooks/useSkinQuestion";

const ModalAddQuestion = ({ isModalOpen, handleCancel, handleAdd }) => {
  const [form] = Form.useForm();
//  const {skinQuestion} = useSkinQuestion();
 

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields(); 
    }
  }, [isModalOpen]);

  const handleSubmit = () => {
    form.validateFields()
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
        <Form.Item label="Câu hỏi" name="questionText" rules={[{ required: true, message: "Vui lòng nhập câu hỏi!" }]}>
          <Input id="Câu hỏi" style={{width: "115%"}}/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddQuestion;
