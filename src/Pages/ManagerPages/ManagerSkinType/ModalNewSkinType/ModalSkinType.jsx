import { Button, Form, Input, InputNumber, Modal, Select, Upload } from "antd";
import { toast } from "react-toastify";
import useSkinType from "../../../../Hooks/useSkinType";

const ModalSkinTypes = ({ isModalOpen, handleCancel, handleOk }) => {
  const [form] = Form.useForm();
  const {skinTypes} = useSkinType();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        handleOk(values);
        toast.success("Thêm sản phẩm mới thành công!!!");
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title="Tạo tên loại da mới!!!"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Tên loại da mới
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên loại da"
          name="skinTypeName"
          rules={[
            {
              required: true,
              message: "Hãy nhập tên loại da!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        

        <Form.Item
          label="Loại da"
          name="skinTypeStatus"
          rules={[
            {
              required: true,
              message: "Please select a skin type!",
            },
          ]}
        >
          <Select>
            {skinTypes.map((skinType) => (
              <Select.Option key={skinType.id} value={skinType.id}>
                {skinType.skinTypeStatus}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

    
      </Form>
    </Modal>
  );
};

export default ModalSkinTypes;
