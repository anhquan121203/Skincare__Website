import { Button, Form, Input, InputNumber, Modal, Select, Upload } from "antd";
import { FiPlus } from "react-icons/fi";
import useProduct from "../../../../Hooks/useProduct";
import useCategory from "../../../../Hooks/useCategory";

const ModalProduct = ({ isModalOpen, handleCancel, handleOk }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        handleOk(values); // Pass form values to parent
        form.resetFields(); // Reset form after submission
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const {categories, loading, error} = useCategory();

  

  return (
    <Modal
      title="Tạo sản phẩm mới!!!"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Tạo sản phẩm
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên sản phẩm"
          name="productName"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input.TextArea style={{ minHeight: "40px" }} />
        </Form.Item>

        <Form.Item
          label="Giá tiền"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Loại sản phẩm"
          name="categories"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Select >
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.categoryName}>{category.categoryName}</Select.Option>
            ))}
            
          </Select>
        </Form.Item>

        <Form.Item
          label="Loại da"
          name="skinTypeName"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Select >
            <Select.Option value="Da dầu">Da dầu</Select.Option>
            <Select.Option value="Da khô">Da khô</Select.Option>
            <Select.Option value="Da hỗn hợp">Da hỗn hợp</Select.Option>
            <Select.Option value="Da nhạy cảm">Da nhạy cảm</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Ảnh sản phẩm"
          name="image"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalProduct;
